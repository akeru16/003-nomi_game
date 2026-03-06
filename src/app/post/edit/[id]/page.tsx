'use client';

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext';
import styles from '../../page.module.css';
import { GAME_TAGS } from '@/data/games';
import { getGameById, updateGame, deleteGame } from '@/lib/games';
import { hasContentPolicyViolation } from '@/lib/contentPolicy';

export default function EditGamePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const id = parseInt(params.id as string);

    const [isLoadingGame, setIsLoadingGame] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rules, setRules] = useState<string[]>(['']);
    const [materials, setMaterials] = useState<string[]>(['']);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
            return;
        }

        async function fetchGame() {
            if (!id) return;

            try {
                const game = await getGameById(id);
                if (!game) {
                    alert('ゲームが見つかりませんでした');
                    router.push('/profile');
                    return;
                }

                // Verify ownership (compare ID)
                if (game.posted_by && game.posted_by !== user?.id) {
                    alert('このゲームを編集する権限がありません');
                    router.push('/');
                    return;
                }

                setTitle(game.title);
                setDescription(game.description);
                setRules(game.rules.length > 0 ? game.rules : ['']);
                setMaterials(game.materials && game.materials.length > 0 ? game.materials : ['']);
                setSelectedTags(game.tags);
                setIsLoadingGame(false);
            } catch (error) {
                console.error('Error fetching game for edit:', error);
                alert('エラーが発生しました');
                router.push('/profile');
            }
        }

        if (user) {
            fetchGame();
        }
    }, [id, user, loading, router]);


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

        const textsToCheck = [
            title,
            description,
            ...rules.filter(r => r.trim() !== ''),
            ...materials.filter(m => m.trim() !== ''),
        ];
        if (hasContentPolicyViolation(textsToCheck)) {
            alert("更新内容に危険な飲酒を助長する表現が含まれています。内容を修正してください。");
            return;
        }

        try {
            await updateGame(id, {
                title,
                description,
                rules: rules.filter(r => r.trim() !== ''),
                materials: materials.filter(m => m.trim() !== ''),
                tags: selectedTags,
            });

            alert("飲みゲーを更新しました！🎉");
            router.push(`/games/${id}`);
        } catch (error) {
            console.error('Error updating game:', error);
            alert("更新に失敗しました。もう一度お試しください。");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("本当に削除しますか？\nこの操作は取り消せません。")) {
            return;
        }

        setIsDeleting(true);
        try {
            if (user) {
                await deleteGame(id, user.id);
                alert("ゲームを削除しました。");
                router.push('/profile');
            }
        } catch (error) {
            console.error('Error deleting game:', error);
            alert("削除に失敗しました。");
            setIsDeleting(false);
        }
    };

    if (loading || isLoadingGame) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h1 className={styles.title} style={{ marginBottom: 0 }}>飲みゲーを編集</h1>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className={styles.deleteBtn}
                        style={{
                            background: '#e53e3e',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                        }}
                        disabled={isDeleting}
                    >
                        {isDeleting ? '削除中...' : '削除する'}
                    </button>
                </div>

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
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitBtn}>
                            更新する
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className={styles.cancelBtn}
                            style={{
                                background: 'transparent',
                                color: '#718096',
                                border: '1px solid #cbd5e0',
                                marginLeft: '1rem',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            キャンセル
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
