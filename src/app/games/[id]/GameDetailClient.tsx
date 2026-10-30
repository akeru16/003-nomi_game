'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Game, incrementViews } from '@/lib/games';
import GameStats from '@/app/components/GameStats';
import ShareButtons from '@/app/components/ShareButtons';
import { useFavorites } from '@/lib/localStore';
import styles from './page.module.css';

interface GameDetailClientProps {
    game: Game;
}

export default function GameDetailClient({ game }: GameDetailClientProps) {
    const { favorites, toggleFavorite } = useFavorites();
    const favorited = favorites.includes(game.id);

    useEffect(() => {
        incrementViews(game.id);
    }, [game.id]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>{game.title}</h1>
                    <button
                        onClick={() => toggleFavorite(game.id)}
                        className={`${styles.favoriteBtn} ${favorited ? styles.favorited : ''}`}
                        title={favorited ? 'お気に入りから削除' : 'お気に入りに追加'}
                        aria-pressed={favorited}
                    >
                        {favorited ? '❤️' : '🤍'}
                    </button>
                </div>

                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-start' }}>
                    <ShareButtons title={game.title} />
                </div>

                <div className={styles.statsRow}>
                    <GameStats gameId={game.id} likes={game.likes} dislikes={game.dislikes} views={game.views} />
                    <div className={styles.metaInfo}>
                        <div className={styles.date}>{new Date(game.created_at).toLocaleDateString('ja-JP')} 投稿</div>
                        {game.posted_by && (
                            <div className={styles.author}>👤 投稿者: {game.author_name || '名無しさん'}</div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>概要</h2>
                    <p className={styles.description}>{game.description}</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>必要なもの</h2>
                    <ul className={styles.materialList}>
                        {game.materials && game.materials.length > 0 ? (
                            game.materials.map((item, index) => (
                                <li key={index} className={styles.materialItem}>{item}</li>
                            ))
                        ) : (
                            <li>特になし</li>
                        )}
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>遊び方・ルール</h2>
                    <div className={styles.rulesContainer}>
                        <ol className={styles.rulesList}>
                            {game.rules.map((rule, index) => (
                                <li key={index} className={styles.ruleItem}>{rule}</li>
                            ))}
                        </ol>
                    </div>
                </section>

                <div className={styles.tagsRow}>
                    {game.tags.map(tag => (
                        <Link href={`/?q=${encodeURIComponent(tag)}`} key={tag} style={{ textDecoration: 'none' }}>
                            <span className={styles.tag}>#{tag}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
