"use client";

import { useState } from 'react';
import styles from './page.module.css';

interface Assignment {
    name: string;
    role: string; // 'King' or number
    isKing: boolean;
}

type GamePhase = 'input' | 'askKing' | 'showKing' | 'showAll';

export default function KingsGamePage() {
    const [names, setNames] = useState<string[]>([]);
    const [currentName, setCurrentName] = useState('');
    const [phase, setPhase] = useState<GamePhase>('input');
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    const handleAddName = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!currentName.trim()) return;
        setNames([...names, currentName.trim()]);
        setCurrentName('');
    };

    const removeName = (index: number) => {
        setNames(names.filter((_, i) => i !== index));
    };

    const startGame = () => {
        if (names.length < 2) return;

        // Shuffle names
        const shuffled = [...names].sort(() => Math.random() - 0.5);

        // Assign roles: First is King, rest are numbers
        const newAssignments: Assignment[] = shuffled.map((name, index) => {
            if (index === 0) {
                return { name, role: 'King', isKing: true };
            } else {
                return { name, role: String(index), isKing: false };
            }
        });

        // Sort: King first, then numbers
        newAssignments.sort((a, b) => {
            if (a.isKing) return -1;
            if (b.isKing) return 1;
            return parseInt(a.role) - parseInt(b.role);
        });

        setAssignments(newAssignments);
        setPhase('askKing');
    };

    const handleTap = () => {
        if (phase === 'askKing') {
            setPhase('showKing');
        } else if (phase === 'showKing') {
            setPhase('showAll');
        }
    };

    const resetGame = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPhase('input');
        setAssignments([]);
    };

    const reAssign = (e: React.MouseEvent) => {
        e.stopPropagation();
        startGame();
    };

    const king = assignments.find(a => a.isKing);
    const others = assignments.filter(a => !a.isKing);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>王様ゲーム 👑</h1>
            <p className={styles.subtitle}>王様の命令は絶対！</p>

            {phase === 'input' && (
                <div className={styles.inputSection}>
                    <form onSubmit={handleAddName} className={styles.formGroup}>
                        <input
                            type="text"
                            value={currentName}
                            onChange={(e) => setCurrentName(e.target.value)}
                            placeholder="参加者の名前を追加"
                            className={styles.input}
                        />
                        <button type="submit" className={styles.addBtn}>追加</button>
                    </form>

                    <div className={styles.nameList}>
                        {names.map((name, index) => (
                            <div key={index} className={styles.nameTag}>
                                {name}
                                <button onClick={() => removeName(index)} className={styles.removeBtn}>×</button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={startGame}
                        disabled={names.length < 2}
                        className={styles.startBtn}
                    >
                        ゲームスタート ({names.length}人)
                    </button>
                </div>
            )}

            {phase !== 'input' && (
                <div className={styles.resultSection} onClick={handleTap}>

                    {/* King Card Area */}
                    <div className={styles.kingReveal}>
                        {phase === 'askKing' && (
                            <div className={styles.phaseMessage}>
                                王様だーれだ？<br />
                                <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(タップして表示)</span>
                            </div>
                        )}

                        {(phase === 'showKing' || phase === 'showAll') && (
                            <div className={styles.kingContent}>
                                <div className={styles.kingIcon}>👑</div>
                                <div className={styles.kingName}>{king?.name}</div>
                                {phase === 'showKing' && (
                                    <div className={styles.instruction}>画面をタップして全員を表示</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Others List Area */}
                    {phase === 'showAll' && (
                        <div className={styles.othersList}>
                            {others.map((p) => (
                                <div key={p.role} className={styles.otherCard}>
                                    <span className={styles.roleNumber}>{p.role}番</span>
                                    <span className={styles.otherName}>{p.name}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {phase === 'showAll' && (
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button onClick={resetGame} className={styles.resetBtn}>メンバー変更</button>
                            <button onClick={reAssign} className={styles.resetBtn}>もう一回！</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
