import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "お気に入り - のみげーむ",
    robots: {
        index: false,
        follow: false,
    },
};

export default function FavoritesLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return children;
}
