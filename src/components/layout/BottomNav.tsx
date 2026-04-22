import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { t } from '../../i18n';
import styles from './BottomNav.module.css';

const TABS = [
  { path: '/',          icon: '🏠', labelKey: 'nav.dashboard' },
  { path: '/heroes',    icon: '⚔',  labelKey: 'nav.heroes'    },
  { path: '/buildings', icon: '🏗',  labelKey: 'nav.buildings' },
  { path: '/research',  icon: '🔬',  labelKey: 'nav.research'  },
  { path: '/season6',   icon: '🌿',  labelKey: 'nav.season6'   },
];

const S6_SECTIONS = [
  { id: 'overview',   icon: '🌿', fr: 'Vue d\'ensemble',  en: 'Overview'        },
  { id: 'preseason',  icon: '🗓', fr: 'Pré-saison',       en: 'Pre-Season'      },
  { id: 'factions',   icon: '⚔️', fr: 'Factions',         en: 'Factions'        },
  { id: 'resources',  icon: '💎', fr: 'Ressources',       en: 'Resources'       },
  { id: 'buildings',  icon: '🏗', fr: 'Bâtiments',        en: 'Buildings'       },
  { id: 'professions',icon: '🎓', fr: 'Professions',      en: 'Professions'     },
  { id: 'fishing',    icon: '🎣', fr: 'Pêche',            en: 'Fishing'         },
  { id: 'ruins',      icon: '🏚', fr: 'Sous les Ruines',   en: 'Beneath the Ruins'},
  { id: 'heroes',     icon: '🦸', fr: 'Héros',            en: 'Heroes'          },
  { id: 'week1',      icon: '📅', fr: 'Semaine 1',        en: 'Week 1'          },
  { id: 'strategy',   icon: '🧠', fr: 'Stratégies',       en: 'Strategy'        },
];

export function BottomNav() {
  const { state } = useAppContext();
  const lang = state.language as 'fr' | 'en';
  const navigate = useNavigate();
  const [s6Open, setS6Open] = useState(false);

  function goToSection(id: string) {
    setS6Open(false);
    navigate('/season6');
    // Let the page mount then dispatch the section event
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('s6-open-section', { detail: id }));
    }, 50);
  }

  return (
    <nav className={styles.nav}>
      {TABS.map(tab => {
        if (tab.path !== '/season6') {
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === '/'}
              className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.icon}>{tab.icon}</span>
              <span className={styles.label}>{t(lang, tab.labelKey)}</span>
            </NavLink>
          );
        }

        return (
          <div
            key={tab.path}
            className={styles.s6Wrapper}
            onMouseEnter={() => setS6Open(true)}
            onMouseLeave={() => setS6Open(false)}
          >
            {s6Open && (
              <div className={styles.submenu}>
                {S6_SECTIONS.map(s => (
                  <button
                    key={s.id}
                    className={styles.submenuItem}
                    onClick={() => goToSection(s.id)}
                  >
                    <span className={styles.submenuIcon}>{s.icon}</span>
                    <span className={styles.submenuLabel}>{lang === 'fr' ? s.fr : s.en}</span>
                  </button>
                ))}
              </div>
            )}
            <NavLink
              to={tab.path}
              className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.icon}>{tab.icon}</span>
              <span className={styles.label}>{t(lang, tab.labelKey)}</span>
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
}
