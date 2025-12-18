import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://nomi-game.work'),
  title: "のみげーむ | 飲みゲーム・パーティーゲーム共有プラットフォーム",
  description: "日本中の飲みゲーム、パーティーゲームが集まる掲示板。王様ゲーム、山手線ゲーム、たけのこニョッキなど、みんなで盛り上がれるゲームを探そう！新しいゲームも投稿できます。",
  keywords: ["飲みゲーム", "パーティーゲーム", "王様ゲーム", "山手線ゲーム", "たけのこニョッキ", "飲み会", "ゲーム", "掲示板"],
  authors: [{ name: "のみげーむ" }],
  creator: "のみげーむ",
  publisher: "のみげーむ",
  alternates: {
    canonical: '/',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "のみげーむ | 飲みゲーム・パーティーゲーム共有プラットフォーム",
    description: "日本中の飲みゲームが集まる掲示板。みんなで盛り上がろう！",
    url: "https://nomi-game.work",
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
    google: 'zUpVwU2PDGrCWOedFRDwK5hMBz4FIXUrf2bTh3Eptc4',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'のみげーむ',
  url: 'https://nomi-game.work',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://nomi-game.work/?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
}

import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="google-adsense-account" content="ca-pub-3972183234429369" />
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
