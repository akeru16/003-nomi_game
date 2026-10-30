"use client";

import { useCallback, useSyncExternalStore } from 'react';

// Per-browser storage (no login required)
const FAVORITES_KEY = 'nomigame_favorites';
const VOTES_KEY = 'nomigame_votes';

export type Vote = 'like' | 'dislike';

function read<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

function write(key: string, value: unknown) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Storage may be unavailable (private mode etc.)
    }
}

const EMPTY: number[] = [];
const listeners = new Set<() => void>();
let favoritesCache: number[] | null = null;

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function getFavorites() {
    if (favoritesCache === null) {
        favoritesCache = read<number[]>(FAVORITES_KEY, []);
    }
    return favoritesCache;
}

export function useFavorites() {
    const favorites = useSyncExternalStore(subscribe, getFavorites, () => EMPTY);
    const loaded = useSyncExternalStore(subscribe, () => true, () => false);

    const toggleFavorite = useCallback((gameId: number) => {
        const prev = getFavorites();
        favoritesCache = prev.includes(gameId)
            ? prev.filter(id => id !== gameId)
            : [...prev, gameId];
        write(FAVORITES_KEY, favoritesCache);
        listeners.forEach(listener => listener());
    }, []);

    return { favorites, loaded, toggleFavorite };
}

export function getVote(gameId: number): Vote | null {
    return read<Record<string, Vote>>(VOTES_KEY, {})[gameId] ?? null;
}

export function saveVote(gameId: number, vote: Vote | null) {
    const votes = read<Record<string, Vote>>(VOTES_KEY, {});
    if (vote) {
        votes[gameId] = vote;
    } else {
        delete votes[gameId];
    }
    write(VOTES_KEY, votes);
}
