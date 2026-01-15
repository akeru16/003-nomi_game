import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGameByIdServer } from '@/lib/games-server';
import GameDetailClient from './GameDetailClient';

export const runtime = 'edge';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const game = await getGameByIdServer(parseInt(id));

    if (!game) {
        return {
            title: 'ゲームが見つかりません',
        };
    }

    return {
        title: `${game.title} - のみげーむ`,
        description: game.description.substring(0, 160) + '...', // Truncate description
        openGraph: {
            title: `${game.title} - のみげーむ`,
            description: game.description,
            type: 'article',
            url: `https://nomi-game.work/games/${game.id}`,
        },
    };
}

export default async function GameDetailPage({ params }: PageProps) {
    const { id } = await params;
    const game = await getGameByIdServer(parseInt(id));

    if (!game) {
        notFound();
    }

    const totalRatings = game.likes + game.dislikes;

    // JSON-LD for SoftwareApplication / Game
    const jsonLd: any = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: game.title,
        applicationCategory: 'GameApplication',
        operatingSystem: 'Any',
        description: game.description,
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'JPY'
        },
        author: {
            '@type': 'Person',
            name: game.author_name || 'Unknown'
        }
    };

    if (totalRatings > 0) {
        // Calculate score from 1.0 to 5.0 based on like ratio
        // 100% likes = 5.0, 0% likes = 1.0
        const score = 1 + (4 * (game.likes / totalRatings));

        // Only show rating if it's 3.0+ OR if it has 100+ views (popular games show rating regardless)
        if (score >= 3.0 || game.views >= 100) {
            jsonLd.aggregateRating = {
                '@type': 'AggregateRating',
                ratingValue: score.toFixed(1),
                ratingCount: totalRatings.toString()
            };
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <GameDetailClient game={game} />
        </>
    );
}
