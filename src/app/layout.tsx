import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "のみげーむ | 飲みゲー共有プラットフォーム",
  description: "日本中の飲みゲーが集まる掲示板。みんなで盛り上がろう！",
};

import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>
        <AuthProvider>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 160px)', paddingBottom: '2rem' }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
