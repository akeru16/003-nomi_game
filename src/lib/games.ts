import { supabase } from './supabase';

// Game type for database
export interface Game {
    id: number;
    title: string;
    description: string;
    rules: string[];
    materials?: string[];
    likes: number;
    dislikes: number;
    views: number;
    weekly_likes: number;
    tags: string[];
    posted_by?: string;
    author_name?: string;
    created_at: string;
}

// Fetch all games with optional filtering and sorting
export async function getGames(options?: {
    tags?: string[];
    sortBy?: 'popular' | 'trending' | 'new';
    limit?: number;
}) {
    let query = supabase.from('games').select('*');

    // Filter by tags
    if (options?.tags && options.tags.length > 0) {
        query = query.overlaps('tags', options.tags);
    }

    // Sort
    switch (options?.sortBy) {
        case 'popular':
            query = query.order('likes', { ascending: false });
            break;
        case 'trending':
            query = query.order('weekly_likes', { ascending: false });
            break;
        case 'new':
        default:
            query = query.order('created_at', { ascending: false });
            break;
    }

    // Limit results
    if (options?.limit) {
        query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching games:', error);
        return [];
    }

    return data || [];
}

// Fetch a single game by ID
export async function getGameById(id: number) {
    const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching game:', error);
        return null;
    }

    // Fetch author name if posted_by exists
    if (data.posted_by) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', data.posted_by)
            .single();

        if (profile) {
            (data as Game).author_name = profile.name;
        }
    }

    return data;
}

// Update game views
export async function incrementViews(gameId: number) {
    const { error } = await supabase.rpc('increment_views', { game_id: gameId });

    if (error) {
        console.error('Error incrementing views:', error);
    }
}

// Apply a like/dislike change (previous vote is tracked per browser)
export async function applyVote(gameId: number, prev: 'like' | 'dislike' | null, next: 'like' | 'dislike' | null) {
    if (prev === next) return;

    const calls: string[] = [];
    if (prev) calls.push(prev === 'like' ? 'decrement_likes' : 'decrement_dislikes');
    if (next) calls.push(next === 'like' ? 'increment_likes' : 'increment_dislikes');

    for (const fn of calls) {
        const { error } = await supabase.rpc(fn, { game_id: gameId });
        if (error) throw error;
    }
}
