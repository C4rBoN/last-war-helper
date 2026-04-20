import { useRef } from 'react';
import { useAppContext } from '../../store/AppContext';
import { t } from '../../i18n';
import styles from './TopBar.module.css';

const STORAGE_KEY = 'lastwar_helper_v1';

export function TopBar() {
  const { state, dispatch } = useAppContext();
  const lang = state.language;
  const hqLevel = state.profile.hqLevel;
  const importRef = useRef<HTMLInputElement>(null);

  function toggleLang() {
    dispatch({ type: 'SET_LANGUAGE', payload: lang === 'fr' ? 'en' : 'fr' });
  }

  function handleExport() {
    const data = localStorage.getItem(STORAGE_KEY) ?? JSON.stringify(state);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
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
        JSON.parse(text); // validation basique
        localStorage.setItem(STORAGE_KEY, text);
        window.location.reload();
      } catch {
        alert(t(lang, 'topbar.import_error'));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
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
        <button className={styles.iconBtn} onClick={handleExport} title={t(lang, 'topbar.export')}>
          ↓
        </button>
        <button className={styles.iconBtn} onClick={() => importRef.current?.click()} title={t(lang, 'topbar.import')}>
          ↑
        </button>
        <input
          ref={importRef}
          type="file"
          accept=".json,application/json"
          style={{ display: 'none' }}
          onChange={handleImport}
        />

        <button className={styles.langToggle} onClick={toggleLang} title="Change language">
          {lang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
        </button>
      </div>
    </header>
  );
}
