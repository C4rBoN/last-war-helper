import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { t } from '../../i18n';
import styles from './BottomNav.module.css';

const TABS = [
  { path: '/',          icon: '🏠', labelKey: 'nav.dashboard' },
  { path: '/heroes',    icon: '⚔',  labelKey: 'nav.heroes'    },
  { path: '/buildings', icon: '🏗',  labelKey: 'nav.buildings' },
  { path: '/research',  icon: '🔬',  labelKey: 'nav.research'  },
];

export function BottomNav() {
  const { state } = useAppContext();
  const lang = state.language;

  return (
    <nav className={styles.nav}>
      {TABS.map(tab => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === '/'}
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
        >
          <span className={styles.icon}>{tab.icon}</span>
          <span className={styles.label}>{t(lang, tab.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
