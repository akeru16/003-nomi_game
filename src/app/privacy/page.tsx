import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー - のみげーむ',
  description: 'のみげーむのプライバシーポリシー（個人情報の取り扱い）について説明します。',
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>プライバシーポリシー</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. 個人情報の利用目的</h2>
        <p>
          当サイトでは、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。<br />
          取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メール等でご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. 広告について</h2>
        <p>
          当サイトでは、第三者配信の広告サービス（Googleアドセンス）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。<br />
          クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。<br />
          Cookieを無効にする方法やGoogleアドセンスに関する詳細は<a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer" style={{color: '#0070f3', textDecoration: 'underline'}}>「広告 – ポリシーと規約 – Google」</a>をご確認ください。
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. アクセス解析ツールについて</h2>
        <p>
          当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。<br />
          このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。<br />
          このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
        </p>
      </section>

      <p style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#666' }}>
        制定日：2026年1月12日
      </p>
    </div>
  );
}
