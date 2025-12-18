import { createServerClient } from './supabase-server';
import { Game } from './games';

// Fetch all games with optional filtering and sorting (Server-side)
export async function getGamesServer(options?: {
    tags?: string[];
    sortBy?: 'popular' | 'trending' | 'new';
    limit?: number;
}) {
    const supabase = createServerClient();
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
        console.error('Error fetching games server-side:', error);
        return [];
    }

    return data || [];
}

// Fetch a single game by ID (Server-side)
export async function getGameByIdServer(id: number) {
    const supabase = createServerClient();
    const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching game server-side:', error);
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

    return data as Game;
}
