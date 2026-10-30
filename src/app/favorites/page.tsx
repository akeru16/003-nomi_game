'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getGames } from '../../lib/games';
import type { Game } from '../../lib/games';
import { useFavorites } from '../../lib/localStore';
import styles from './page.module.css';

export default function FavoritesPage() {
    const { favorites, loaded } = useFavorites();
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [gamesLoading, setGamesLoading] = useState(true);

    useEffect(() => {
        async function fetchGames() {
            const games = await getGames({});
            setAllGames(games);
            setGamesLoading(false);
        }
        fetchGames();
    }, []);

    if (!loaded || gamesLoading) {
        return <div className={styles.container}>読み込み中...</div>;
    }

    const favoriteGames = allGames.filter(game => favorites.includes(game.id));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>❤️ お気に入り</h1>
                <p className={styles.email}>お気に入りはこのブラウザに保存されます</p>
            </div>

            <div className={styles.content}>
                <div className={styles.gameList}>
                    {favoriteGames.length > 0 ? (
                        favoriteGames.map(game => (
                            <Link href={`/games/${game.id}`} key={game.id} className={styles.gameRow}>
                                <div className={styles.rowTitle}>{game.title}</div>
                                <div className={styles.rowStats}>
                                    <span>👍 {game.likes}</span>
                                    <span>👁️ {game.views}</span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <p>まだお気に入りのゲームがありません</p>
                            <Link href="/" className={styles.browseBtn}>
                                ゲームを探す
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
