import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'のみげーむについて - のみげーむ',
    description: '「のみげーむ」は、飲み会やパーティーで盛り上がるゲームを集めたアーカイブサイトです。',
};

export default function AboutPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem', lineHeight: '1.8' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>のみげーむについて</h1>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🍻 このサイトは何？</h2>
                <p>
                    「のみげーむ」は、日本中の飲み会ゲームを集めたプラットフォームです。<br />
                    誰もが知っている定番のメジャーなゲームから、特定の地域やグループだけで流行っている超マイナーなゲームまで、ありとあらゆる「飲みゲー」を網羅することを目指しています。<br />
                    このサイトの一番の目的は、とにかく**みんなで盛り上がること**！<br />
                    「次はどのゲームやる？」と迷った時に、このサイトを開けば間違いなく楽しい時間が過ごせる、そんな場所を作っていきます。
                </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📝 運営より</h2>
                <p>
                    当サイトは、もっと使いやすく、もっと楽しいサイトにするために、皆さんからの声を大切にしています。<br />
                    「ここをもっとこうしてほしい」「この機能が使いにくい」「こんな不満がある」など、気がついたことがあれば、どんな小さなことでも構いません。<br />
                    ぜひ<Link href="/contact" style={{ color: '#0070f3', textDecoration: 'underline' }}>お問い合わせ</Link>から教えてください。<br />
                    皆さんの意見を取り入れて、より良いサイトに改善していきます。
                </p>
            </section>
        </div>
    );
}
