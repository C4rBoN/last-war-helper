import { useRef, useState } from 'react';
import { useAppContext, migrateState } from '../../store/AppContext';
import { useAuth } from '../../store/AuthContext';
import { LoginModal } from '../auth/LoginModal';
import { t } from '../../i18n';
import styles from './TopBar.module.css';
import { PlayerState } from '../../types/player.types';

export function TopBar() {
  const { state, dispatch, syncing } = useAppContext();
  const { user, signOut }            = useAuth();
  const lang     = state.language;
  const hqLevel  = state.profile.hqLevel;
  const importRef = useRef<HTMLInputElement>(null);
  const [showLogin, setShowLogin] = useState(false);

  function toggleLang() {
    dispatch({ type: 'SET_LANGUAGE', payload: lang === 'fr' ? 'en' : 'fr' });
  }

  function handleExport() {
    const data = JSON.stringify(state);
    const blob = new Blob([data], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `lastwar-helper-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const parsed = JSON.parse(text) as Partial<PlayerState>;
        dispatch({ type: 'LOAD_ALL', payload: migrateState(parsed) });
      } catch {
        alert(t(lang, 'topbar.import_error'));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  const userInitial = user?.email?.charAt(0).toUpperCase() ?? '?';

  return (
    <>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.logo}>⚔</span>
          <span className={styles.brandName}>Last War Helper</span>
        </div>

        <div className={styles.right}>
          {state.profile.setupComplete && (
            <div className={styles.hqBadge}>
              <span className={styles.hqLabel}>{t(lang, 'dashboard.hq')}</span>
              <span className={styles.hqLevel}>{hqLevel}</span>
            </div>
          )}

          {/* Export / Import */}
          <button className={styles.iconBtn} onClick={handleExport} title={t(lang, 'topbar.export')}>↓</button>
          <button className={styles.iconBtn} onClick={() => importRef.current?.click()} title={t(lang, 'topbar.import')}>↑</button>
          <input ref={importRef} type="file" accept=".json,application/json" style={{ display: 'none' }} onChange={handleImport} />

          {/* Auth */}
          {user ? (
            <div className={styles.userArea}>
              {syncing && <span className={styles.syncDot} title={lang === 'fr' ? 'Synchronisation…' : 'Syncing…'}>↻</span>}
              <div className={styles.avatar} title={user.email}>{userInitial}</div>
              <button className={styles.signOutBtn} onClick={signOut} title={lang === 'fr' ? 'Se déconnecter' : 'Sign out'}>
                {lang === 'fr' ? 'Déco.' : 'Out'}
              </button>
            </div>
          ) : (
            <button className={styles.syncBtn} onClick={() => setShowLogin(true)} title={lang === 'fr' ? 'Synchroniser mes données' : 'Sync my data'}>
              ☁ Sync
            </button>
          )}

          <button className={styles.langToggle} onClick={toggleLang} title="Change language">
            {lang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
          </button>
        </div>
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
