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

// ─── Crystal Factory data ──────────────────────────────────────────────────────

const SHOP_REWARDS: Record<Lang, { reward: string; note: string }[]> = {
  fr: [
    { reward: 'Briques d\'Or', note: '—' },
    { reward: 'Lingots d\'Argent', note: 'Utilisables uniquement dans Butin de Bullseye, Marché Scintillant et Chasseur de Primes (dès Saison 1)' },
    { reward: 'Diamants', note: '—' },
    { reward: 'Bon "Tout acheter" — Pass hebdomadaire', note: '—' },
    { reward: 'Bon de préparation complète au combat', note: '—' },
  ],
  en: [
    { reward: 'Gold Bricks', note: '—' },
    { reward: 'Silver Ingots', note: 'Usable only in Bullseye Bonanza, Glitter Market and Bounty Hunter (from Season 1)' },
    { reward: 'Diamonds', note: '—' },
    { reward: 'Weekly Pass "Buy All" voucher', note: '—' },
    { reward: 'Full Combat Prep voucher', note: '—' },
  ],
};

const CRYSTAL_TIPS: Record<Lang, string[]> = {
  fr: [
    'Récupère ton Minerai de Cristal chaque jour via les quêtes — aucune compétence de profession (comme « Encore », qui donne une chance de dupliquer certains gains de ressources) ne s\'applique dessus, donc autant ne pas prendre de retard.',
    'Compose ton équipe avec 5 héros de la même Faction pour gagner +30% de dégâts contre le Boss de Cristal.',
    'Les troupes envoyées au Boss de Cristal ne peuvent pas être rappelées — vérifie bien ta composition avant de valider l\'attaque, et le Boss n\'est pas défiable en Ralliement.',
    'Utilise tes 3 défis quotidiens contre le Boss avant la réinitialisation hebdomadaire pour maximiser les paliers de récompenses de progression.',
    'Garde tes Lingots d\'Argent si ton serveur n\'a pas encore atteint la Saison 1 — ils ne sont utilisables que dans Bullseye Bonanza, Marché Scintillant et Chasseur de Primes.',
    'La Boutique de Cristal se réapprovisionne le 1er de chaque mois avec des limites d\'échange réinitialisées — planifie tes échanges en conséquence.',
  ],
  en: [
    'Collect your Crystal Ore daily via quests — no profession skill (like "Encore", which gives a chance to duplicate certain resource gains) applies to it, so don\'t fall behind.',
    'Deploy 5 heroes from the same Faction to gain +30% Attack damage against the Crystal Boss.',
    'Troops sent to the Crystal Boss can\'t be recalled — double-check your squad before confirming the attack, and the Boss can\'t be challenged via Rally.',
    'Use your 3 daily Crystal Boss challenges before the weekly reset to maximize weekly progression reward tiers.',
    'Hold on to Silver Ingots if your server hasn\'t reached Season 1 yet — they\'re only usable in Bullseye Bonanza, Glitter Market and Bounty Hunter.',
    'The Crystal Shop restocks on the 1st of every month with exchange limits reset — plan your trades accordingly.',
  ],
};

