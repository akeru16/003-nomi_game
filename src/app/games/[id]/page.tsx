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
        jsonLd.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: game.likes > 0 ? '5' : '1',
            ratingCount: totalRatings.toString()
        };
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
