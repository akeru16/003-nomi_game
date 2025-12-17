"use client";

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Card {
    id: string; // Unique ID for key
    suit: '♠' | '♥' | '♦' | '♣' | 'JOKER';
    number: string;
    value: number; // For comparison (2=2, ..., K=13, A=14, JOKER=15)
    color: string;
}

type GameMode = 'kings-cup' | 'high-low';

const KINGS_CUP_RULES: Record<string, string> = {
    'A': '【ウォーターフォール】\nカードを引いた人が飲み始めると、隣の人も飲み始め、その次の人も順に飲む。最初の人が止めるまで飲み続ける！',
    '2': '【指名】\n引いた人が誰か一人を選んで飲ませる！',
    '3': '【自分】\n引いた人が飲む！',
    '4': '【女子】\n女性参加者全員が飲む！',
    '5': '【左右】\n引いた人の左右にいる人が飲む！',
    '6': '【男子】\n男性参加者全員が飲む！',
    '7': '【全員】\n参加者全員で乾杯して飲む！',
    '8': '【パートナー】\nパートナーを一人選ぶ。\n自分が飲む時はその人も道連れで飲む！',
    '9': '【ルール作成】\nルールを一つ決める（例：英語禁止）。\n違反した人は飲む。（前のルールは上書き）',
    '10': '【好きなゲーム】\n好きなゲームを決めて遊ぶ。\n負けた人が飲む！',
    'J': '【山手線ゲーム】\nお題を決めて山手線ゲーム。\n負けた人が飲む！',
    'Q': '【クエスチョンマスター】\nクエスチョンマスターからの質問に答えたら飲む！',
    'K': '【王様】\n真ん中のコップにお酒を注ぐ。\n4枚目を引いた人が全部飲み干す！☠️'
};

