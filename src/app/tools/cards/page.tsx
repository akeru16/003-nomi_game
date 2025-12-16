"use client";

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Card {
    id: string; // Unique ID for key
    suit: '♠' | '♥' | '♦' | '♣' | 'JOKER';
    number: string;
    color: string;
}

export default function CardsPage() {
    const [deck, setDeck] = useState<Card[]>([]);
    const [currentCard, setCurrentCard] = useState<Card | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [jokerCount, setJokerCount] = useState<0 | 1 | 2>(2);
    const [history, setHistory] = useState<Card[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    // Initialize deck on load or reset
    const initDeck = (jokers: 0 | 1 | 2) => {
        const suits = ['♠', '♥', '♦', '♣'] as const;
        const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const newDeck: Card[] = [];

        // Standard Cards
        suits.forEach(suit => {
            numbers.forEach(num => {
                newDeck.push({
                    id: `${suit}-${num}`,
                    suit,
                    number: num,
                    color: (suit === '♥' || suit === '♦') ? '#d32f2f' : '#212121'
                });
            });
        });

        // Jokers
        for (let i = 0; i < jokers; i++) {
            newDeck.push({
                id: `joker-${i}`,
                suit: 'JOKER',
                number: 'JOKER',
                color: '#673ab7'
            });
        }

        // Shuffle using Fisher-Yates
        for (let i = newDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }

        setDeck(newDeck);
        setCurrentCard(null);
        setHistory([]);
    };

    useEffect(() => {
        initDeck(jokerCount);
    }, [jokerCount]);

    const drawCard = () => {
        if (deck.length === 0 || isDrawing) return;
        setIsDrawing(true);

        // Animation
        setTimeout(() => {
            const newDeck = [...deck];
            const card = newDeck.pop(); // Take top card
            if (card) {
                setDeck(newDeck);
                setCurrentCard(card);
                setHistory(prev => [card, ...prev]);
            }
            setIsDrawing(false);
        }, 200);
    };

    const handleReset = () => {
        if (confirm('山札をリセットしてシャッフルしますか？')) {
            initDeck(jokerCount);
        }
    };

    const toggleJoker = () => {
        setJokerCount(prev => {
            if (prev === 2) return 0;
            if (prev === 0) return 1;
            return 2;
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>トランプ</h1>
                <div className={styles.controls}>
                    <button onClick={toggleJoker} className={styles.controlBtn}>
                        JOKER: {jokerCount}枚
                    </button>
                    <button onClick={handleReset} className={styles.resetBtn}>
                        🔄 リセット
                    </button>
                </div>

                {/* Previous Card - Now Clickable */}
                {history.length > 1 && (
                    <div
                        className={styles.previousCardContainer}
                        onClick={() => setShowHistory(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className={styles.prevLabel}>Prev</span>
                        <div className={styles.smallCard} style={{ color: history[1].color }}>
                            <div>{history[1].suit === 'JOKER' ? '🤡' : history[1].suit}</div>
                            <div>{history[1].number}</div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.status}>
                残り: <span className={styles.count}>{deck.length}</span> 枚
            </div>

            <div className={styles.cardArea} onClick={drawCard}>
                {currentCard ? (
                    <div className={`${styles.card} ${isDrawing ? styles.drawing : ''}`} style={{ color: currentCard.color }}>
                        <div className={styles.cardTopSuit}>{currentCard.suit === 'JOKER' ? '🤡' : currentCard.suit}</div>
                        <div className={styles.cardCenterNumber}>{currentCard.number}</div>
                        {/* Removed bottom suit as requested */}
                    </div>
                ) : deck.length > 0 ? (
                    <div className={`${styles.cardBack} ${isDrawing ? styles.drawing : ''}`}>
                        <div className={styles.pattern}></div>
                        <span className={styles.tapText}>TAP</span>
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>山札がなくなりました</p>
                        <button onClick={() => initDeck(jokerCount)} className={styles.mainResetBtn}>
                            最初から遊ぶ
                        </button>
                    </div>
                )}
            </div>

            {/* History Modal */}
            {showHistory && (
                <div className={styles.modalOverlay} onClick={() => setShowHistory(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>引いたカード履歴</h2>
                            <button onClick={() => setShowHistory(false)} className={styles.closeBtn}>
                                ✕
                            </button>
                        </div>
                        <div className={styles.historyGrid}>
                            {history.map((card, index) => (
                                <div key={card.id} className={styles.historyCard} style={{ color: card.color }}>
                                    <div className={styles.historyCardSuit}>
                                        {card.suit === 'JOKER' ? '🤡' : card.suit}
                                    </div>
                                    <div className={styles.historyCardNumber}>{card.number}</div>
                                    <div className={styles.historyCardOrder}>#{index + 1}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
