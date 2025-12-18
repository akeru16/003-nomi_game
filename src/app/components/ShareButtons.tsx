'use client';

import { usePathname } from 'next/navigation';

interface ShareButtonsProps {
    title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
    // Current URL (client-side only, wait for mount if needed, but simple anchor tags work best)
    // We typically want the canonical URL. For simplicity, we'll build it from location if available,
    // or pass it in. But here we'll use a simple approach using window.location if permissible, 
    // or just construct it if we know the domain. Given we know the domain is nomi-game.work:

    // Actually, for better SSR/Client hydration match, let's just use the domain we know.
    const domain = 'https://nomi-game.work';
    const pathway = usePathname();
    const url = `${domain}${pathway}`;

    const text = encodeURIComponent(`${title} | のみげーむ`);
    const hashtags = encodeURIComponent('のみげーむ,飲みゲー');
    const shareUrl = encodeURIComponent(url);

    const xUrl = `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}&hashtags=${hashtags}`;
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${shareUrl}`;

    return (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <a
                href={xUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 600
                }}
            >
                𝕏 でシェア
            </a>
            <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    backgroundColor: '#06C755',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 600
                }}
            >
                LINEで送る
            </a>
        </div>
    );
}
