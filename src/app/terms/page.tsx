import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '免責事項・利用規約 - のみげーむ',
    description: 'のみげーむの免責事項および利用規約について。',
};

export default function TermsPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem', lineHeight: '1.8' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>免責事項・利用規約</h1>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>免責事項</h2>
                <p>
                    当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。<br />
                    また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。<br />
                    当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>著作権について</h2>
                <p>
                    当サイトで掲載している文章や画像などにつきましては、無断転載することを禁止します。<br />
                    当サイトは著作権の侵害を目的とするものではありません。使用している版権物の知的所有権はそれぞれの著作者・団体に帰属しております。<br />
                    著作権や肖像権に関して問題がありましたら、<Link href="/contact" style={{ color: '#0070f3', textDecoration: 'underline' }}>お問い合わせフォーム</Link>よりご連絡ください。迅速に対応いたします。
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>お酒に関する注意</h2>
                <p>
                    当サイトは飲み会で使えるゲームを紹介していますが、過度な飲酒や未成年の飲酒を推奨するものではありません。<br />
                    お酒は20歳になってから。適量を守って楽しく飲みましょう。<br />
                    イッキ飲みや無理強いは絶対にやめましょう。
                </p>
            </section>
        </div>
    );
}
