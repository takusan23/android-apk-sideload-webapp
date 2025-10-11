import ApkInstallComponent from "./ApkInstallComponent";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <main className="p-4 max-w-6xl m-auto flex flex-col space-y-5">

        <h1 className="text-2xl">WebUSB を使って ADB コマンドを叩いて APK をインストールする Next.js サイト</h1>

        <ApkInstallComponent />

      </main>
    </div>
  );
}
