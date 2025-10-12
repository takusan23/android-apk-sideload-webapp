import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "android-apk-sideload-webapp",
  description: "WebUSB を使って ADB コマンドを叩いて APK のサイドローディングをする Next.js サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
