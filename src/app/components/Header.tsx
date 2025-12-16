"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';
import SearchModal from './SearchModal';

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handlePostClick = () => {
    if (!user) {
      router.push('/login');
    } else {
      router.push('/post');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src="/logo.png"
              alt="のみげーむ"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </Link>

        <nav className={styles.nav}>
          {/* Quick Tools */}
          <div className={styles.toolLinks}>
            <Link href="/tools/dice" className={styles.toolLink} title="サイコロ">🎲</Link>
            <Link href="/tools/cards" className={styles.toolLink} title="トランプ">🃏</Link>
            <Link href="/tools/kings" className={styles.toolLink} title="王様ゲーム">👑</Link>
            <Link href="/random" className={styles.toolLink} title="ランダム">🔀</Link>
          </div>

          {/* Search Trigger */}
          <button
            className={styles.searchTrigger}
            onClick={() => setIsSearchOpen(true)}
            aria-label="検索画面を開く"
          >
            <span className={styles.searchIcon}>🔍</span>
            <span className={styles.searchText}>飲みゲーを探す</span>
          </button>

          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />

          {/* Actions */}
          <div className={styles.actions}>
            {user ? (
              <>
                <span className={styles.welcomeMsg}>ようこそ、{user.name}さん</span>
                <Link href="/profile">
                  <button className={styles.profileBtn}>プロフィール</button>
                </Link>
                <button onClick={logout} className={styles.loginBtn}>ログアウト</button>
              </>
            ) : (
              <Link href="/login">
                <button className={styles.loginBtn}>ログイン</button>
              </Link>
            )}

            <button onClick={handlePostClick} className={styles.postBtn}>投稿する</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
