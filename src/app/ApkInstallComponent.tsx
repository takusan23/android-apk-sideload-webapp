"use client"

import { useApkInstall } from "./useApkInstall";

function ApkInstallComponent() {
    const { state, connect, disconnect, install } = useApkInstall()

    return (
        <div className="flex flex-col p-3 space-y-5 border border-black rounded-xl">

            <h2 className="text-xl">インストール</h2>

            <div className="flex flex-col p-2 border border-orange-500 rounded-2xl">
                <h3 className="text-xl">現在の状態</h3>
                {
                    (() => {
                        switch (state.type) {
                            case "Idle":
                                return <p>接続を待機しています。USB デバッグを有効にする必要があります。接続ボタンを押したあと、許可ダイアログが表示されたら許可してください。</p>
                            case "Connected":
                                return <p>WebUSB API 経由で {state.deviceName} へ接続しました。APK ファイルの選択を待っています。</p>
                            case "Error":
                                return <p>接続に失敗しました。AndroidStudio や adb コマンドを利用しているターミナルがあれば閉じてください。また、タスクマネージャー等で adb のプロセスが存在する場合は終了してください。{JSON.stringify(state.error)}</p>
                            case "InstallStart":
                                return <p>APK のインストール中です。APK ファイル名 {state.apkName} / デバイス名 {state.deviceName}</p>
                            case "InstallSuccessful":
                                return <p>APK のインストールに成功しました。APK ファイル名 {state.apkName} / デバイス名 {state.deviceName}</p>
                        }
                    })()
                }
            </div>

            {
                state.type === "Idle" && (
                    <button
                        className="px-5 py-2 bg-blue-200 rounded-full"
                        type="button"
                        onClick={connect}>
                        接続を開始する
                    </button>
                )
            }

            {
                // APK ファイルの MIME-Type は application/vnd.android.package-archive らしい
                // 多分 Google Chrome だから Android のことを考えていそう。他のブラウザで WebUSB が実装されたら見直す
                (state.type === "Connected" || state.type === "InstallSuccessful") && (
                    <div className="flex flex-col">
                        <label htmlFor="apk_select">APK ファイルを選択する</label>
                        <input
                            id="apk_select"
                            className="px-5 py-2 bg-blue-200 rounded-full"
                            type="file"
                            accept="application/vnd.android.package-archive"
                            onChange={ev => {
                                const apkFile = ev.currentTarget.files?.item(0)
                                if (apkFile) {
                                    install(apkFile)
                                }
                            }} />
                    </div>
                )
            }

            {
                state.type !== "Idle" && (
                    <button
                        className="px-5 py-2 mt-5 bg-red-200 rounded-full"
                        type="button"
                        onClick={disconnect}>
                        接続を解除する
                    </button>
                )
            }

        </div>
    )
}

export default ApkInstallComponent