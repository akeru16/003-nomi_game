import Image from 'next/image';
import Link from 'next/link';

export const runtime = 'edge';

import styles from './page.module.css';
import { GAME_TAGS } from '../data/games';
import { getGames } from '../lib/games';
import HeroSection from './components/HeroSection';

interface HomeProps {
  searchParams: Promise<{ q?: string; tags?: string; sort?: string; limit?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { q, tags: tagsParam, sort = 'popular', limit: limitParam } = await searchParams;
  const searchQuery = q?.toLowerCase() || '';
  const limit = limitParam ? parseInt(limitParam) : 10;

  // Parse tags from comma-separated string
  const selectedTags = tagsParam ? tagsParam.split(',') : [];

  // Fetch games from Supabase with sorting
  const sortBy = sort === 'trending' ? 'trending' : sort === 'new' ? 'new' : 'popular';
  const allGames = await getGames({ sortBy });

  // Filter games client-side for now (keyword and tags)
  let filteredGames = allGames.filter(game => {
    // 1. Keyword Check
    const matchesKeyword = !searchQuery ||
      game.title.toLowerCase().includes(searchQuery) ||
      game.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery));

    // 2. Tags Check (Must have ALL selected tags)
    const matchesTags = selectedTags.every(t => game.tags.includes(t));

    return matchesKeyword && matchesTags;
  });

  const totalFilteredCount = filteredGames.length;
  const displayedGames = filteredGames.slice(0, limit);

  // Helper to build URL with existing params + new sort
  const buildSortUrl = (newSort: string) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (tagsParam) params.set('tags', tagsParam);
    params.set('sort', newSort);
    // Reset limit when changing sort
    return `/?${params.toString()}`;
  };

  // Helper to toggle a tag
  const buildTagUrl = (tag: string) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (sort) params.set('sort', sort);

    let newTags = [...selectedTags];
    if (newTags.includes(tag)) {
      newTags = newTags.filter(t => t !== tag);
    } else {
      newTags.push(tag);
    }

    if (newTags.length > 0) {
      params.set('tags', newTags.join(','));
    }

    return `/?${params.toString()}`;
  };

  // Helper for Show More URL
  const buildShowMoreUrl = () => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (tagsParam) params.set('tags', tagsParam);
    if (sort) params.set('sort', sort);
    params.set('limit', '100');
    return `/?${params.toString()}`;
  };

  return (
    <div className={styles.container}>
      <HeroSection searchQuery={searchQuery || (selectedTags.length > 0 ? 'tags' : undefined)} />

      {/* Feature / Game List Preview */}
      <section id="games" className={styles.gamesSection}>
        <div className={styles.tabContainer}>
          <Link
            href={buildSortUrl('popular')}
            className={`${styles.tabItem} ${sort === 'popular' ? styles.activeTab : ''}`}
            scroll={false}
          >
            人気
          </Link>
          <Link
            href={buildSortUrl('trending')}
            className={`${styles.tabItem} ${sort === 'trending' ? styles.activeTab : ''}`}
            scroll={false}
          >
            急上昇
          </Link>
          <Link
            href={buildSortUrl('new')}
            className={`${styles.tabItem} ${sort === 'new' ? styles.activeTab : ''}`}
            scroll={false}
          >
            最新
          </Link>
        </div>

        <h2 className={styles.sectionTitle}>
          {searchQuery || selectedTags.length > 0
            ? `検索結果 ${searchQuery ? `"${searchQuery}"` : ''} ${selectedTags.length > 0 ? ` + [${selectedTags.join(', ')}]` : ''}`
            : sort === 'trending' ? '今話題ののみげーむ' : sort === 'new' ? '新着のみげーむ' : '人気ののみげーむ'}
        </h2>

        {/* Tag Filter Bar - Only show when searching or filtering */}
        {(searchQuery || selectedTags.length > 0) && (
          <div className={styles.tagFilterBar}>
            {GAME_TAGS.map(tag => {
              const isSelected = selectedTags.includes(tag);
              return (
                <Link
                  key={tag}
                  href={buildTagUrl(tag)}
                  className={`${styles.tagChip} ${isSelected ? styles.activeTag : ''}`}
                  scroll={false}
                >
                  {tag} {isSelected && '✕'}
                </Link>
              );
            })}
          </div>
        )}

        <div className={styles.gameList}>
          {displayedGames.length > 0 ? (
            displayedGames.map((game, index) => {
              const showRank = ['popular', 'trending'].includes(sort);
              const rankClass = index === 0 ? styles.rank1 : index === 1 ? styles.rank2 : index === 2 ? styles.rank3 : '';

              return (
                <Link href={`/games/${game.id}`} key={game.id} className={styles.gameRow}>
                  {showRank && (
                    <span className={`${styles.rankNumber} ${rankClass}`}>{index + 1}</span>
                  )}
                  <div className={styles.rowTitle}>
                    {game.title}
                  </div>
                  <div className={styles.rowStats}>
                    <span className={styles.statItem} title={`${game.likes} いいね`}>
                      👍 {game.likes}
                    </span>
                    <span className={styles.statItem} title={`${game.dislikes} いまいち`}>
                      👎 {game.dislikes}
                    </span>
                    <span className={styles.statItem} title={`${game.views} 閲覧`}>
                      👁️ {game.views}
                    </span>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              <p>見つかりませんでした... 😢</p>
              {selectedTags.length > 0 && (
                <Link href={`/?q=${q || ''}`} className={styles.clearTagsBtn} scroll={false}>
                  タグをクリア
                </Link>
              )}
            </div>
          )}

          {/* Show More Button */}
          {limit < totalFilteredCount && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href={buildShowMoreUrl()} className={styles.secondaryBtn} scroll={false}>
                もっと見る (全{totalFilteredCount}件)
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* About Section for SEO and AdSense Content Value */}


      {/* Enhanced SEO Content Section */}
      <section className={styles.seoSection} style={{ marginTop: '2rem', padding: '2rem', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderLeft: '4px solid #FFD700', paddingLeft: '0.75rem' }}>
          幹事さん必見！盛り上がる飲み会ゲームの決定版
        </h3>
        <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '1.5rem' }}>
          飲み会や合コン、パーティーで「次は何して遊ぼう？」と困ったことはありませんか？
          のみげーむなら、人数やシチュエーションに合わせた最適なゲームが必ず見つかります。
          少人数でじっくり楽しめる心理戦から、大人数でワイワイ盛り上がるアクションゲームまで、
          独自のタグ検索で簡単に見つけることができます。
        </p>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderLeft: '4px solid #FFD700', paddingLeft: '0.75rem' }}>
          みんなで作り上げる飲みゲームの輪
        </h3>
        <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '1.5rem' }}>
          「のみげーむ」は、みんなで作るプラットフォームです。<br />
          あなたの地元だけで流行っているローカルなゲームや、サークルで盛り上がったオリジナルの遊び方を、ぜひ投稿してください。<br />
          あなたの投稿したゲームが、日本中の飲み会で遊ばれるようになるかもしれません。<br />
          自分のお気に入りの「ノミゲー」を流行らせて、全国の飲み会をさらに熱くしましょう！
        </p>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderLeft: '4px solid #FFD700', paddingLeft: '0.75rem' }}>
          掲載ゲームの種類
        </h3>
        <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li><strong>定番系</strong>：山手線ゲーム、たけのこニョッキ、第一印象ゲームなど、誰でもすぐに楽しめる安心のゲーム</li>
          <li><strong>リズム系</strong>：ピンポンパンゲーム、ほうれん草ゲーム、炙りカルビゲームなど、テンポよく進む爽快なゲーム</li>
          <li><strong>心理戦系</strong>：マイノリティゲームなど、会話や駆け引きで相手を出し抜く知的ゲーム</li>
          <li><strong>ユニーク系</strong>：モッツァレラチーズゲーム、マンションゲームなど、個性的で盛り上がること間違いなしのゲーム</li>
          <li><strong>便利なWebツール</strong>：王様ゲームやトランプ機能（キングスカップ、ハイアンドローなどに最適）など、アプリ不要でブラウザですぐに使えるツールも充実！画面上部の「ツール」メニューから選んで遊べます。</li>
        </ul>

        <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
          ※当サイトは、楽しいお酒の場をサポートするための情報サイトです。
          未成年の飲酒、一気飲みなどの危険な行為、強要行為は絶対に行わないでください。
          ルールとマナーを守って、楽しく遊びましょう。
        </p>
      </section>
    </div >
  );
}
