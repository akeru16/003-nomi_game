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

// Create a new game
export async function createGame(game: {
    title: string;
    description: string;
    rules: string[];
    materials?: string[];
    tags: string[];
    userId: string;
    userName: string;
}) {
    const { data, error } = await supabase
        .from('games')
        .insert({
            title: game.title,
            description: game.description,
            rules: game.rules,
            materials: game.materials || [],
            tags: game.tags,
            posted_by: game.userId,
            likes: 0,
            dislikes: 0,
            views: 0,
            weekly_likes: 0
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating game:', error);
        throw error;
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

// Get user's action for a game (like/dislike)
export async function getUserAction(userId: string, gameId: number) {
    const { data } = await supabase
        .from('user_actions')
        .select('action')
        .eq('user_id', userId)
        .eq('game_id', gameId)
        .single();

    return data?.action || null;
}

// Set user action (like/dislike)
export async function setUserAction(userId: string, gameId: number, action: 'like' | 'dislike') {
    // Get current action
    const currentAction = await getUserAction(userId, gameId);

    if (currentAction === action) {
        // Remove action if clicking same button
        await supabase
            .from('user_actions')
            .delete()
            .eq('user_id', userId)
            .eq('game_id', gameId);

        // Decrement count
        if (action === 'like') {
            await supabase.rpc('decrement_likes', { game_id: gameId });
        } else {
            await supabase.rpc('decrement_dislikes', { game_id: gameId });
        }

        return null;
    } else {
        // Check like limit if adding a new like
        if (action === 'like') {
            const likeCount = await getUserLikeCount(userId);
            if (likeCount >= 100) {
                throw new Error('LIKE_LIMIT_REACHED');
            }
        }

        // Upsert action
        await supabase
            .from('user_actions')
            .upsert({ user_id: userId, game_id: gameId, action });

        // Update counts
        if (currentAction) {
            // Switching from like to dislike or vice versa
            if (currentAction === 'like') {
                await supabase.rpc('decrement_likes', { game_id: gameId });
                await supabase.rpc('increment_dislikes', { game_id: gameId });
            } else {
                await supabase.rpc('decrement_dislikes', { game_id: gameId });
                await supabase.rpc('increment_likes', { game_id: gameId });
            }
        } else {
            // New action
            if (action === 'like') {
                await supabase.rpc('increment_likes', { game_id: gameId });
            } else {
                await supabase.rpc('increment_dislikes', { game_id: gameId });
            }
        }

        return action;
    }
}

// Get total number of likes by a user
export async function getUserLikeCount(userId: string): Promise<number> {
    const { count, error } = await supabase
        .from('user_actions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('action', 'like');

    if (error) {
        console.error('Error counting user likes:', error);
        return 0;
    }

    return count || 0;
}

// Get total number of games posted by a user
export async function getUserGameCount(userId: string): Promise<number> {
    const { count, error } = await supabase
        .from('games')
        .select('*', { count: 'exact', head: true })
        .eq('posted_by', userId);

    if (error) {
        console.error('Error counting user games:', error);
        return 0;
    }

    return count || 0;
}
