"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import styles from './page.module.css';
import { GAME_TAGS } from '@/data/games';
import { hasContentPolicyViolation } from '@/lib/contentPolicy';

export default function PostPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rules, setRules] = useState<string[]>(['']);
    const [materials, setMaterials] = useState<string[]>(['']);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Rule Handlers
    const handleRuleChange = (index: number, value: string) => {
        const newRules = [...rules];
        newRules[index] = value;
        setRules(newRules);
    };

    const addRuleStep = () => {
        setRules([...rules, '']);
    };

    const removeRuleStep = (index: number) => {
        const newRules = rules.filter((_, i) => i !== index);
        setRules(newRules);
    };

    // Material Handlers
    const handleMaterialChange = (index: number, value: string) => {
        const newMaterials = [...materials];
        newMaterials[index] = value;
        setMaterials(newMaterials);
    };

    const addMaterial = () => {
        setMaterials([...materials, '']);
    };

    const removeMaterial = (index: number) => {
        const newMaterials = materials.filter((_, i) => i !== index);
        setMaterials(newMaterials);
    };

    // Tag Handlers
    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) {
            alert("タイトルと説明は必須です！");
            return;
        }

        if (selectedTags.length === 0) {
            alert("タグを少なくとも1つ選択してください！");
            return;
        }

        if (!user) {
            alert("ログインが必要です");
            return;
        }

        const textsToCheck = [
            title,
            description,
            ...rules.filter(r => r.trim() !== ''),
            ...materials.filter(m => m.trim() !== ''),
        ];
        if (hasContentPolicyViolation(textsToCheck)) {
            alert("投稿内容に危険な飲酒を助長する表現が含まれています。内容を修正してください。");
            return;
        }

        try {
            const { createGame, getUserGameCount } = await import('@/lib/games');

            // Check post limit
            const postCount = await getUserGameCount(user.id);
            if (postCount >= 100) {
                alert("投稿数の上限(100件)に達しました。\n新しいゲームを投稿するには、プロフィールから古いゲームを削除してください。");
                return;
            }

            const newGame = await createGame({
                title,
                description,
                rules: rules.filter(r => r.trim() !== ''),
                materials: materials.filter(m => m.trim() !== ''),
                tags: selectedTags,
                userId: user.id,
                userName: user.name
            });

            alert("飲みゲーを投稿しました！🎉");
            router.push(`/games/${newGame.id}`);
        } catch (error) {
            console.error('Error creating game:', error);
            alert("投稿に失敗しました。もう一度お試しください。");
        }
    };

    if (loading || !user) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>飲みゲーを投稿</h1>
                <p className={styles.subtitle}>みんなで盛り上がるゲームを共有しよう！</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Title */}
                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.label}>ゲームのタイトル <span className={styles.required}>*</span></label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.input}
                            placeholder="例：アルティメットチキンレース"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>どんなゲーム？（概要） <span className={styles.required}>*</span></label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.textarea}
                            placeholder="ゲームの雰囲気や、盛り上がるポイントを書いてね"
                            rows={3}
                            required
                        />
                    </div>

                    {/* Dynamic Rules */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>遊び方・ルール <span className={styles.required}>*</span></label>
                        <div className={styles.rulesContainer}>
                            {rules.map((rule, index) => (
                                <div key={index} className={styles.ruleRow}>
                                    <span className={styles.ruleNumber}>{index + 1}.</span>
                                    <input
                                        type="text"
                                        value={rule}
                                        onChange={(e) => handleRuleChange(index, e.target.value)}
                                        className={styles.input}
                                        placeholder={`手順 ${index + 1}`}
                                        required={index === 0}
                                    />
                                    {rules.length > 1 && (
                                        <button type="button" onClick={() => removeRuleStep(index)} className={styles.removeBtn} title="削除">
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addRuleStep} className={styles.addBtn}>
                            ＋ 手順を追加
                        </button>
                    </div>

                    {/* Dynamic Materials */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>必要なもの</label>
                        <div className={styles.rulesContainer}>
                            {materials.map((material, index) => (
                                <div key={index} className={styles.ruleRow}>
                                    <span className={styles.bullet}>•</span>
                                    <input
                                        type="text"
                                        value={material}
                                        onChange={(e) => handleMaterialChange(index, e.target.value)}
                                        className={styles.input}
                                        placeholder={index === 0 ? "例：トランプ" : "必要なもの"}
                                    />
                                    {materials.length > 1 && (
                                        <button type="button" onClick={() => removeMaterial(index)} className={styles.removeBtn} title="削除">
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addMaterial} className={styles.addBtn}>
                            ＋ 必要なものを追加
                        </button>
                    </div>

                    {/* Tags Selection */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>タグ (複数選択可) <span className={styles.required}>*</span></label>
                        <div className={styles.tagSelector}>
                            {GAME_TAGS.map(tag => (
                                <button
                                    key={tag}
                                    type="button"
                                    className={`${styles.tagItem} ${selectedTags.includes(tag) ? styles.tagSelected : ''}`}
                                    onClick={() => toggleTag(tag)}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                        {selectedTags.length === 0 && <p className={styles.helperText}>少なくとも1つ選択してください</p>}
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={selectedTags.length === 0}>
                        投稿する！
                    </button>
                </form>
            </div>
        </div>
    );
}
