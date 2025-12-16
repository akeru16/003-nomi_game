"use client";

import { useState, Suspense } from 'react';
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
            aria-label="検索"
          >
            🔍
          </button>

          {/* Post Button */}
          <button className={styles.postBtn} onClick={handlePostClick}>
            投稿する
          </button>

          {/* User Menu */}
          {user ? (
            <div className={styles.userMenu}>
              <Link href="/profile" className={styles.profileLink}>
                👤 {user.name}
              </Link>
              <button onClick={logout} className={styles.logoutBtn}>
                ログアウト
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.loginBtn}>
              ログイン
            </Link>
          )}
        </nav>
      </div>

      {/* Search Modal with Suspense */}
      <Suspense fallback={null}>
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </Suspense>
    </header>
  );
};

export default Header;
