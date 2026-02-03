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
                    「のみげーむ」は、日本中の飲み会ゲームやパーティーゲームを集めた、国内最大級のゲーム・データベースおよびコミュニティサイトです。<br />
                    誰もが知っている定番のメジャーなゲームから、特定の地域やグループだけで流行っている超マイナーなゲームまで、ありとあらゆる「遊び」を網羅し、後世に残していくことを目指しています。<br />
                    <br />
                    <strong>【サイトの目的】</strong><br />
                    1. <strong>文化の保存</strong>：消えてしまいそうなローカルなゲームや、口伝でしか伝わっていない遊びを記録・保存します。<br />
                    2. <strong>コミュニケーションの活性化</strong>：ゲームを通じて、初対面の人とも仲良くなれる、そんな場作りを支援します。<br />
                    3. <strong>新しい遊びの創造</strong>：既存のゲームをアレンジしたり、全く新しいゲームを考案・投稿できる場を提供します。<br />
                    <br />
                    「次はどのゲームやる？」と迷った時に、このサイトを開けば間違いなく楽しい時間が過ごせる。そんな「遊びの百科事典」を作っていきます。
                </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📝 運営より</h2>
                <p>
                    当サイトは、ユーザーの皆様と共に作り上げていくプラットフォームです。<br />
                    コンテンツの品質向上と情報の正確性を保つため、投稿されたゲーム内容は定期的に運営チームが確認を行っておりますが、もし不明瞭な点や改善すべき点が見つかった場合は、ぜひお知らせください。<br />
                    <br />
                    また、当サイトは健全な運営を心がけております。<br />
                    過度な飲酒を助長する意図はございません。お酒は二十歳になってから。適度な飲酒と節度ある行動をお願いいたします。<br />
                    <br />
                    ご意見・ご要望は<Link href="/contact" style={{ color: '#0070f3', textDecoration: 'underline' }}>お問い合わせフォーム</Link>よりいつでも受け付けております。<br />
                    皆様からのフィードバックが、より良いサイト作りの原動力となります。
                </p>
            </section>
        </div>
    );
}
