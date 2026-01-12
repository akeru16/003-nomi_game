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
                    「のみげーむ」は、飲み会、合コン、パーティー、打ち上げなどで盛り上がる「飲み会ゲーム」をまとめたアーカイブサイトです。<br />
                    定番のゲームから、ちょっとマイナーなローカルルールまで、様々なゲームを紹介しています。
                </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🎯 サイトの目的</h2>
                <p>
                    「次の飲み会で何をしよう？」「会話が途切れて気まずい...」そんな経験はありませんか？<br />
                    このサイトは、そんな時にすぐに使えるゲームを提案し、みんなが笑顔になれる楽しい場を作るお手伝いをすることを目的としています。<br />
                    ルールを忘れてしまった時の確認用としてもご活用ください。
                </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📝 運営について</h2>
                <p>
                    当サイトは、ゲーム好きの管理人が個人で運営しています。<br />
                    掲載されているゲームのルールについて、「ウチではこうやってるよ！」「もっと面白いアレンジがあるよ！」といった情報があれば、ぜひ<Link href="/contact" style={{ color: '#0070f3', textDecoration: 'underline' }}>お問い合わせ</Link>から教えてください。<br />
                    みんなで最強の飲みゲー図鑑を作っていきましょう！
                </p>
            </section>
        </div>
    );
}
