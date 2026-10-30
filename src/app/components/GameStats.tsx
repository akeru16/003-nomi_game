"use client";

import { useState, useEffect } from 'react';
import { applyVote } from '@/lib/games';
import { getVote, saveVote, Vote } from '@/lib/localStore';
import styles from './GameStats.module.css';

interface GameStatsProps {
    gameId: number;
    likes: number;
    dislikes: number;
    views: number;
}

const formatNumber = (num: number) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
};

const GameStats = ({ gameId, likes: initialLikes, dislikes: initialDislikes, views }: GameStatsProps) => {
    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [userAction, setUserActionState] = useState<Vote | null>(null);
    const [pending, setPending] = useState(false);

    // Load this browser's previous vote
    useEffect(() => {
        setUserActionState(getVote(gameId));
    }, [gameId]);

    const handleAction = async (type: Vote) => {
        if (pending) return;

        const prevAction = userAction;
        const prevLikes = likes;
        const prevDislikes = dislikes;
        const nextAction = userAction === type ? null : type;

        // Optimistic update
        if (prevAction === 'like') setLikes(prev => Math.max(0, prev - 1));
        if (prevAction === 'dislike') setDislikes(prev => Math.max(0, prev - 1));
        if (nextAction === 'like') setLikes(prev => prev + 1);
        if (nextAction === 'dislike') setDislikes(prev => prev + 1);
        setUserActionState(nextAction);
        saveVote(gameId, nextAction);

        setPending(true);
        try {
            await applyVote(gameId, prevAction, nextAction);
        } catch (error) {
            console.error('Failed to update vote:', error);

            // Revert on error
            setUserActionState(prevAction);
            saveVote(gameId, prevAction);
            setLikes(prevLikes);
            setDislikes(prevDislikes);
            alert("エラーが発生しました。もう一度お試しください。");
        } finally {
            setPending(false);
        }
    };

    return (
        <div className={styles.stats}>
            <button
                className={`${styles.item} ${styles.actionBtn} ${userAction === 'like' ? styles.activeLike : ''}`}
                onClick={() => handleAction('like')}
                title="いいね！"
            >
                <span className={styles.icon}>👍</span>
                <span className={styles.count}>{formatNumber(likes)}</span>
            </button>

            <button
                className={`${styles.item} ${styles.actionBtn} ${userAction === 'dislike' ? styles.activeDislike : ''}`}
                onClick={() => handleAction('dislike')}
                title="いまいち..."
            >
                <span className={styles.icon}>👎</span>
                <span className={styles.count}>{formatNumber(dislikes)}</span>
            </button>

            <div className={`${styles.item} ${styles.views}`} title="閲覧数">
                <span className={styles.icon}>👁️</span>
                <span className={styles.count}>{formatNumber(views)}</span>
            </div>
        </div>
    );
};

export default GameStats;
