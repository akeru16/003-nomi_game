"use client";

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../login/page.module.css'; // Reusing Login styles

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await register(email, name, password);
            router.push('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : '登録に失敗しました');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>新規登録</h1>
                <p className={styles.subtitle}>のみげーむへようこそ！</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>ニックネーム</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                            placeholder="飲みゲーマスター"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>メールアドレス</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            placeholder="example@nomi.game"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>パスワード</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}
                    <button type="submit" className={styles.submitBtn}>
                        登録してはじめる
                    </button>
                </form>

                <div className={styles.footerLink}>
                    すでにアカウントをお持ちですか？ <Link href="/login" className={styles.link}>ログイン</Link>
                </div>
            </div>
        </div>
    );
}
