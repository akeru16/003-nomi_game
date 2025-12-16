"use client";

import { useState } from 'react';
import styles from './page.module.css';

// Helper to deduce pip positions for standard dice 1-6
const getPips = (value: number) => {
    // 3x3 Grid mappings
    // 0 1 2
    // 3 4 5
    // 6 7 8
    const pips: number[] = [];
    if (value === 1) pips.push(4);
    if (value === 2) pips.push(0, 8);
    if (value === 3) pips.push(0, 4, 8);
    if (value === 4) pips.push(0, 2, 6, 8);
    if (value === 5) pips.push(0, 2, 4, 6, 8);
    if (value === 6) pips.push(0, 2, 3, 5, 6, 8);
    return pips;
};

export default function DicePage() {
    const [diceCount, setDiceCount] = useState<number>(1);
    const [results, setResults] = useState<number[]>([1]);
    const [isRolling, setIsRolling] = useState(false);

    const handleCountChange = (delta: number) => {
        const newCount = Math.max(1, Math.min(5, diceCount + delta));
        setDiceCount(newCount);
        // Reset results to 1s when count changes, or random? Let's just resize array
        setResults(new Array(newCount).fill(1));
    };

    const rollDice = () => {
        if (isRolling) return;
        setIsRolling(true);

        // Animation
        let counter = 0;
        const interval = setInterval(() => {
            setResults(Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1));
            counter++;
            if (counter > 10) {
                clearInterval(interval);
                setIsRolling(false);
            }
        }, 100);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>サイコロ</h1>
            <p className={styles.subtitle}>タップして振る！</p>

            {/* Controls */}
            <div className={styles.controls}>
                <span className={styles.controlLabel}>個数:</span>
                <button
                    onClick={(e) => { e.stopPropagation(); handleCountChange(-1); }}
                    disabled={diceCount <= 1 || isRolling}
                    className={styles.countBtn}
                >
                    -
                </button>
                <span className={styles.countDisplay}>{diceCount}</span>
                <button
                    onClick={(e) => { e.stopPropagation(); handleCountChange(1); }}
                    disabled={diceCount >= 5 || isRolling}
                    className={styles.countBtn}
                >
                    +
                </button>
            </div>

            {/* Dice Area */}
            <div
                className={`${styles.diceContainer} ${isRolling ? styles.shaking : ''}`}
                onClick={rollDice}
            >
                {results.map((value, index) => (
                    <div key={index} className={styles.dice}>
                        {[...Array(9)].map((_, i) => {
                            const showPip = getPips(value).includes(i);
                            const isRed = value === 1 && i === 4; // Center pip for 1 is red
                            return (
                                <div
                                    key={i}
                                    style={{ visibility: showPip ? 'visible' : 'hidden' }}
                                    className={`${styles.pip} ${isRed ? styles.pipRed : ''}`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>

            <p className={styles.instruction}>画面タップで振れます</p>
        </div>
    );
}