function CrystalFactoryContent({ lang }: { lang: Lang }) {
  return (
    <>
      <p className={styles.lead}>
        {lang === 'fr'
          ? 'Bâtiment événementiel introduit avec l\'【Évènement de Cristal】 (durée limitée : 60 jours). Débloqué au niveau de base 20, il produit des Cristaux violets échangeables contre des récompenses et donne accès au Boss de Cristal.'
          : 'Event building introduced with the 【Crystal Event】 (limited-time: 60 days). Unlocked at base level 20, it produces purple Crystals exchangeable for rewards and gives access to the Crystal Boss.'}
      </p>

      <Block title={lang === 'fr' ? 'Déblocage' : 'Unlock'}>
        <ul className={styles.list}>
          <li>{lang === 'fr' ? 'Niveau de base 20 minimum' : 'Base level 20 minimum'}</li>
          <li>{lang === 'fr'
            ? 'Le serveur doit avoir atteint le jour 1 de la pré-saison de la Saison 1 (ou une étape ultérieure)'
            : 'Server must have reached day 1 of Season 1 pre-season (or a later stage)'}</li>
          <li>{lang === 'fr'
            ? 'Le Boss de Cristal, lui, n\'est disponible qu\'à partir du jour 1 de la Saison 1'
            : 'The Crystal Boss itself is only available from day 1 of Season 1 onward'}</li>
        </ul>
      </Block>

      <Block title={lang === 'fr' ? 'Production & amélioration' : 'Production & upgrading'}>
        <ul className={styles.list}>
          <li>{lang === 'fr'
            ? 'Produit en continu des Cristaux violets, récupérables depuis l\'usine ou directement sur la base'
            : 'Continuously produces purple Crystals, collectible from the factory UI or directly on the base'}</li>
          <li>{lang === 'fr'
            ? 'Amélioration = nouvelle ressource « Minerai de Cristal », obtenue via quêtes quotidiennes et coffres de progression'
            : 'Upgrading requires a new resource, "Crystal Ore", earned via daily quests and progress chests'}</li>
          <li>{lang === 'fr'
            ? 'Plus le niveau de l\'usine augmente, plus la capacité de production de Cristaux violets augmente'
            : 'The higher the factory level, the higher the purple Crystal production capacity'}</li>
        </ul>
      </Block>

      <Block title={lang === 'fr' ? 'Boutique de Cristal' : 'Crystal Shop'}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{lang === 'fr' ? 'Récompense' : 'Reward'}</th>
                <th>{lang === 'fr' ? 'Note' : 'Note'}</th>
              </tr>
            </thead>
            <tbody>
              {SHOP_REWARDS[lang].map((r, i) => (
                <tr key={i}>
                  <td><strong>{r.reward}</strong></td>
                  <td>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block title={lang === 'fr' ? 'Boss de Cristal' : 'Crystal Boss'}>
        <ul className={styles.list}>
          <li>{lang === 'fr' ? 'Apparaît sur la carte du monde du lundi au samedi' : 'Appears on the world map Monday through Saturday'}</li>
          <li>{lang === 'fr' ? 'Accessible depuis l\'Usine de Cristal (base niveau 20+)' : 'Accessible from the Crystal Factory (base level 20+)'}</li>
          <li>{lang === 'fr' ? 'Maximum 3 défis par jour, non défiable via Ralliement' : 'Maximum 3 challenges per day, not challengeable via Rally'}</li>
          <li>{lang === 'fr' ? 'Troupes envoyées non rappelables une fois le combat lancé' : 'Troops sent cannot be recalled once the attack is launched'}</li>
          <li>{lang === 'fr' ? '5 héros de la même Faction = +30% de dégâts d\'Attaque' : '5 heroes from the same Faction = +30% Attack damage'}</li>
          <li>{lang === 'fr'
            ? 'Récompenses de progression hebdomadaire selon le palier de dégâts atteint en un seul défi (reset chaque semaine)'
            : 'Weekly progression rewards based on the damage tier reached in a single challenge (resets weekly)'}</li>
          <li>{lang === 'fr'
            ? 'Récompenses de succès (nombre cumulé d\'attaques + seuil de dégâts) : coffres de fragments, pierres d\'amélioration, ressources SR'
            : 'Achievement rewards (cumulative attack count + damage threshold): fragment chests, upgrade stones, SR resource chests'}</li>
        </ul>
      </Block>

      {CRYSTAL_TIPS[lang].map((tip, i) => <Tip key={i}>{tip}</Tip>)}
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
  {
    id: 'crystal_factory',
    icon: '🏭',
    title: { fr: 'Usine de Cristal', en: 'Crystal Factory' },
    content: (lang) => <CrystalFactoryContent lang={lang} />,
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
