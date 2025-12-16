# SEO対策ガイド

## 🎯 現在の実装状況

### ✅ 完了した対策
1. **Meta Tags最適化**
   - タイトル・ディスクリプション強化
   - キーワード追加
   - OGP（Open Graph Protocol）設定
   - Twitter Card設定

2. **sitemap.xml生成**
   - 全ページのサイトマップ自動生成
   - 検索エンジンがページを発見しやすくなる

3. **robots.txt設定**
   - クローラーの巡回ルール設定
   - サイトマップの位置を明示

## 🚀 次の必須アクション

### 1. Google Search Consoleに登録

**手順:**
1. https://search.google.com/search-console にアクセス
2. 「プロパティを追加」をクリック
3. **URLプレフィックス**を選択
4. Vercel URLを入力: `https://nomi-game-xxxx.vercel.app`
5. 所有権の確認方法を選択（推奨: HTMLタグ）

**HTMLタグ方式:**
```html
<meta name="google-site-verification" content="xxxxx" />
```
このコードを取得したら、`src/app/layout.tsx`の`metadata`に追加：
```typescript
verification: {
  google: 'xxxxx',
},
```

6. 「確認」をクリック
7. **サイトマップを送信**:
   - Search Console → サイトマップ
   - `sitemap.xml` を入力して送信

### 2. Googleにインデックス登録をリクエスト

Search Consoleで：
1. 「URL検査」ツールを開く
2. ホームページURLを入力
3. 「インデックス登録をリクエスト」をクリック

**重要:** インデックス反映には**数日〜2週間**かかります。

### 3. 構造化データの追加（任意だが推奨）

各ゲームページに構造化データを追加すると、検索結果に「リッチスニペット」が表示されます。

**例: `src/app/games/[id]/page.tsx`に追加**
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Game",
      "name": game.title,
      "description": game.description,
      "gamePlatform": "Web",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": game.likes / (game.likes + game.dislikes),
        "ratingCount": game.likes + game.dislikes
      }
    })
  }}
/>
```

## 📈 SEO効果を高める施策

### コンテンツ強化
- [ ] 各ゲームの説明文を詳しく（最低200文字）
- [ ] ゲームのルールを分かりやすく
- [ ] 画像のalt属性を設定

### 外部対策
- [ ] SNSでシェア（Twitter, Instagram, Facebook）
- [ ] 関連サイトからリンクを獲得
- [ ] ブログ記事を書いてリンクを貼る

### 技術的改善
- [ ] ページ表示速度の最適化（現在は良好）
- [ ] モバイルフレンドリー対応（現在対応済み）
- [ ] HTTPS対応（Vercel自動対応済み）

## 📊 効果測定

### Google Analytics導入（推奨）
```bash
npm install @vercel/analytics
```

`src/app/layout.tsx`に追加:
```tsx
import { Analytics } from '@vercel/analytics/react'

// <body>内に追加
<Analytics />
```

### 検索順位チェック
- Google Search Consoleの「検索パフォーマンス」で確認
- 「のみげーむ」「飲みゲーム」などのキーワードで順位追跡

## ⏱️ 期待される結果

### 1週間後
- Google Search Consoleでページが認識される
- サイトマップが処理される

### 2週間〜1ヶ月後
- 「のみげーむ」で検索上位表示（ブランド名）
- 一部のゲーム名で検索結果に表示開始

### 3ヶ月後
- 「飲みゲーム」「パーティーゲーム」などで上位を目指す
- 月間検索流入: 100〜1,000 PV目標

## 🎯 最優先アクション（今すぐ実施）

1. **Google Search Consoleに登録**
2. **サイトマップ送信**
3. **インデックスリクエスト**

これらを実施したら教えてください！次のステップを案内します。

---

**Note:** SEOは長期戦です。すぐに結果は出ませんが、2〜3ヶ月続けると徐々に効果が現れます。
