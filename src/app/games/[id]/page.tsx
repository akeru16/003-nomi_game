'use client';

export const runtime = 'edge';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { getGameById } from '@/lib/games';
import type { Game } from '@/lib/games';
import Badge from '@/app/components/Badge';
import GameStats from '@/app/components/GameStats';
import AdSense from '@/app/components/AdSense';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function GameDetailPage() {
    const params = useParams();
    const id = parseInt(params.id as string);
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);
    const { user, isFavorite, addFavorite, removeFavorite } = useAuth();
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        async function fetchGame() {
            const gameData = await getGameById(id);
            if (gameData) {
                setGame(gameData);
                setFavorited(isFavorite(id.toString()));
            }
            setLoading(false);
        }
        fetchGame();
    }, [id, isFavorite]);

    if (loading) {
        return <div className={styles.container}>読み込み中...</div>;
    }

    if (!game) {
        notFound();
    }

    // Helper to map badge string to type
    const getBadgeType = (badge: string) => {
        if (badge === 'No.1') return 'primary';
        if (badge === 'New') return 'secondary';
        return 'accent';
    };

    const handleFavoriteToggle = () => {
        if (!user) {
            alert('お気に入りに追加するにはログインしてください');
            return;
        }

        if (favorited) {
            removeFavorite(id.toString());
            setFavorited(false);
        } else {
            addFavorite(id.toString());
            setFavorited(true);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>{game.title}</h1>
                    <button
                        onClick={handleFavoriteToggle}
                        className={`${styles.favoriteBtn} ${favorited ? styles.favorited : ''}`}
                        title={favorited ? 'お気に入りから削除' : 'お気に入りに追加'}
                    >
                        {favorited ? '❤️' : '🤍'}
                    </button>
                </div>

                <div className={styles.statsRow}>
                    <GameStats likes={game.likes} dislikes={game.dislikes} views={game.views} />
                    <div className={styles.metaInfo}>
                        <div className={styles.date}>{new Date(game.created_at).toLocaleDateString('ja-JP')} 投稿</div>
                        {game.posted_by && (
                            <div className={styles.author}>👤 投稿者: {game.posted_by}</div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>概要</h2>
                    <p className={styles.description}>{game.description}</p>
                </section>

                {/* Ad Placement 1: After Description */}
                <AdSense adSlot="1234567890" adFormat="auto" />

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

                {/* Ad Placement 2: After Rules */}
                <AdSense adSlot="0987654321" adFormat="auto" />

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
