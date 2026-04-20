import { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import styles from './AppShell.module.css';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <TopBar />
      <BottomNav />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
