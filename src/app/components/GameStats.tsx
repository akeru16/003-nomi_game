"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { setUserAction, getUserAction } from '@/lib/games';
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
    const { user, anonymousId } = useAuth();
    const router = useRouter();

    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [userAction, setUserActionState] = useState<'like' | 'dislike' | null>(null);

    // Load initial user action
    useEffect(() => {
        const loadAction = async () => {
            const userId = user?.id || anonymousId;
            if (userId && gameId) {
                const action = await getUserAction(userId, gameId);
                // @ts-ignore
                if (action === 'like' || action === 'dislike') {
                    // @ts-ignore
                    setUserActionState(action);
                }
            }
        };
        loadAction();
    }, [user, anonymousId, gameId]);

    const handleAction = async (type: 'like' | 'dislike') => {
        const userId = user?.id || anonymousId;

        if (!userId) {
            // Should not happen if anonymousId is working
            return;
        }

        // Optimistic update logic
        const prevAction = userAction;
        const prevLikes = likes;
        const prevDislikes = dislikes;

        if (userAction === type) {
            // Toggle off
            setUserActionState(null);
            if (type === 'like') setLikes(prev => Math.max(0, prev - 1));
            else setDislikes(prev => Math.max(0, prev - 1));
        } else {
            // Toggle on (and potentially switch)
            if (userAction === 'like' && type === 'dislike') {
                setLikes(prev => Math.max(0, prev - 1));
                setDislikes(prev => prev + 1);
            } else if (userAction === 'dislike' && type === 'like') {
                setDislikes(prev => Math.max(0, prev - 1));
                setLikes(prev => prev + 1);
            } else {
                // Fresh toggle
                if (type === 'like') setLikes(prev => prev + 1);
                else setDislikes(prev => prev + 1);
            }
            setUserActionState(type);
        }

        // Call API
        try {
            await setUserAction(userId, gameId, type);
        } catch (error: any) {
            console.error('Failed to update vote:', error);

            // Revert on error
            setUserActionState(prevAction);
            setLikes(prevLikes);
            setDislikes(prevDislikes);

            if (error.message === 'LIKE_LIMIT_REACHED') {
                alert("いいねの上限(100件)に達しました。\n新しいゲームをいいねするには、他のゲームのいいねを解除してください。");
            } else {
                alert("エラーが発生しました。もう一度お試しください。");
            }
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
