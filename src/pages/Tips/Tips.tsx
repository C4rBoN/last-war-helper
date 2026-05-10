import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../store/AppContext';
import styles from './Tips.module.css';

type Lang = 'fr' | 'en';

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.block}>
      <div className={styles.blockTitle}>{title}</div>
      {children}
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.tip}>
      <span className={styles.tipIcon}>💡</span>
      <span>{children}</span>
    </div>
  );
}

const RANK_COLOR: Record<string, string> = {
  R5: 'danger',
  R4: 'accent',
  R3: 'success',
  R2: 'info',
  R1: 'muted',
};

function RankBadge({ rank }: { rank: string }) {
  return (
    <span className={`${styles.rankBadge} ${styles[`rank_${RANK_COLOR[rank]}`]}`}>
      {rank}
    </span>
  );
}

// ─── Alliance data ─────────────────────────────────────────────────────────────

const BENEFITS: Record<Lang, string[]> = {
  fr: [
    'Interaction sociale entre les membres',
    'Effectuer des ralliements pour attaquer les ennemis et les zombies',
    'Se défendre mutuellement en envoyant des garnisons',
    'Recherche scientifique qui booste tous les membres de l\'alliance',
    'Recevoir et donner de l\'aide (hôpital, construction, recherche)',
    'Participer aux événements à venir',
  ],
  en: [
    'Social interaction between members',
    'Perform rallies to attack enemies and zombies',
    'Defend each other by sending garrisons',
    'Scientific research that boosts all alliance members',
    'Send and receive help (hospital, building, research)',
    'Participate in upcoming events',
  ],
};

const RANKS: Record<Lang, { rank: string; role: string; desc: string }[]> = {
  fr: [
    { rank: 'R5', role: 'Chef',              desc: 'Généralement fondateur. Autorité maximale sur l\'alliance.' },
    { rank: 'R4', role: 'Officier',          desc: '4 officiers spécialisés, chacun avec un rôle défini.' },
    { rank: 'R3', role: 'Membre clé',        desc: 'Membres expérimentés, piliers de l\'alliance.' },
    { rank: 'R2', role: 'Membre important',  desc: 'Membres actifs et fiables.' },
    { rank: 'R1', role: 'Nouveau membre',    desc: 'Membres récemment rejoints.' },
  ],
  en: [
    { rank: 'R5', role: 'Leader',           desc: 'Usually the founder. Maximum authority over the alliance.' },
    { rank: 'R4', role: 'Officer',          desc: '4 specialized officers, each with a defined role.' },
    { rank: 'R3', role: 'Key Member',       desc: 'Experienced members, pillars of the alliance.' },
    { rank: 'R2', role: 'Important Member', desc: 'Active and reliable members.' },
    { rank: 'R1', role: 'New Member',       desc: 'Recently joined members.' },
  ],
};

const OFFICERS: Record<Lang, { num: number; icon: string; name: string; desc: string }[]> = {
  fr: [
    {
      num: 1,
      icon: '⚔️',
      name: 'Seigneur de Guerre',
      desc: 'Responsable de la stratégie d\'attaque et de défense, et de l\'expansion du territoire. Prend la tête lors des guerres avec d\'autres alliances.',
    },
    {
      num: 2,
      icon: '📣',
      name: 'Recruteur',
      desc: 'Responsable de la recherche de nouveaux membres et des tâches quotidiennes concernant les membres.',
    },
    {
      num: 3,
      icon: '🎵',
      name: 'Muse',
      desc: 'Responsable du maintien du moral. Crée une bonne ambiance parmi les membres.',
    },
    {
      num: 4,
      icon: '📋',
      name: 'Majordome',
      desc: 'Responsable des tâches quotidiennes et planifie les événements de l\'alliance.',
    },
  ],
  en: [
    {
      num: 1,
      icon: '⚔️',
      name: 'Warlord',
      desc: 'Responsible for attack and defense strategy, and territory expansion. Leads during wars with other alliances.',
    },
    {
      num: 2,
      icon: '📣',
      name: 'Recruiter',
      desc: 'Responsible for finding new members and handling daily member-related tasks.',
    },
    {
      num: 3,
      icon: '🎵',
      name: 'Muse',
      desc: 'Responsible for maintaining morale. Creates a positive atmosphere among members.',
    },
    {
      num: 4,
      icon: '📋',
      name: 'Steward',
      desc: 'Responsible for daily member-related tasks and planning alliance events.',
    },
  ],
};

