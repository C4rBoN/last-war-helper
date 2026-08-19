import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { t } from '../../i18n';
import styles from './BottomNav.module.css';

const TABS = [
  { path: '/',          icon: '🏠', labelKey: 'nav.dashboard' },
  { path: '/season6',   icon: '🌿',  labelKey: 'nav.season6'   },
  { path: '/heroes',    icon: '⚔',  labelKey: 'nav.heroes'    },
  { path: '/buildings', icon: '🏗',  labelKey: 'nav.buildings' },
  { path: '/research',  icon: '🔬',  labelKey: 'nav.research'  },
  { path: '/tips',      icon: '💡',  labelKey: 'nav.tips'      },
];

const S6_SECTIONS = [
  { id: 'overview',     icon: '🌿', fr: 'Vue d\'ensemble',        en: 'Overview'             },
  { id: 'strategy',     icon: '🧠', fr: 'Stratégies',             en: 'Strategy'             },
  { id: 'preseason',    icon: '🗓', fr: 'Pré-saison',             en: 'Pre-Season'           },
  { id: 'factions',     icon: '⚔️', fr: 'Factions',               en: 'Factions'             },
  { id: 'cities',       icon: '💥', fr: 'Villes & Territoire',     en: 'Cities & Territory'   },
  { id: 'altars',       icon: '🏛️', fr: 'Les Autels',             en: 'Altars'               },
  { id: 'pacts',        icon: '🤝', fr: 'Pactes d\'Alliance',      en: 'Alliance Pacts'       },
  { id: 'faction_tech', icon: '🔬', fr: 'Techno. de Faction',      en: 'Faction Technology'   },
  { id: 'resources',    icon: '💎', fr: 'Ressources',              en: 'Resources'            },
  { id: 'buildings',    icon: '🏗', fr: 'Bâtiments',              en: 'Buildings'            },
  { id: 'professions',  icon: '🎓', fr: 'Professions',            en: 'Professions'          },
  { id: 'fishing',      icon: '🎣', fr: 'Pêche',                  en: 'Fishing'              },
  { id: 'merit',        icon: '🎖️', fr: 'Mérite de Guerre',        en: 'War Merit'            },
  { id: 'ruins',        icon: '🏚', fr: 'Sous les Ruines',         en: 'Beneath the Ruins'    },
  { id: 'heroes',       icon: '🦸', fr: 'Héros',                  en: 'Heroes'               },
  { id: 'expedition',   icon: '🌍', fr: 'Expédition Mondiale',     en: 'Global Expedition'    },
  { id: 'calendar',     icon: '📅', fr: 'Calendrier S6',           en: 'Full Calendar'        },
];

const TIPS_SECTIONS = [
  { id: 'alliance',        icon: '🤝', fr: 'Alliance',         en: 'Alliance'      },
  { id: 'crystal_factory', icon: '🏭', fr: 'Usine de Cristal', en: 'Crystal Factory' },
  { id: 'boss_wanted',     icon: '🎯', fr: 'Boss Recherché',   en: 'Wanted Boss'   },
];

export function BottomNav() {
  const { state } = useAppContext();
  const lang = state.language as 'fr' | 'en';
  const navigate = useNavigate();
  const [s6Open, setS6Open] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);

  function goToSection(id: string) {
    setS6Open(false);
    navigate('/season6');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('s6-open-section', { detail: id }));
    }, 50);
  }

  function goToTipsSection(id: string) {
    setTipsOpen(false);
    navigate('/tips');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('tips-open-section', { detail: id }));
    }, 50);
  }

  return (
    <nav className={styles.nav}>
      {TABS.map(tab => {
        if (tab.path === '/season6') {
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
        }

        if (tab.path === '/tips') {
          return (
            <div
              key={tab.path}
              className={styles.s6Wrapper}
              onMouseEnter={() => setTipsOpen(true)}
              onMouseLeave={() => setTipsOpen(false)}
            >
              {tipsOpen && (
                <div className={styles.submenu}>
                  {TIPS_SECTIONS.map(s => (
                    <button
                      key={s.id}
                      className={styles.submenuItem}
                      onClick={() => goToTipsSection(s.id)}
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
        }

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
      })}
    </nav>
  );
}
