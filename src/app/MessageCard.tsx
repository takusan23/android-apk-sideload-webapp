export function OverviewMessageCard() {
    return (
        <div className="flex flex-col p-3 space-y-3 border border-black rounded-xl">
            <h2 className="text-xl">ことの始まり</h2>

            <p>APK を直接配布する開発者も Google に開発者登録が近い将来必要になる。一方、開発者向けに adb コマンド経由のインストールは開発者登録なしでインストールできる。だがこの回避を使うためには、adb コマンドのセットアップが必要で結構難しい。</p>
            <p>話かわって同じくGoogle が作ってる Chrome（とその系列ブラウザ）の場合は WebUSB API がフロントエンド開発者に提供されている。ADB コマンドのような USB 接続を必要とするウェブサイト（めったに無いと思う）を作ることが出来る。</p>
            <p>これを使えばパソコンのブラウザから APK がインストールできるのではと。しかも adb コマンド相当になるので、開発者登録してない開発者の APK もインストール出来るはず。</p>
            <p>Safari/Firefox が USB アクセスは危険だって言ってたけど、回り回って正解だったかも。</p>
        </div>
    )
}

export function AboutMessageCard() {
    return (
        <div className="flex flex-col p-3 space-y-3 border border-black rounded-xl">
            <h2 className="text-xl">そのほか</h2>

            <ul className="list-disc list-inside">
                <li>WebUSB API を利用しています。これがフロントエンド開発者に提供されているのは Google Chrome（とその系列）のみで、それ以外のブラウザでは動作しません。</li>
                <li>
                    <a className="text-[revert]" href="https://caniuse.com/webusb">Can I use</a>
                </li>
            </ul>

            <ul className="list-disc list-inside">
                <li>このサイトのソースコード</li>
                <li>
                    <a className="text-[revert]" href="">GitHub を開く</a>
                </li>
            </ul>

            <ul className="list-disc list-inside">
                <li>スペシャルサンクス</li>
                <li>GoogleChromeLabs/wadb</li>
                <li>
                    <a className="text-[revert]" href="https://github.com/GoogleChromeLabs/wadb">GitHub を開く</a>
                </li>
            </ul>

            <ul className="list-disc list-inside">
                <li>オープンソースライセンス thx!!!!!!!!!!</li>

                {
                    [
                        { name: 'next', license: 'https://github.com/vercel/next.js/blob/canary/license.md' },
                        { name: 'react', license: 'https://github.com/facebook/react/blob/main/LICENSE' },
                        { name: 'react-dom', license: 'https://github.com/facebook/react/blob/main/LICENSE' },
                        { name: '@tailwindcss/postcss', license: 'https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE' },
                        { name: '@types/node', license: 'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/LICENSE' },
                        { name: '@types/react', license: 'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/LICENSE' },
                        { name: '@types/react-dom', license: 'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/LICENSE' },
                        { name: 'tailwindcss', license: 'https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE' },
                        { name: 'typescript', license: 'https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt' }
                    ].map((obj) => (
                        <li key={obj.name}>
                            <a className="text-[revert]" href={obj.license}>{obj.name}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}