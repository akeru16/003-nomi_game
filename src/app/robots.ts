import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/favorites',
                '/search'
            ],
        },
        sitemap: 'https://nomi-game.work/sitemap.xml',
    }
}
