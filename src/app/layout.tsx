import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "のみげーむ | 飲みゲーム・パーティーゲーム共有プラットフォーム",
  description: "日本中の飲みゲーム、パーティーゲームが集まる掲示板。王様ゲーム、山手線ゲーム、たけのこニョッキなど、みんなで盛り上がれるゲームを探そう！新しいゲームも投稿できます。",
  keywords: ["飲みゲーム", "パーティーゲーム", "王様ゲーム", "山手線ゲーム", "たけのこニョッキ", "飲み会", "ゲーム", "掲示板"],
  authors: [{ name: "のみげーむ" }],
  creator: "のみげーむ",
  publisher: "のみげーむ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "のみげーむ | 飲みゲーム・パーティーゲーム共有プラットフォーム",
    description: "日本中の飲みゲームが集まる掲示板。みんなで盛り上がろう！",
    url: "https://nomi-game.vercel.app",
    siteName: "のみげーむ",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "のみげーむ | 飲みゲーム共有プラットフォーム",
    description: "日本中の飲みゲームが集まる掲示板。みんなで盛り上がろう！",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification (後で追加)
    // google: 'your-verification-code',
  },
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
