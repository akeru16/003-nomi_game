"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// Define User Type
export interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    favorites: string[]; // Array of game IDs
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, name: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUsername: (newName: string) => Promise<void>;
    addFavorite: (gameId: string) => Promise<void>;
    removeFavorite: (gameId: string) => Promise<void>;
    isFavorite: (gameId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<string[]>([]);

    // Initialize session and load user data
    useEffect(() => {
        checkUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                loadUserProfile(session.user.id);
            } else {
                setUser(null);
                setFavorites([]);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkUser = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                await loadUserProfile(session.user.id);
            }
        } catch (error) {
            console.error('Error checking user:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadUserProfile = async (userId: string) => {
        try {
            // Get profile
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (profile) {
                const { data: { user: authUser } } = await supabase.auth.getUser();
                setUser({
                    id: profile.id,
                    name: profile.name,
                    email: authUser?.email || ''
                });

                // Load favorites
                const { data: favs } = await supabase
                    .from('favorites')
                    .select('game_id')
                    .eq('user_id', userId);

                if (favs) {
                    setFavorites(favs.map(f => f.game_id.toString()));
                }
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    };

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        if (data.user) {
            await loadUserProfile(data.user.id);
        }
    };

    const register = async (email: string, name: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            }
        });

        if (error) throw error;

        // Profile is created automatically via trigger
        if (data.user) {
            await loadUserProfile(data.user.id);
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setFavorites([]);
    };

    const addFavorite = async (gameId: string) => {
        if (!user) return;

        try {
            await supabase
                .from('favorites')
                .insert({ user_id: user.id, game_id: parseInt(gameId) });

            setFavorites(prev => [...prev, gameId]);
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };

    const removeFavorite = async (gameId: string) => {
        if (!user) return;

        try {
            await supabase
                .from('favorites')
                .delete()
                .eq('user_id', user.id)
                .eq('game_id', parseInt(gameId));

            setFavorites(prev => prev.filter(id => id !== gameId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    const updateUsername = async (newName: string) => {
        if (!user) return;

        try {
            await supabase
                .from('profiles')
                .update({ name: newName })
                .eq('id', user.id);

            setUser(prev => prev ? { ...prev, name: newName } : null);
        } catch (error) {
            console.error('Error updating username:', error);
            throw error;
        }
    };

    const isFavorite = (gameId: string): boolean => {
        return favorites.includes(gameId);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            favorites,
            login,
            register,
            logout,
            updateUsername,
            addFavorite,
            removeFavorite,
            isFavorite
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
