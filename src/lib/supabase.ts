import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export type Profile = {
    id: string
    name: string
    created_at: string
}

export type Game = {
    id: number
    title: string
    description: string
    rules: string[]
    materials?: string[]
    likes: number
    dislikes: number
    views: number
    weekly_likes: number
    tags: string[]
    posted_by?: string
    created_at: string
}

export type Favorite = {
    id: number
    user_id: string
    game_id: number
    created_at: string
}

export type UserAction = {
    id: number
    user_id: string
    game_id: number
    action: 'like' | 'dislike'
    created_at: string
}
