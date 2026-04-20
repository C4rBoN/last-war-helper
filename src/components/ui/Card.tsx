import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  highlight?: 'urgent' | 'accent' | 'success';
  onClick?: () => void;
}

export function Card({ children, className = '', highlight, onClick }: CardProps) {
  return (
    <div
      className={`${styles.card} ${highlight ? styles[highlight] : ''} ${onClick ? styles.clickable : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
