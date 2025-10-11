https://github.com/GoogleChromeLabs/wadb ライブラリは npm ライブラリとしてホスティングされていないので、  
npm install のローカルインストールを経由してこのライブラリを使っています。

やってることは demo フォルダは使わないので消して、あとは最新の TypeScript で型が通るように（`ArrayBufferLike`問題）、テストもとりあえず消してしまった。