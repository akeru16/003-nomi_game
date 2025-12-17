"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './page.module.css';

export default function MetronomePage() {
    const [bpm, setBpm] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beat, setBeat] = useState(0); // For visual animation

    // Audio Context
    const audioContextRef = useRef<AudioContext | null>(null);
    const nextNoteTimeRef = useRef(0);
    const timerIDRef = useRef<number | null>(null);
    const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
    const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)

    // Visual beat logic
    const visualQueueRef = useRef<number[]>([]);
    const animationFrameRef = useRef<number | null>(null);

    const playClick = (time: number) => {
        if (!audioContextRef.current) return;

        const osc = audioContextRef.current.createOscillator();
        const envelope = audioContextRef.current.createGain();

        osc.frequency.value = 800;
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        osc.connect(envelope);
        envelope.connect(audioContextRef.current.destination);

        osc.start(time);
        osc.stop(time + 0.05);

        // Queue visual update
        visualQueueRef.current.push(time);
    };

    const nextNote = useCallback(() => {
        const secondsPerBeat = 60.0 / bpm;
        nextNoteTimeRef.current += secondsPerBeat;
    }, [bpm]);

    const scheduler = useCallback(() => {
        if (!audioContextRef.current) return;

        while (nextNoteTimeRef.current < audioContextRef.current.currentTime + scheduleAheadTime) {
            playClick(nextNoteTimeRef.current);
            nextNote();
        }
        timerIDRef.current = window.setTimeout(scheduler, lookahead);
    }, [nextNote]);

    // Visual animation loop separated from audio timer
    const draw = useCallback(() => {
        if (!audioContextRef.current) return;
        const currentTime = audioContextRef.current.currentTime;

        while (visualQueueRef.current.length && visualQueueRef.current[0] < currentTime) {
            visualQueueRef.current.shift();
            setBeat(b => (b + 1) % 4); // Cycle 0-3 just for variety if needed, or just toggle
        }

        if (isPlaying) {
            animationFrameRef.current = requestAnimationFrame(draw);
        }
    }, [isPlaying]);

    const togglePlay = () => {
        if (isPlaying) {
            clearTimeout(timerIDRef.current!);
            cancelAnimationFrame(animationFrameRef.current!);
            setIsPlaying(false);
        } else {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }

            nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.1;
            setIsPlaying(true);
            scheduler();
            draw();
        }
    };

    useEffect(() => {
        return () => {
            if (timerIDRef.current) clearTimeout(timerIDRef.current);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, []);

    const changeBpm = (change: number) => {
        setBpm(prev => {
            const newValue = prev + change;
            return Math.min(Math.max(newValue, 30), 240);
        });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>メトロノーム</h1>

            <div className={styles.visualizer}>
                <div className={`${styles.dot} ${isPlaying && beat % 2 === 0 ? styles.active : ''}`}></div>
                <div className={`${styles.dot} ${isPlaying && beat % 2 !== 0 ? styles.active : ''}`}></div>
            </div>

            <div className={styles.bpmDisplay}>
                <span className={styles.bpmValue}>{bpm}</span>
                <span className={styles.bpmLabel}>BPM</span>
            </div>

            <div className={styles.controls}>
                <input
                    type="range"
                    min="30"
                    max="240"
                    value={bpm}
                    onChange={(e) => setBpm(Number(e.target.value))}
                    className={styles.slider}
                />

                <div className={styles.adjustBtns}>
                    <button onClick={() => changeBpm(-5)} className={styles.adjustBtn}>-5</button>
                    <button onClick={() => changeBpm(-1)} className={styles.adjustBtn}>-1</button>
                    <button onClick={() => changeBpm(1)} className={styles.adjustBtn}>+1</button>
                    <button onClick={() => changeBpm(5)} className={styles.adjustBtn}>+5</button>
                </div>
            </div>

            <button
                onClick={togglePlay}
                className={`${styles.playBtn} ${isPlaying ? styles.playing : ''}`}
            >
                {isPlaying ? 'STOP' : 'START'}
            </button>
        </div>
    );
}
