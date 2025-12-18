import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'のみげーむ'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
    // Use the deployed logo image
    const logoData = await fetch(new URL('https://nomi-game.work/logo.png')).then(
        (res) => res.arrayBuffer()
    )

    // Convert to base64
    const buffer = Buffer.from(logoData);
    const base64 = buffer.toString('base64');
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
        {
            ...size,
        }
    )
}
