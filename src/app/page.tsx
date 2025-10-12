import ApkInstallComponent from "./ApkInstallComponent";
import { AboutMessageCard, OverviewMessageCard } from "./MessageCard";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <main className="p-4 max-w-6xl m-auto flex flex-col space-y-5">

        <h1 className="text-2xl">WebUSB を使って ADB コマンドを叩いて APK をインストールする Next.js 製 Web アプリ</h1>
        <h2 className="text-xl text-red-500">自己責任でお願いします。このサイトは USB 接続した Android 端末に向かって adb コマンドを叩きます。</h2>

        <ApkInstallComponent />

        <OverviewMessageCard />
        <AboutMessageCard />
      </main>
    </div>
  );
}
