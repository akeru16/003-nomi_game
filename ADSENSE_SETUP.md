# Google AdSense Setup Guide

## 📝 AdSense申請の準備

### 実装完了項目 ✅
- AdSenseコンポーネント作成済み
- 広告スクリプト統合済み
- ゲーム詳細ページに広告配置済み
- 開発環境ではプレースホルダー表示

### AdSense申請手順

#### 1. Google AdSenseアカウント作成
1. https://www.google.com/adsense にアクセス
2. Googleアカウントでログイン
3. 「ご利用開始」をクリック

#### 2. サイト情報登録
- **URL**: デプロイ後のVercel URL（例: https://nomi-game.vercel.app）
- **言語**: 日本語
- **コンテンツカテゴリ**: エンターテイメント/ゲーム

#### 3. 審査準備（重要）
AdSense審査に通るための条件:
- ✅ 10〜15ページのオリジナルコンテンツ（現在11ゲーム = OK）
- ✅ プライバシーポリシーページ（要追加）
- ✅ お問い合わせページ（要追加）
- ✅ 独自ドメイン（推奨だが必須ではない）
- ✅ 6ヶ月以上運営（新規サイトでも審査可能）

#### 4. AdSenseコード取得
審査承認後:
1. AdSense Dashboard → 広告 → サマリー
2. クライアントID をコピー（ca-pub-xxxxxxxxxxxxxxxxなど）
3. 広告ユニットを作成してスロットIDを取得

#### 5. 環境変数設定

**ローカル (.env.local):**
```
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxxx
```

**Vercel (本番環境):**
1. Vercel Dashboard → プロジェクト → Settings → Environment Variables
2. `NEXT_PUBLIC_ADSENSE_CLIENT_ID` を追加
3. Value: `ca-pub-xxxxxxxxxxxxxxxxx`

#### 6. 広告スロットID更新

`src/app/games/[id]/page.tsx` の以下を更新:
```tsx
<AdSense adSlot="1234567890" />  // ← 実際のスロットIDに変更
<AdSense adSlot="0987654321" />  // ← 実際のスロットIDに変更
```

## 💰 収益見込み

### 想定PV数と収益
- **1,000 PV/月**: ¥100〜500
- **10,000 PV/月**: ¥1,000〜5,000
- **100,000 PV/月**: ¥10,000〜50,000

### 収益を上げるコツ
1. **SEO対策**: Googleで検索上位を目指す
2. **SNS拡散**: Twitter, Instagramで共有
3. **新規ゲーム追加**: 定期的にコンテンツ更新
4. **ユーザー投稿促進**: コミュニティ活性化

## 📄 追加推奨ページ（審査通過率UP）

### プライバシーポリシー
`/privacy` ページを作成し、以下を記載:
- 個人情報の取り扱い
- Cookie使用について
- Google AdSenseの利用
- アクセス解析（Google Analytics）

### お問い合わせ
`/contact` ページを作成:
- 問い合わせフォーム または
- メールアドレス表示

### 利用規約
`/terms` ページ（任意）:
- サービス利用規約
- 免責事項

## 🚀 次のアクション

1. **今すぐ**: Vercelにデプロイ
2. **デプロイ後**: プライバシーポリシーとお問い合わせページ追加
3. **1週間後**: AdSense申請
4. **審査通過後**: 環境変数とスロットID設定
5. **運用開始**: 収益化スタート！

---

**Note**: AdSense審査は通常2週間〜1ヶ月かかります。審査中もサイト運営を続けてコンテンツを充実させましょう。
