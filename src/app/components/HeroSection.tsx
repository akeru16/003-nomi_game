"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../page.module.css'; // Reusing home page styles
import SearchModal from './SearchModal';

interface HeroSectionProps {
    searchQuery?: string;
}

export default function HeroSection({ searchQuery }: HeroSectionProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // If there is a search query, existing logic was to hide Hero.
    // We can handle that in the parent or here. 
    // If we handle it here, we return null.
    if (searchQuery) return null;

    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroImage}>
                    <Image
                        src="/logo.png"
                        alt="のみげーむ"
                        width={600}
                        height={300}
                        style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
                        priority
                    />
                </div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.heroTitleMain}>飲みの場を、</span>
                        <span className={styles.heroTitleSub}>もっと楽しく。</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        「のみげーむ」は、みんなで盛り上がる飲み会ゲームの投稿・共有サイト。<br />
                        あなたの知らない新しいゲームに出会えるかも？
                    </p>
                    <div className={styles.heroActions}>
                        {/* Primary Button opens Modal */}
                        <button
                            className={`${styles.actionBtn} ${styles.primaryBtn}`}
                            onClick={() => setIsSearchOpen(true)}
                        >
                            飲みゲーを探す
                        </button>

                        <Link href="/random">
                            <button className={`${styles.actionBtn} ${styles.secondaryBtn}`}>
                                ランダムで選ぶ
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
}
