"use client";

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './GameStats.module.css';

interface GameStatsProps {
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

const GameStats = ({ likes: initialLikes, dislikes: initialDislikes, views }: GameStatsProps) => {
    const { user } = useAuth();
    const router = useRouter();

    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(null);

    const handleAction = (type: 'like' | 'dislike') => {
        if (!user) {
            if (confirm("ログインが必要です。ログインページに移動しますか？")) {
                router.push('/login');
            }
            return;
        }

        // Optimistic update
        if (userAction === type) {
            // Toggle off
            setUserAction(null);
            if (type === 'like') setLikes(prev => prev - 1);
            else setDislikes(prev => prev - 1);
        } else {
            // Toggle on (and potentially switch)
            if (userAction === 'like' && type === 'dislike') {
                setLikes(prev => prev - 1);
                setDislikes(prev => prev + 1);
            } else if (userAction === 'dislike' && type === 'like') {
                setDislikes(prev => prev - 1);
                setLikes(prev => prev + 1);
            } else {
                // Fresh toggle
                if (type === 'like') setLikes(prev => prev + 1);
                else setDislikes(prev => prev + 1);
            }
            setUserAction(type);
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
