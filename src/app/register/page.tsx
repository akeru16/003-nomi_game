import { permanentRedirect } from 'next/navigation';

export const runtime = 'edge';

// Login/posting was removed; keep old URLs working
export default function Page() {
    permanentRedirect('/');
}
