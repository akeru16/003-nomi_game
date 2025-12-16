'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { getGames } from '../../lib/games';
import type { Game } from '../../lib/games';

type SortType = 'all' | 'popular' | 'trending';
type CountType = 10 | 50 | 100;

export default function RandomPage() {
    const router = useRouter();
    const [isSpinning, setIsSpinning] = useState(false);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [sortType, setSortType] = useState<SortType>('popular');
    const [topCount, setTopCount] = useState<CountType>(10);
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch games on mount
    useEffect(() => {
        async function fetchGames() {
            const games = await getGames({});
            setAllGames(games);
            setLoading(false);
        }
        fetchGames();
    }, []);

    const spin = () => {
        if (allGames.length === 0) return;

        setIsSpinning(true);
        setSelectedGame(null);

        // Filter Logic
        let pool = [...allGames];
        if (sortType === 'popular') {
            pool.sort((a, b) => b.likes - a.likes);
            pool = pool.slice(0, topCount);
        } else if (sortType === 'trending') {
            pool.sort((a, b) => (b.weekly_likes || 0) - (a.weekly_likes || 0));
            pool = pool.slice(0, topCount);
        }
        // If 'all', use full pool

        // Safety: If pool is empty (shouldn't happen), use all
        if (pool.length === 0) pool = allGames;

        const duration = 2000;
        const interval = 100;
        const startTime = Date.now();

        const timer = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * pool.length);
            setSelectedGame(pool[randomIndex]);

            if (Date.now() - startTime > duration) {
                clearInterval(timer);
                setIsSpinning(false);
                // Final pick
                const finalDetails = pool[Math.floor(Math.random() * pool.length)];
                setSelectedGame(finalDetails);
            }
        }, interval);
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>読み込み中...</h1>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>何を遊ぶ？</h1>
            <p className={styles.subtitle}>迷った時は運に任せよう！</p>

            <div className={styles.controls}>
                <div className={styles.controlGroup}>
                    <label>ジャンル:</label>
                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value as SortType)}
                        className={styles.select}
                    >
                        <option value="popular">人気順</option>
                        <option value="trending">急上昇</option>
                        <option value="all">すべて</option>
                    </select>
                </div>

                {sortType !== 'all' && (
                    <div className={styles.controlGroup}>
                        <label>範囲:</label>
                        <select
                            value={topCount}
                            onChange={(e) => setTopCount(Number(e.target.value) as CountType)}
                            className={styles.select}
                        >
                            <option value={10}>TOP 10</option>
                            <option value={50}>TOP 50</option>
                            <option value={100}>TOP 100</option>
                        </select>
                    </div>
                )}
            </div>

            <div className={styles.wheelContainer}>
                {selectedGame && !isSpinning ? (
                    <div className={styles.resultCard}>
                        <div className={styles.resultLabel}>運命のゲームは...</div>
                        <h2 className={styles.resultTitle}>{selectedGame.title}</h2>
                        <button onClick={() => router.push(`/games/${selectedGame.id}`)} className={styles.goBtn}>
                            このゲームを見る！
                        </button>
                        <button onClick={spin} className={styles.retryBtn}>
                            もう一回回す
                        </button>
                    </div>
                ) : (
                    <div className={`${styles.spinner} ${isSpinning ? styles.spinning : ''}`}>
                        <span className={styles.spinnerText}>?</span>
                    </div>
                )}
            </div>

            {!selectedGame && (
                <button
                    onClick={spin}
                    className={styles.spinBtn}
                    disabled={isSpinning}
                >
                    {isSpinning ? '選出中...' : 'START!'}
                </button>
            )}
        </div>
    );
}