export default function CardsPage() {
    const [mode, setMode] = useState<GameMode>('kings-cup');
    const [deck, setDeck] = useState<Card[]>([]);
    const [currentCard, setCurrentCard] = useState<Card | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [history, setHistory] = useState<Card[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    // Kings Cup State
    const [kingsCount, setKingsCount] = useState(0);
    const [jokersCount, setJokersCount] = useState(0);

    // High & Low State
    const [streak, setStreak] = useState(0);
    const [lastResult, setLastResult] = useState<'win' | 'lose' | 'draw' | null>(null);
    const [gameStarted, setGameStarted] = useState(false); // Has the first card been drawn?

    // Initialize deck on load or reset
    const initDeck = () => {
        const suits = ['♠', '♥', '♦', '♣'] as const;
        const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const newDeck: Card[] = [];

        // Standard Cards
        suits.forEach(suit => {
            numbers.forEach((num, index) => {
                newDeck.push({
                    id: `${suit}-${num}`,
                    suit,
                    number: num,
                    value: index + 2, // 2=2, ..., K=12, A=14
                    color: (suit === '♥' || suit === '♦') ? '#d32f2f' : '#212121'
                });
            });
        });

        // Jokers removed as requested
        const jokerCount = 0;
        for (let i = 0; i < jokerCount; i++) {
            newDeck.push({
                id: `joker-${i}`,
                suit: 'JOKER',
                number: 'JOKER',
                value: 15,
                color: '#673ab7'
            });
        }

        // Shuffle
        for (let i = newDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }

        setDeck(newDeck);
        setCurrentCard(null);
        setHistory([]);
        setKingsCount(0);
        setJokersCount(0);
        setStreak(0);
        setLastResult(null);
        setGameStarted(false);
    };

    useEffect(() => {
        initDeck();
    }, [mode]);

    const drawCard = () => {
        if (deck.length === 0 || isDrawing) return;

        // In High & Low, drawing is triggered by guessing, unless it's the very first card
        if (mode === 'high-low' && gameStarted) return;

        performDraw();
    };

    const performDraw = (guess?: 'high' | 'low') => {
        setIsDrawing(true);
        setLastResult(null);

        // Animation delay
        setTimeout(() => {
            const newDeck = [...deck];
            const nextCard = newDeck.pop();

            if (nextCard) {
                // High & Low Logic
                if (mode === 'high-low' && currentCard && guess) {
                    if (nextCard.value === currentCard.value) {
                        setLastResult('draw');
                    } else if (
                        (guess === 'high' && nextCard.value > currentCard.value) ||
                        (guess === 'low' && nextCard.value < currentCard.value)
                    ) {
                        setLastResult('win');
                        setStreak(s => s + 1);
                    } else {
                        setLastResult('lose');
                        setStreak(0);
                    }
                } else if (mode === 'high-low') {
                    // First card or reset
                    setGameStarted(true);
                }

                // Kings Cup Logic
                if (mode === 'kings-cup') {
                    if (nextCard.number === 'K') setKingsCount(c => c + 1);
                    if (nextCard.suit === 'JOKER') setJokersCount(c => c + 1);
                }

                setDeck(newDeck);
                setCurrentCard(nextCard);
                setHistory(prev => [nextCard, ...prev]);
            }
            setIsDrawing(false);
        }, 200);
    };

    const handleHighLowGuess = (guess: 'high' | 'low') => {
        if (!currentCard || deck.length === 0 || isDrawing) return;
        performDraw(guess);
    };

    const handleReset = () => {
        if (confirm('山札をリセットしてシャッフルしますか？')) {
            initDeck();
        }
    };

    // Helper to get rule text
    const getRuleText = (card: Card) => {
        if (card.number === 'K' && kingsCount === 4) return '【ラストキング！】\n4枚目を引いた人がショットをグイ！☠️';
        if (card.suit === 'JOKER' && jokersCount === 2) return '【ラストジョーカー！】\nショット2杯！☠️☠️';
        return KINGS_CUP_RULES[card.number] || '';
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.modeSelector}>
                    <button
                        className={`${styles.modeBtn} ${mode === 'kings-cup' ? styles.activeMode : ''}`}
                        onClick={() => setMode('kings-cup')}
                    >
                        👑 Kings
                    </button>
                    <button
                        className={`${styles.modeBtn} ${mode === 'high-low' ? styles.activeMode : ''}`}
                        onClick={() => setMode('high-low')}
                    >
                        ⬆⬇ H&L
                    </button>
                </div>

                <div className={styles.controls}>
                    <button onClick={handleReset} className={styles.resetBtn}>
                        🔄 リセット
                    </button>
                </div>
            </div>

            <div className={styles.status}>
                残り: <span className={styles.count}>{deck.length}</span> 枚
                {mode === 'high-low' && <span className={styles.streak}>連勝: {streak}</span>}
                {mode === 'kings-cup' && <span className={styles.kingsStatus}>Kings: {kingsCount}/4</span>}
            </div>

            {/* Main Card Area */}
            <div className={styles.cardArea} onClick={() => !gameStarted && drawCard()}>
                {currentCard ? (
                    <div className={`${styles.card} ${isDrawing ? styles.drawing : ''}`} style={{ color: currentCard.color }}>
                        <div className={styles.cardTopSuit}>{currentCard.suit === 'JOKER' ? '🤡' : currentCard.suit}</div>
                        <div className={styles.cardCenterNumber}>{currentCard.number}</div>

                        {/* Result Overlay for High & Low */}
                        {lastResult && (
                            <div className={`${styles.resultOverlay} ${styles[lastResult]}`}>
                                {lastResult === 'win' ? 'WIN!' : lastResult === 'lose' ? 'LOSE...' : 'DRAW'}
                            </div>
                        )}
                    </div>
                ) : deck.length > 0 ? (
                    <div className={`${styles.cardBack} ${isDrawing ? styles.drawing : ''}`}>
                        <div className={styles.pattern}></div>
                        <span className={styles.tapText}>TAP TO START</span>
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>山札がなくなりました</p>
                        <button onClick={initDeck} className={styles.mainResetBtn}>
                            もう一度遊ぶ
                        </button>
                    </div>
                )}
            </div>

            {/* Game Mode Specific UI */}
            <div className={styles.gameUI}>
                {mode === 'kings-cup' && currentCard && (
                    <div className={styles.ruleBox}>
                        <h3 className={styles.ruleTitle}>ルール</h3>
                        <p className={styles.ruleText}>{getRuleText(currentCard)}</p>
                    </div>
                )}

                {mode === 'high-low' && gameStarted && deck.length > 0 && (
                    <div className={styles.highLowControls}>
                        <p className={styles.instruction}>次のカードは？</p>
                        <div className={styles.hlButtons}>
                            <button
                                onClick={() => handleHighLowGuess('high')}
                                className={styles.highBtn}
                                disabled={isDrawing}
                            >
                                ⬆ HIGH
                            </button>
                            <button
                                onClick={() => handleHighLowGuess('low')}
                                className={styles.lowBtn}
                                disabled={isDrawing}
                            >
                                ⬇ LOW
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* History Trigger */}
            {history.length > 1 && (
                <button onClick={() => setShowHistory(true)} className={styles.historyBtn}>
                    履歴を見る
                </button>
            )}

            {/* History Modal */}
            {showHistory && (
                <div className={styles.modalOverlay} onClick={() => setShowHistory(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>履歴</h2>
                            <button onClick={() => setShowHistory(false)} className={styles.closeBtn}>✕</button>
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
