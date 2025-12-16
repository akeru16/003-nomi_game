'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getGames } from '../../lib/games';
import type { Game } from '../../lib/games';
import styles from './page.module.css';

export default function ProfilePage() {
    const { user, favorites, loading, updateUsername } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'favorites' | 'posts'>('favorites');
    const [isEditingName, setIsEditingName] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [gamesLoading, setGamesLoading] = useState(true);

    // Fetch all games
    useEffect(() => {
        async function fetchGames() {
            const games = await getGames({});
            setAllGames(games);
            setGamesLoading(false);
        }
        fetchGames();
    }, []);

    // Redirect if not logged in
    if (!loading && !user) {
        router.push('/login');
        return null;
    }

    if (loading || gamesLoading) {
        return <div className={styles.container}>読み込み中...</div>;
    }

    const favoriteGames = allGames.filter(game => favorites.includes(game.id.toString()));
    const myPosts = allGames.filter(game => game.posted_by && game.posted_by === user?.name);

    const handleStartEdit = () => {
        setNewUsername(user?.name || '');
        setIsEditingName(true);
    };

    const handleSaveUsername = () => {
        if (newUsername.trim()) {
            updateUsername(newUsername.trim());
            setIsEditingName(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditingName(false);
        setNewUsername('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {isEditingName ? (
                    <div className={styles.editMode}>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className={styles.usernameInput}
                            placeholder="ユーザー名"
                            maxLength={20}
                        />
                        <div className={styles.editButtons}>
                            <button onClick={handleSaveUsername} className={styles.saveBtn}>
                                保存
                            </button>
                            <button onClick={handleCancelEdit} className={styles.cancelBtn}>
                                キャンセル
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className={styles.title}>
                            {user?.name} のプロフィール
                            <button onClick={handleStartEdit} className={styles.editIconBtn} title="ユーザー名を編集">
                                ✏️
                            </button>
                        </h1>
                        <p className={styles.email}>{user?.email}</p>
                    </>
                )}
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'favorites' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    お気に入り ({favoriteGames.length})
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'posts' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('posts')}
                >
                    投稿したゲーム ({myPosts.length})
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'favorites' && (
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
                )}

                {activeTab === 'posts' && (
                    <div className={styles.gameList}>
                        {myPosts.length > 0 ? (
                            myPosts.map(game => (
                                <div key={game.id} className={styles.gameRow}>
                                    <Link href={`/games/${game.id}`} className={styles.rowTitle}>
                                        {game.title}
                                    </Link>
                                    <div className={styles.rowStats}>
                                        <span>👍 {game.likes}</span>
                                        <span>👁️ {game.views}</span>
                                        <Link href={`/post/edit/${game.id}`} className={styles.editBtn}>
                                            編集
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.emptyState}>
                                <p>まだゲームを投稿していません</p>
                                <Link href="/post" className={styles.browseBtn}>
                                    ゲームを投稿する
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
