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
    </div>
  );
}
