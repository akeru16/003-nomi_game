import { MetadataRoute } from 'next'
import { getGamesServer } from '../lib/games-server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://nomi-game.work'

    // Static pages
    const routes = ['', '/login', '/register', '/post', '/random', '/profile'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Tool pages
    const tools = ['/tools/dice', '/tools/cards', '/tools/kings'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // Game pages (Dynamic)
    // Fetch all games (limit 1000 for safety, though sitemaps can handle more)
    const allGames = await getGamesServer({ limit: 1000 })
    const games = allGames.map((game) => ({
        url: `${baseUrl}/games/${game.id}`,
        lastModified: new Date(game.created_at).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...routes, ...tools, ...games]
}
