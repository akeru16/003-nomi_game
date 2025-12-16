"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './SearchModal.module.css';
import { GAME_TAGS } from '@/data/games';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize state from URL logic slightly complex because of strict React hydration?
    // Safer to set in useEffect or use initial state derived if not SSR critical (this is a modal).
    // React state initialization is only once.

    const [query, setQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync from URL when modal opens
    useEffect(() => {
        if (isOpen) {
            const q = searchParams.get('q') || '';
            const tagsParam = searchParams.get('tags');
            const tags = tagsParam ? tagsParam.split(',') : [];

            setQuery(q);
            setSelectedTags(tags);

            if (inputRef.current) {
                setTimeout(() => inputRef.current?.focus(), 50);
            }
        }
    }, [isOpen, searchParams]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (query.trim()) params.set('q', query.trim());
        if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));

        if (params.toString()) {
            router.push(`/?${params.toString()}`);
            onClose();
            // Optional: clear state or keep it? 
            // Better to clear for fresh search next time.
            setQuery('');
            setSelectedTags([]);
        }
    };

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <span className={styles.title}>飲みゲーを探す</span>
                    <button onClick={onClose} className={styles.closeBtn}>×</button>
                </div>

                <div className={styles.body}>
                    <form onSubmit={handleSearch} className={styles.searchForm}>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="キーワードを入力 (例: リズム)"
                            className={styles.input}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" className={styles.searchBtn} aria-label="検索">
                            🔍
                        </button>
                    </form>

                    <h3 className={styles.sectionTitle}>タグで絞り込む</h3>
                    <div className={styles.tagCloud}>
                        {GAME_TAGS.map(tag => (
                            <button
                                key={tag}
                                type="button"
                                className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagSelected : ''}`}
                                onClick={() => toggleTag(tag)}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                        <button onClick={handleSearch} className={styles.submitBtn}>
                            この条件で検索 ({selectedTags.length > 0 ? `${selectedTags.length}タグ + ` : ''}キーワード)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
