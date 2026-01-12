import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'お問い合わせ - のみげーむ',
    description: 'のみげーむへのお問い合わせはこちらから。',
};

export default function ContactPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem', lineHeight: '1.8' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>お問い合わせ</h1>

            <p style={{ marginBottom: '1.5rem' }}>
                当サイト（のみげーむ）に関するお問い合わせ、ご意見、ご感想は、以下のメールアドレスまでお願いいたします。
            </p>

            <div style={{ padding: '2rem', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>📩 メールでのお問い合わせ</p>
                <a href="mailto:contact@nomi-game.work" style={{ fontSize: '1.2rem', color: '#0070f3', textDecoration: 'underline' }}>
                    contact@nomi-game.work
                </a>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                    ※なるべく早い返信を心がけておりますが、内容によってはお時間をいただく場合もございます。
                </p>
            </div>
        </div>
    );
}
