"use client";

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import SearchModal from './SearchModal';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

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

          {/* Favorites */}
          <Link href="/favorites" className={styles.favoritesBtn} aria-label="お気に入り">
            ❤️<span className={styles.favoritesLabel}>お気に入り</span>
          </Link>
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
