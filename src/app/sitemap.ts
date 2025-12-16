import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nomi-game.vercel.app'

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

    // Game pages (動的に生成 - 今は静的に11ゲーム分)
    const gameIds = Array.from({ length: 11 }, (_, i) => i + 1)
    const games = gameIds.map((id) => ({
        url: `${baseUrl}/games/${id}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...routes, ...tools, ...games]
}
