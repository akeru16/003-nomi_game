'use client';

import { useEffect } from 'react';

interface AdSenseProps {
    adSlot: string;
    adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
    fullWidthResponsive?: boolean;
    style?: React.CSSProperties;
}

export default function AdSense({
    adSlot,
    adFormat = 'auto',
    fullWidthResponsive = true,
    style = { display: 'block' }
}: AdSenseProps) {
    useEffect(() => {
        try {
            // Push ad to AdSense
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    // During development, show placeholder
    if (process.env.NODE_ENV === 'development') {
        return (
            <div style={{
                border: '2px dashed #ccc',
                padding: '20px',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                color: '#666',
                margin: '20px 0',
                ...style
            }}>
                <p>📢 AdSense広告枠</p>
                <small>本番環境で表示されます</small>
            </div>
        );
    }

    return (
        <ins
            className="adsbygoogle"
            style={style}
            data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive.toString()}
        />
    );
}
