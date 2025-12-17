"use client";

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';
import SearchModal from './SearchModal';

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

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
          {/* Tools Menu */}
          <div className={styles.toolsMenuContainer}>
            <button
              className={styles.toolsMenuBtn}
              onClick={() => setToolsOpen(!toolsOpen)}
            >
              🛠️ ツール ▼
            </button>

            {toolsOpen && (
              <>
                <div className={styles.toolsDropdownOverlay} onClick={() => setToolsOpen(false)} />
                <div className={styles.toolsDropdown}>
                  <Link href="/tools/dice" className={styles.toolItem} onClick={() => setToolsOpen(false)}>
                    <span className={styles.toolIcon}>🎲</span> サイコロ
                  </Link>
                  <Link href="/tools/cards" className={styles.toolItem} onClick={() => setToolsOpen(false)}>
                    <span className={styles.toolIcon}>🃏</span> トランプ
                  </Link>
                  <Link href="/tools/kings" className={styles.toolItem} onClick={() => setToolsOpen(false)}>
                    <span className={styles.toolIcon}>👑</span> 王様ゲーム
                  </Link>
                  <Link href="/tools/metronome" className={styles.toolItem} onClick={() => setToolsOpen(false)}>
                    <span className={styles.toolIcon}>⏱️</span> メトロノーム
                  </Link>
                  <Link href="/random" className={styles.toolItem} onClick={() => setToolsOpen(false)}>
                    <span className={styles.toolIcon}>🔀</span> ランダム
                  </Link>
                </div>
              </>
            )}
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
              <Link href="/profile" className={styles.profileLink} title="プロフィール">
                <span className={styles.userIcon}>👤</span>
                {/* Mobile: hide name, Desktop: show name will be handled in CSS if needed, or just show name */}
                <span className={styles.userName}>{user.name}</span>
              </Link>
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
