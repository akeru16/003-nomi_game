import styles from './Footer.module.css';

import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <Link href="/about">のみげーむについて</Link>
                <Link href="/terms">利用規約</Link>
                <Link href="/privacy">プライバシーポリシー</Link>
                <Link href="/contact">お問い合わせ</Link>
            </div>
            <p>&copy; {new Date().getFullYear()} のみげーむ. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