const HIERARCHY: Record<Lang, string[]> = {
  fr: [
    'Les autres R4 aident et soutiennent les 4 officiers dans leurs tâches',
    'Tous les R4 rendent compte au R5 en tant que chef de l\'alliance',
    'Seul le R5 peut promouvoir ou rétrograder un R4, et nommer un officier d\'alliance',
    'Tous les R4 et R5 peuvent promouvoir ou rétrograder les membres R1, R2 et R3',
  ],
  en: [
    'Other R4 members assist and support the 4 officers in their tasks',
    'All R4 members report to R5 as the alliance leader',
    'Only R5 can promote or demote an R4, and appoint an alliance officer',
    'All R4 and R5 can promote or demote R1, R2, and R3 members',
  ],
};

function AllianceContent({ lang }: { lang: Lang }) {
  return (
    <>
      <p className={styles.lead}>
        {lang === 'fr'
          ? 'Une alliance peut compter jusqu\'à 100 membres répartis sur 5 rangs. Rejoindre une alliance est indispensable pour progresser efficacement dans le jeu.'
          : 'An alliance can have up to 100 members across 5 ranks. Joining an alliance is essential for efficient progression in the game.'}
      </p>

      <Block title={lang === 'fr' ? 'Avantages' : 'Benefits'}>
        <ul className={styles.list}>
          {BENEFITS[lang].map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </Block>

      <Block title={lang === 'fr' ? 'Structure & Rangs' : 'Structure & Ranks'}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{lang === 'fr' ? 'Rang' : 'Rank'}</th>
                <th>{lang === 'fr' ? 'Rôle' : 'Role'}</th>
                <th>{lang === 'fr' ? 'Description' : 'Description'}</th>
              </tr>
            </thead>
            <tbody>
              {RANKS[lang].map(row => (
                <tr key={row.rank}>
                  <td><RankBadge rank={row.rank} /></td>
                  <td><strong>{row.role}</strong></td>
                  <td>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block title={lang === 'fr' ? 'Les 4 Officiers R4' : 'The 4 R4 Officers'}>
        <div className={styles.officerGrid}>
          {OFFICERS[lang].map(o => (
            <div key={o.num} className={styles.officerCard}>
              <div className={styles.officerHead}>
                <span className={styles.officerIcon}>{o.icon}</span>
                <div>
                  <div className={styles.officerNum}>
                    {lang === 'fr' ? `Officier ${o.num}` : `Officer ${o.num}`}
                  </div>
                  <div className={styles.officerName}>{o.name}</div>
                </div>
              </div>
              <p className={styles.officerDesc}>{o.desc}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title={lang === 'fr' ? 'Règles de hiérarchie' : 'Hierarchy Rules'}>
        <ul className={styles.list}>
          {HIERARCHY[lang].map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      </Block>

      <Tip>
        {lang === 'fr'
          ? 'Rejoins une alliance active dès que possible — l\'aide des membres réduit significativement les temps de construction et de recherche.'
          : 'Join an active alliance as soon as possible — member help significantly reduces building and research times.'}
      </Tip>
    </>
  );
}

// ─── Section registry ──────────────────────────────────────────────────────────

interface Section {
  id: string;
  icon: string;
  title: Record<Lang, string>;
  content: (lang: Lang) => React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: 'alliance',
    icon: '🤝',
    title: { fr: 'Alliance', en: 'Alliance' },
    content: (lang) => <AllianceContent lang={lang} />,
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export function Tips() {
  const { state } = useAppContext();
  const lang = state.language as Lang;
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    function handler(e: Event) {
      const id = (e as CustomEvent<string>).detail;
      setOpenId(id);
      setTimeout(() => {
        const el = sectionRefs.current[id];
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
    window.addEventListener('tips-open-section', handler);
    return () => window.removeEventListener('tips-open-section', handler);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{lang === 'fr' ? 'Astuces' : 'Tips & Guides'}</h1>
        <div className={styles.subtitle}>
          {lang === 'fr' ? 'Guides & conseils de jeu' : 'Game guides & tips'}
        </div>
      </div>

      {SECTIONS.map(section => {
        const isOpen = openId === section.id;
        return (
          <div
            key={section.id}
            id={`tips-${section.id}`}
            ref={el => { sectionRefs.current[section.id] = el; }}
            className={`${styles.section} ${isOpen ? styles.sectionOpen : ''}`}
          >
            <button
              className={styles.sectionHeader}
              onClick={() => setOpenId(isOpen ? null : section.id)}
            >
              <span className={styles.sectionIcon}>{section.icon}</span>
              <span className={styles.sectionTitle}>{section.title[lang]}</span>
              <span className={styles.sectionChevron}>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
              <div className={styles.sectionBody}>
                {section.content(lang)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
