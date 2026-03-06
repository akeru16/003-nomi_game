'use client';

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function GoogleAdSense() {
    const pathname = usePathname();

    // Whitelist: AdSense strict mode
    // Only allow ads on Home page for policy safety.
    const isAllowed = pathname === '/';

    if (!isAllowed) {
        return null;
    }

    if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) {
        return null;
    }

    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
