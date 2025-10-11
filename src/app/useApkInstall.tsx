import { useRef, useState } from "react"
import { AdbClient, KeyStore, Options, Transport, WebUsbTransport } from "../../external-libs/wadb/src";

class MyKeyStore implements KeyStore {
    private keys: CryptoKeyPair[] = [];
    async loadKeys(): Promise<CryptoKeyPair[]> {
        return this.keys;
    }

    async saveKey(key: CryptoKeyPair): Promise<void> {
        this.keys.push(key);
        console.log('Saving Key' + key);
    }
}

/** 接続からインストール状態のステートの union */
export type ApkInstallState = {
    type: 'Idle'
} | {
    type: 'Connected',
    deviceName: string
} | {
    type: 'Error',
    error: any // 何を throw するかわからない
} | {
    type: 'InstallStart',
    deviceName: string,
    apkName: string
} | {
    type: 'InstallSuccessful',
    deviceName: string,
    apkName: string
} | {
    type: 'InstallFailure',
    deviceName: string,
    apkName: string,
    error: any
}

/**
 * GoogleChromeLabs/wadb を使って WebUSB 経由で Android 端末へ APK をインストールする hook
 */
export function useApkInstall() {
    const adbClient = useRef<AdbClient>(null)
    const transport = useRef<WebUsbTransport>(null)
    const [state, setState] = useState<ApkInstallState>({ type: "Idle" })

    /** 接続を開始する。ユーザーは開いたダイアログでデバイスを選択すること */
    async function connect() { // 近い将来 React Compiler が登場するので、手動で useMemo するのはやめる
        const options: Options = {
            debug: true,
            useChecksum: false,
            dump: false,
            keySize: 2048
        };

        try {
            const keyStore = new MyKeyStore()
            transport.current = await WebUsbTransport.open(options)
            adbClient.current = new AdbClient(transport.current, options, keyStore)
            const info = await adbClient.current.connect()
            setState({ type: 'Connected', deviceName: info.productName })
        } catch (e) {
            await commmonDisconnect()
            setState({ type: 'Error', error: e })
        }
    }

    /** 接続を解除する */
    async function disconnect() {
        await commmonDisconnect()
        setState({ type: "Idle" })
    }

    async function commmonDisconnect() {
        try {
            await adbClient.current?.disconnect()
            await transport.current?.close()
        } catch {
            // 物理的に引っこ抜いたとか...
        }
    }

    /**
     * インストールする
     * 
     * インストール手順は
     * ローカルに APK ファイルを転送
     * pm install コマンドでローカルにある APK をインストール
     * 不要になったローカル APK を消す
     * 
     * @param apkFile <input> の File
     */
    async function install(apkFile: File) {
        // ありえないので return
        if (state.type === "Idle" || state.type === "Error") return

        const { deviceName } = state
        const apkName = apkFile.name

        try {
            setState({ type: 'InstallStart', deviceName: deviceName, apkName: apkName })

            // 転送する
            const apkBinary = await apkFile.arrayBuffer()
            const blob = new Blob([apkBinary])
            const tempApkFilePath = `/data/local/tmp/${Date.now()}_android_apk_sideload_web.apk`
            // 1_000_000 にした途端動かなくなった...
            // いい感じにバイト配列を分割して転送してくれるそう
            await adbClient.current?.push(blob, tempApkFilePath, "0755", 5_000)

            // インストールする
            await adbClient.current?.shell(`pm install ${tempApkFilePath}`)

            // 消す
            await adbClient.current?.shell(`rm ${tempApkFilePath}`)

            setState({ type: 'InstallSuccessful', deviceName: deviceName, apkName: apkName })
        } catch (e) {
            setState({ type: 'InstallFailure', error: e, deviceName: deviceName, apkName: apkName })
        }
    }

    return {
        state,
        connect,
        disconnect,
        install
    }
}
