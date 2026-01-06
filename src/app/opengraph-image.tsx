import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'のみげーむ'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
    try {
        // Use the deployed logo image
        // Using a direct fetch might fail in some Edge environments if loopback is blocked.
        // As a fallback, we catch the error and renders text.
        const logoData = await fetch(new URL('https://nomi-game.work/logo.png')).then(
            (res) => {
                if (!res.ok) throw new Error('Failed to fetch logo')
                return res.arrayBuffer()
            }
        )

        // Convert to base64 using Web APIs (Edge compatible)
        const base64 = btoa(
            new Uint8Array(logoData)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        const dataUrl = `data:image/png;base64,${base64}`;

        return new ImageResponse(
            (
                <div
                    style={{
                        background: 'white',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src={dataUrl}
                        width="800"
                        style={{
                            objectFit: 'contain'
                        }}
                    />
                </div>
            ),
            { ...size }
        )
    } catch (e) {
        // Fallback to text if logo fetch fails
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 128,
                        background: 'white',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        fontWeight: 600,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#000' }}>のみ</span>
                        <span style={{ color: '#FFD700' }}>🍺</span>
                        <span style={{ color: '#000' }}>げーむ</span>
                    </div>
                </div>
            ),
            { ...size }
        )
    }
}
