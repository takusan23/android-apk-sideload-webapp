# WebUSB を使って ADB コマンドを叩いて APK のサイドローディングをする Next.js サイト

`WebUSB`を使って  
`adb install`コマンドを叩いて  
`Android`へ`apk`ファイルをインストールする  
`Next.js`で出来た静的サイト。

## ことの始まり

`apk`ファイルのインストールには、`Google`に登録する必要がある。  
これを回避するには`adb`コマンドを使う必要があり（`Shizuku`経由でワンちゃん回避できるけど玄人向け）、  
アプリ開発者でもないのに`AndroidStudio`を入れる、か、  
`adb platform-tools`をインストールして、パスを通して・・・って手順が必要になる。

が、後述しますが`Chrome`だけ`WebUSB API`が **何故か解放されていて** これを使うことで、ブラウザの`Webページ`から`adb コマンド`を発行できるって仕組み。

## Chrome 限定

`Google Chrome`ブラウザは、他の`Apple Safari / Mozilla Firefox`と違って、  
`Web ページ`から`USB`接続しているデバイスと通信できる`API`をフロントエンド開発者に提供しています。

よくわからないですよね、`Web ページ`からなんで`USB`デバイスを操作する必要があるのでしょうか・・・  
`Windows`の`SmartScreen`のようなものも存在しないはず・・・

というわけで、`Safari / Firefox`陣営はこの`API`を提供するのをためらっています。`スマホのアプリストア`のように、アプリの審査があるなら提供してもいいが、そのような審査が存在しない環境で、素人も玄人も一緒くたに信頼するのはダメだろ・・・ってスタンスのよう

# 開発環境構築
`WSL`を強くおすすめします。`Windows / macOS / Linux`ごとに`C コード`をコンパイルする処理が存在してて、  
`Windows`環境だと`VisualStudio`とか`Python`をこのためだけに入れる必要ができてしまう。

`WSL`使うなら、`git clone`して`cd`して`code .`すれば`Windows`側の`VSCode`で開くことが可能！！！

- `WSL`側へ`Node.js`をインストールしておいてください
- 同様に`build-essential`も入れる（この中に Node.js 入ってるかも）
- git clone する
- cd する
- 初回時は npm i する
    - ネイティブライブラリ？のコンパイルが存在します
    - なので先述の通り WSL とかを使うことをおすすめします
- npm run dev で開発サーバー起動

# 本番ビルド

- npm run build
- dist フォルダを静的サイトとして公開する

# special thanks
https://github.com/GoogleChromeLabs/wadb