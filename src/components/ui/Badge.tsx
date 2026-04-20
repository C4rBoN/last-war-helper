import styles from './Badge.module.css';

interface BadgeProps {
  variant: 'tier-s' | 'tier-a' | 'tier-b' | 'rarity-ur' | 'rarity-ssr' | 'rarity-sr'
         | 'type-tank' | 'type-missile' | 'type-aircraft'
         | 'urgent' | 'recommended' | 'optional'
         | 'hero' | 'building' | 'research';
  label: string;
  small?: boolean;
}

export function Badge({ variant, label, small }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${small ? styles.small : ''}`}>
      {label}
    </span>
  );
}
