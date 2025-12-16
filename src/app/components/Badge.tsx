import styles from './Badge.module.css';

interface BadgeProps {
    label: string;
    type?: 'primary' | 'secondary' | 'accent' | 'default';
    icon?: string;
}

const Badge = ({ label, type = 'default', icon }: BadgeProps) => {
    return (
        <span className={`${styles.badge} ${styles[type]}`}>
            {icon && <span className={styles.icon}>{icon}</span>}
            {label}
        </span>
    );
};

export default Badge;
