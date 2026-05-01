import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../store/AppContext';
import styles from './Season6.module.css';

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <button className={styles.lightboxClose} onClick={onClose} aria-label="Fermer">✕</button>
      <img
        src={src}
        alt={alt}
        className={styles.lightboxImg}
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}

type Lang = 'fr' | 'en';

const BASE = '/season6';
const WIKI = 'https://wiki.lastwar.com/wiki';

interface Section {
  id: string;
  icon: string;
  title: Record<Lang, string>;
  content: (lang: Lang) => React.ReactNode;
}

function Tag({ color, children }: { color: 'danger' | 'accent' | 'success' | 'info' | 'muted'; children: React.ReactNode }) {
  return <span className={`${styles.tag} ${styles[`tag_${color}`]}`}>{children}</span>;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={styles.infoValue}>{value}</span>
    </div>
  );
}

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

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.warn}>
      <span className={styles.tipIcon}>⚠️</span>
      <span>{children}</span>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Img({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <figure className={styles.figure}>
        <button className={styles.imgLink} onClick={() => setOpen(true)} aria-label={`Agrandir : ${alt}`}>
          <img src={src} alt={alt} className={styles.img} loading="lazy" />
        </button>
        {caption && <figcaption className={styles.figcaption}>{caption}</figcaption>}
      </figure>
      {open && <Lightbox src={src} alt={alt} onClose={close} />}
    </>
  );
}

function ImgRow({ images }: { images: { src: string; alt: string; caption?: string }[] }) {
  return (
    <div className={styles.imgRow}>
      {images.map((img, i) => <Img key={i} {...img} />)}
    </div>
  );
}

const SECTIONS: Section[] = [
  {
    id: 'overview',
    icon: '🌿',
    title: { fr: 'Vue d\'ensemble', en: 'Overview' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Img
          src={`${BASE}/2026-03/season-6-main-banner.png`}
          alt="Saison 6 Lost Rainforest banner"
        />
        <p className={styles.lead}>La Saison 6 se déroule dans la <strong>Forêt Tropicale Ombragée</strong> (Shadow Rainforest). L'objectif n'est plus d'avancer ensemble, mais de s'<strong>opposer en 4v4</strong>, d'occuper le territoire adverse et de <strong>détruire les villes ennemies</strong> pour gagner des Points d'Influence.</p>
        <Block title="Calendrier">
          <InfoRow label="Pré-saison" value="2 semaines" />
          <InfoRow label="Saison principale" value="8 semaines" />
          <InfoRow label="Durée totale" value="49 jours" />
          <InfoRow label="Taille de la carte" value="≈ 9× Saison 0 (équivalent S5)" />
          <InfoRow label="Zones de guerre" value="8 (4 par faction)" />
          <Img
            src={`${BASE}/2026-04/S6-schedule-1024x796.jpg`}
            alt="Calendrier officiel Saison 6"
            caption="Calendrier officiel de la Saison 6"
          />
        </Block>
        <Block title="Carte officielle">
          <Img
            src={`${WIKI}/1776414097663-lzho484uyv.jpg`}
            alt="Carte du monde Saison 6 — Forêt Tropicale Ombragée"
            caption="Vue d'ensemble de la carte — Shadow Rainforest"
          />
        </Block>
        <Block title="Les 3 clans">
          <div className={styles.factionGrid}>
            <div className={styles.factionCard}>
              <Img src={`${BASE}/2026-03/image-49.png`} alt="Sanctuaire Deepwood" />
              <div className={styles.factionName}>🦌 Clan Deepwood</div>
              <div className={styles.factionDesc}>Jouable — en conflit permanent. «&nbsp;Les forts sont les protecteurs&nbsp;». Totem : Cerf.</div>
            </div>
            <div className={styles.factionCard}>
              <Img src={`${BASE}/2026-03/image-52.png`} alt="Sanctuaire Wetland" />
              <div className={styles.factionName}>🐊 Clan Wetland</div>
              <div className={styles.factionDesc}>Jouable — en conflit permanent. «&nbsp;La survie est la vérité&nbsp;». Totem : Crocodile.</div>
            </div>
            <div className={styles.factionCard}>
              <div className={styles.factionName}>🌊 Clan du Grand Fleuve</div>
              <div className={styles.factionDesc}>Neutre — Région Centrale non jouable. Abrite les Autels et le Temple Ancestral, accessibles aux deux factions.</div>
            </div>
          </div>
        </Block>
      </>
    ) : (
      <>
        <Img
          src={`${BASE}/2026-03/season-6-main-banner.png`}
          alt="Season 6 Lost Rainforest banner"
        />
        <p className={styles.lead}>Season 6 takes place in the <strong>Shadow Rainforest</strong>. The goal is no longer to advance together, but to <strong>oppose each other 4v4</strong>, occupy enemy territory, and <strong>destroy enemy cities</strong> to earn Influence Points.</p>
        <Block title="Timeline">
          <InfoRow label="Pre-Season" value="2 weeks" />
          <InfoRow label="Main Season" value="8 weeks" />
          <InfoRow label="Total duration" value="49 days" />
          <InfoRow label="Map size" value="≈ 9× Season 0 (same as S5)" />
          <InfoRow label="Warzones" value="8 (4 per faction)" />
          <Img
            src={`${BASE}/2026-04/S6-schedule-1024x796.jpg`}
            alt="Official Season 6 calendar"
            caption="Official Season 6 calendar"
          />
        </Block>
        <Block title="Official map">
          <Img
            src={`${WIKI}/1776414097663-lzho484uyv.jpg`}
            alt="Season 6 world map — Shadow Rainforest"
            caption="Season 6 map overview — Shadow Rainforest"
          />
        </Block>
        <Block title="The 3 clans">
          <div className={styles.factionGrid}>
            <div className={styles.factionCard}>
              <Img src={`${BASE}/2026-03/image-49.png`} alt="Deepwood Sanctuary" />
              <div className={styles.factionName}>🦌 Deepwood Clan</div>
              <div className={styles.factionDesc}>Playable — permanent conflict. "Strong are protectors". Totem: Stag.</div>
            </div>
            <div className={styles.factionCard}>
              <Img src={`${BASE}/2026-03/image-52.png`} alt="Wetland Sanctuary" />
              <div className={styles.factionName}>🐊 Wetland Clan</div>
              <div className={styles.factionDesc}>Playable — permanent conflict. "Survival is truth". Totem: Crocodile.</div>
            </div>
            <div className={styles.factionCard}>
              <div className={styles.factionName}>🌊 Great River Clan</div>
              <div className={styles.factionDesc}>Neutral — non-playable Central Region. Home to Altars and the Ancestral Temple, accessible to both factions.</div>
            </div>
          </div>
        </Block>
      </>
    ),
  },

  {
    id: 'preseason',
    icon: '🗓',
    title: { fr: 'Pré-saison', en: 'Pre-Season' },
    content: (lang) => lang === 'fr' ? (
      <>
        <p className={styles.lead}>2 semaines avant la saison. Semaine 1 : mécaniques de base. Semaine 2 : Capitol Conquest.</p>
        <ImgRow images={[
          { src: `${BASE}/2026-03/image-22.png`, alt: 'Menu pré-saison S6 semaine 1', caption: 'Menu pré-saison — Semaine 1' },
          { src: `${BASE}/2026-03/image-97.png`, alt: 'Menu pré-saison S6 semaine 2', caption: 'Menu pré-saison — Semaine 2' },
        ]} />
        <Block title="Aperçu saisonnier — Objectifs quotidiens (7 jours)">
          <Img src={`${BASE}/2026-03/image-36.png`} alt="Jour 1 Anciens Clans" caption="Aperçu Jour 1 — Anciens Clans" />
          <Table
            headers={['Jour', 'Thème', 'Objectif de zone de guerre']}
            rows={[
              ['J1', 'Anciens Clans', 'Tuer 1 000 zombies'],
              ['J2', 'Mérites de Guerre & Pactes d\'Alliance', '500 améliorations de bâtiments'],
              ['J3', 'Ruines Rainforest', '500 tâches Radar'],
              ['J4', 'Power Breakthrough', '10 000 recrutements de héros'],
              ['J5', 'Faction Clash', 'Entraîner 50 000 unités'],
              ['J6–7', 'Autel & Lancement', 'Connexion'],
            ]}
          />
        </Block>
        <Block title="Sélection de faction (3 jours)">
          <ImgRow images={[
            { src: `${BASE}/2026-03/image-56.png`, alt: 'Interface sélection de faction', caption: 'Interface de sélection' },
            { src: `${BASE}/2026-03/image-57.png`, alt: 'Faction Awards', caption: 'Faction Awards' },
          ]} />
          <ul className={styles.list}>
            <li>8 zones de guerre divisées en 2 groupes — le plus fort devient <strong>Meneur de faction</strong></li>
            <li>Le leader choisit une configuration dans l'interface d'événement</li>
            <li>Changement de configuration possible avec un délai de 12h</li>
            <li>Attribution aléatoire si aucune configuration sélectionnée</li>
            <li>Les zones de guerre sont ensuite téléportées sur des zones dédiées à leur faction</li>
          </ul>
        </Block>
        <Block title="Semaine 2 — Capitol Conquest (pré-saison)">
          <ImgRow images={[
            { src: `${BASE}/2026-03/image-99.png`, alt: 'Semaine 2 pré-saison', caption: 'Aperçu Semaine 2' },
            { src: `${BASE}/2026-03/image-101.png`, alt: 'Règles Capitol Conquest', caption: 'Règles Capitol Conquest' },
          ]} />
          <ul className={styles.list}>
            <li><Tag color="accent">Règle spéciale pré-saison</Tag> Les alliances peuvent attaquer le Capitol sans territoire adjacent</li>
            <li>Durée de la bataille : jusqu'à 4 heures</li>
            <li>Vainqueur : alliance avec la plus haute progression de capture (ou 100%)</li>
            <li>Le leader d'alliance devient Président et peut distribuer des récompenses</li>
          </ul>
          <Tip>Le Terrain Contaminé (adjacent au Capitol) permet d'accumuler des Points d'Honneur via des éliminations/morts dans la boue.</Tip>
        </Block>
        <Block title="Préparation recommandée avant la saison">
          <ul className={styles.list}>
            <li>Maxer les techs d'alliance : <strong>Veteran Craftsman</strong> (réduit coûts bâtiments saisonniers) + <strong>Quick Construction</strong></li>
            <li>Stocker de l'endurance pour les zombies du monde</li>
            <li>Garder les Hero Return Tickets de S5 pour les ouvrir au lancement de S6</li>
            <li>Collecter des fragments violets pour monter Braz à 5⭐ (futur héros UR)</li>
            <li>Maxer les compétences Ingénieur avant le début : vitesse construction aux niveaux 10, 15, 30, 35, 95</li>
            <li>Réserver 1 point de compétence pour le jour 15 : <strong>Relic Expert</strong></li>
          </ul>
        </Block>
      </>
    ) : (
      <>
        <p className={styles.lead}>2 weeks before the season. Week 1: core mechanics. Week 2: Capitol Conquest.</p>
        <ImgRow images={[
          { src: `${BASE}/2026-03/image-22.png`, alt: 'S6 pre-season week 1 menu', caption: 'Pre-season menu — Week 1' },
          { src: `${BASE}/2026-03/image-97.png`, alt: 'S6 pre-season week 2 menu', caption: 'Pre-season menu — Week 2' },
        ]} />
        <Block title="Season Preview — Daily Goals (7 days)">
          <Img src={`${BASE}/2026-03/image-36.png`} alt="Day 1 Ancient Clans" caption="Day 1 Preview — Ancient Clans" />
          <Table
            headers={['Day', 'Theme', 'Warzone goal']}
            rows={[
              ['D1', 'Ancient Clans', 'Kill 1,000 zombies'],
              ['D2', 'War Merits & Alliance Pacts', '500 building upgrades'],
              ['D3', 'Rainforest Ruins', '500 Radar tasks'],
              ['D4', 'Power Breakthrough', '10,000 hero recruitments'],
              ['D5', 'Faction Clash', 'Train 50,000 units'],
              ['D6–7', 'Altar & Launch', 'Login goals'],
            ]}
          />
        </Block>
        <Block title="Faction Selection (3 days)">
          <ImgRow images={[
            { src: `${BASE}/2026-03/image-56.png`, alt: 'Faction selection interface', caption: 'Selection interface' },
            { src: `${BASE}/2026-03/image-57.png`, alt: 'Faction Awards', caption: 'Faction Awards' },
          ]} />
          <ul className={styles.list}>
            <li>8 warzones split into 2 groups — strongest becomes <strong>Faction Leader</strong></li>
            <li>Leader selects a pattern in the event interface</li>
            <li>Pattern can be changed with a 12-hour cooldown</li>
            <li>Random assignment if no pattern selected</li>
            <li>Warzones are then teleported to faction-dedicated zones</li>
          </ul>
        </Block>
        <Block title="Week 2 — Capitol Conquest (pre-season)">
          <ImgRow images={[
            { src: `${BASE}/2026-03/image-99.png`, alt: 'Pre-season week 2', caption: 'Week 2 overview' },
            { src: `${BASE}/2026-03/image-101.png`, alt: 'Capitol Conquest rules', caption: 'Capitol Conquest rules' },
          ]} />
          <ul className={styles.list}>
            <li><Tag color="accent">Pre-season special rule</Tag> Alliances can attack the Capitol without adjacent territory</li>
            <li>Battle duration: up to 4 hours</li>
            <li>Winner: alliance with highest capture progress (or 100%)</li>
            <li>Alliance leader becomes President and can distribute Awards</li>
          </ul>
          <Tip>Contaminated Land (adjacent to Capitol) lets you farm Honor Points via kills/deaths in the mud.</Tip>
        </Block>
        <Block title="Recommended preparation before the season">
          <ul className={styles.list}>
            <li>Max alliance techs: <strong>Veteran Craftsman</strong> (reduces seasonal building costs) + <strong>Quick Construction</strong></li>
            <li>Stock stamina for world zombies</li>
            <li>Save Hero Return Tickets from S5 to open at S6 launch</li>
            <li>Collect purple shards to promote Braz to 5⭐ (future UR hero)</li>
            <li>Max Engineer skills before start: construction speed at levels 10, 15, 30, 35, 95</li>
            <li>Reserve 1 skill point for day 15: <strong>Relic Expert</strong></li>
          </ul>
        </Block>
      </>
    ),
  },

  {
    id: 'factions',
    icon: '⚔️',
    title: { fr: 'Système de Factions', en: 'Faction System' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Img src={`${WIKI}/1774860445933-wtkhmrbtu.png`} alt="Structure inter-zones S6" caption="Structure 4v4 — Forêt Tropicale Ombragée" />
        <p className={styles.lead}>Les 8 Zones de Guerre sont réparties en <strong>2 grandes Factions</strong> qui s'affrontent sur une carte symétrique. L'objectif est d'accumuler le plus de <strong>Points d'Influence</strong> (occupation + destruction) pour remporter la saison.</p>
        <Block title="Choix de faction (Pré-saison)">
          <Img src={`${WIKI}/1774860572693-nkuyeyiwwpl.png`} alt="Choix stratégique de faction" caption="Sélection de faction" />
          <ul className={styles.list}>
            <li>Les Présidents des Chefs de faction s'affrontent stratégiquement</li>
            <li>Chaque Zone de Guerre choisit : <strong>Faction Deepwood</strong> ou <strong>Faction Wetland</strong></li>
            <li>Une fois confirmée, la faction reste <strong>stable toute la saison</strong></li>
            <li>Tous les joueurs et alliances sont automatiquement rattachés</li>
          </ul>
        </Block>
        <Block title="Mécanique inter-zones">
          <InfoRow label="Semaine 1" value="Téléportation dans sa propre Zone de Guerre uniquement" />
          <InfoRow label="Semaine 2+" value="Téléporteur Avancé disponible → rejoindre les zones alliées" />
        </Block>
        <Block title="Gains partagés par Faction">
          <ul className={styles.list}>
            <li><strong>Recherche Technologique de Faction</strong> partagée → buffs pour toute la faction</li>
            <li><strong>Récompenses de règlement</strong> en fin de saison selon performance globale</li>
            <li><strong>Buff de palier d'Influence</strong> : plus les Points d'Influence sont élevés, plus les buffs sont puissants</li>
            <li><strong>Dernier Recours</strong> : zone sous pression → Effets de Contre-Attaque supplémentaires (voir section Villes)</li>
          </ul>
        </Block>
        <Block title="Jours de Déclaration de Guerre">
          <InfoRow label="Jours autorisés" value="Mercredi et Samedi" />
          <InfoRow label="Maximum d'Autels par alliance" value="3 simultanément" />
          <InfoRow label="Fenêtre capture Autel" value="Mardi 12h00 (heure serveur) — 1 heure" />
        </Block>
      </>
    ) : (
      <>
        <Img src={`${WIKI}/1774860445933-wtkhmrbtu.png`} alt="S6 inter-zone structure" caption="4v4 structure — Shadow Rainforest" />
        <p className={styles.lead}>The 8 Warzones are split into <strong>2 major Factions</strong> on a mirrored map. The goal is to accumulate the most <strong>Influence Points</strong> (occupation + destruction) to win the season.</p>
        <Block title="Faction Choice (Pre-Season)">
          <Img src={`${WIKI}/1774860572693-nkuyeyiwwpl.png`} alt="Strategic faction choice" caption="Faction selection" />
          <ul className={styles.list}>
            <li>Faction Leader Presidents compete strategically</li>
            <li>Each Warzone chooses: <strong>Deepwood Faction</strong> or <strong>Wetland Faction</strong></li>
            <li>Once confirmed, the faction remains <strong>stable for the entire season</strong></li>
            <li>All players and alliances are automatically assigned</li>
          </ul>
        </Block>
        <Block title="Inter-Zone Mechanic">
          <InfoRow label="Week 1" value="Teleportation within your own Warzone only" />
          <InfoRow label="Week 2+" value="Advanced Teleporter available → join allied zones" />
        </Block>
        <Block title="Shared Faction Gains">
          <ul className={styles.list}>
            <li><strong>Faction Technology Research</strong> shared → buffs for the whole faction</li>
            <li><strong>Settlement rewards</strong> at season end based on global performance</li>
            <li><strong>Influence tier buff</strong>: higher Influence Points = stronger faction buffs</li>
            <li><strong>Last Resort</strong>: zone under pressure → extra Counter-Attack Effects (see Cities section)</li>
          </ul>
        </Block>
        <Block title="War Declaration Days">
          <InfoRow label="Allowed days" value="Wednesday and Saturday" />
          <InfoRow label="Max Altars per alliance" value="3 simultaneously" />
          <InfoRow label="Altar capture window" value="Tuesday 12:00 (server time) — 1 hour" />
        </Block>
      </>
    ),
  },

  {
    id: 'cities',
    icon: '💥',
    title: { fr: 'Villes & Territoire', en: 'Cities & Territory' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Img src={`${WIKI}/1775794207091-j0u6xkrobmd.png`} alt="Mécanique de destruction des villes" caption="Destruction des villes ennemies" />
        <p className={styles.lead}>En S6, l'objectif n'est plus seulement d'<strong>occuper</strong> mais de <strong>détruire</strong> les villes ennemies pour gagner des Points d'Influence de faction.</p>
        <Block title="Règles de Déclaration de Guerre">
          <ul className={styles.list}>
            <li>Uniquement R4/R5 peuvent déclarer la guerre</li>
            <li>Actions de Ville ouvertes les <strong>mercredis et samedis</strong> uniquement</li>
            <li>Prérequis : contrôler un <strong>Terrain de Pêche adjacent</strong></li>
            <li>Une seule ville ciblée simultanément par alliance</li>
          </ul>
        </Block>
        <Block title="Ordre Détruire">
          <Img src={`${WIKI}/1775794235099-jd82f7r07n.png`} alt="Ordre Détruire automatique" caption="Ordre Détruire" />
          <ul className={styles.list}>
            <li>Ville ennemie saisonnière ciblée → ordre <strong>【Détruire】</strong> automatique</li>
            <li>Après capture : la ville est <strong>automatiquement détruite</strong></li>
            <li>Ville détruite : ne compte pas dans la limite d'alliance, <strong>ne peut pas être restaurée</strong></li>
            <li>L'alliance gagne définitivement les <strong>Points d'Influence de Destruction</strong></li>
            <li>Plusieurs attaquants : celui avec le plus de dégâts de durabilité reçoit les points</li>
            <li>Villes de plus haut niveau = plus de Points d'Influence</li>
          </ul>
          <Warn>Le total d'Influence en fin de saison détermine le vainqueur. Priorisez les villes de haut niveau.</Warn>
        </Block>
        <Block title="Dernier Rempart — Système d'équilibre">
          <Img src={`${WIKI}/1775794245139-mmtul4js2gl.png`} alt="Système Dernier Rempart" caption="Buffs compensateurs automatiques" />
          <p className={styles.note}>Quand une Zone de Guerre subit trop de destructions, des buffs compensateurs s'activent automatiquement :</p>
          <Table
            headers={['Niveau', 'Effets']}
            rows={[
              ['Lv1', 'Vitesse de Marche +5%, Production Or +5%'],
              ['Lv2', 'Vitesse de Marche +10%, Production Or +10%'],
              ['Lv3', 'Formation +5%, Réduction Dégâts +5%, Marche +15%, Or +15%'],
              ['Lv4', 'Tous les effets encore renforcés'],
            ]}
          />
          <Tip>Ce mécanisme empêche les écrasements rapides et donne une chance aux zones sous pression de résister.</Tip>
        </Block>
        <Block title="Récompenses de capture">
          <ul className={styles.list}>
            <li>Tous les membres reçoivent les récompenses de destruction</li>
            <li>Les participants reçoivent en plus des récompenses de participation/classement</li>
          </ul>
        </Block>
      </>
    ) : (
      <>
        <Img src={`${WIKI}/1775794207091-j0u6xkrobmd.png`} alt="City destruction mechanic" caption="Destroying enemy cities" />
        <p className={styles.lead}>In S6, the goal is no longer just to <strong>occupy</strong> but to <strong>destroy</strong> enemy cities to earn faction Influence Points.</p>
        <Block title="War Declaration Rules">
          <ul className={styles.list}>
            <li>Only R4/R5 can declare war</li>
            <li>City actions open on <strong>Wednesdays and Saturdays</strong> only</li>
            <li>Prerequisite: control an <strong>adjacent Fishing Ground</strong></li>
            <li>One city targeted simultaneously per alliance</li>
          </ul>
        </Block>
        <Block title="Destroy Order">
          <Img src={`${WIKI}/1775794235099-jd82f7r07n.png`} alt="Automatic Destroy order" caption="Destroy Order" />
          <ul className={styles.list}>
            <li>Enemy seasonal city targeted → automatic <strong>【Destroy】</strong> order</li>
            <li>After capture: the city is <strong>automatically destroyed</strong></li>
            <li>Destroyed city: doesn't count toward alliance limit, <strong>cannot be restored</strong></li>
            <li>Alliance permanently gains <strong>Destruction Influence Points</strong></li>
            <li>Multiple attackers: highest durability damage dealer receives the points</li>
            <li>Higher-level cities = more Influence Points</li>
          </ul>
          <Warn>Total Influence at season end determines the winner. Prioritize high-level cities.</Warn>
        </Block>
        <Block title="Last Bastion — Balance System">
          <Img src={`${WIKI}/1775794245139-mmtul4js2gl.png`} alt="Last Bastion system" caption="Automatic compensatory buffs" />
          <p className={styles.note}>When a Warzone suffers too many destructions, compensatory buffs activate automatically:</p>
          <Table
            headers={['Level', 'Effects']}
            rows={[
              ['Lv1', 'March Speed +5%, Gold Production +5%'],
              ['Lv2', 'March Speed +10%, Gold Production +10%'],
              ['Lv3', 'Training +5%, Damage Reduction +5%, March +15%, Gold +15%'],
              ['Lv4', 'All effects further strengthened'],
            ]}
          />
          <Tip>This mechanic prevents fast steamrolls and gives pressured zones a fighting chance.</Tip>
        </Block>
        <Block title="Capture rewards">
          <ul className={styles.list}>
            <li>All members receive destruction rewards</li>
            <li>Participants also receive participation/ranking rewards</li>
          </ul>
        </Block>
      </>
    ),
  },

  {
    id: 'altars',
    icon: '🏛️',
    title: { fr: 'Les Autels', en: 'Altars' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Img src={`${WIKI}/1776999123341-me389bg3nkm.png`} alt="Les Autels S6" caption="Vue d'ensemble des Autels" />
        <p className={styles.lead}>Les Autels sont situés dans la Région Centrale (Clan du Grand Fleuve, neutre). Ils accordent de puissantes <strong>Compétences d'Alliance</strong> et peuvent être capturés <strong>sans territoire adjacent requis</strong>.</p>
        <Block title="Règles d'ouverture">
          <InfoRow label="Jour de conquête" value="Chaque mardi à 12h00 (heure serveur)" />
          <InfoRow label="Durée de la phase" value="1 heure" />
          <InfoRow label="Maximum par alliance" value="3 Autels simultanément" />
          <InfoRow label="Abandon" value="Délai de 60 min (annulable) — impossible 1h avant la conquête" />
        </Block>
        <Block title="Exclusions mutuelles">
          <Img src={`${WIKI}/1776998835508-nufyuxzel9p.png`} alt="Exclusions entre Autels" caption="Relations d'exclusion" />
          <ul className={styles.list}>
            <li>🐍 <strong>Autel du Serpent</strong> (Barrière de Serpent — <em>Fortifier</em>) ↔ <strong>Autel de la Rafale</strong> (Missile du Seigneur de la Guerre) — mutuellement exclusifs</li>
            <li>🦅 <strong>Autel de l'Écho</strong> (Armée de la Nuit — <em>Invoquer l'Armée des Momies</em>) ↔ <strong>Autel de Plumes</strong> (Bobine Tesla) — mutuellement exclusifs</li>
            <li>Capturer plusieurs Autels identiques n'active la compétence qu'<strong>une seule fois</strong></li>
          </ul>
        </Block>
        <Block title="Compétences d'Autel">
          <Img src={`${WIKI}/1776999316219-hifmzr5awj.png`} alt="Interface capture d'Autel" caption="Interface de capture" />
          <Table
            headers={['Autel', 'Compétence accordée']}
            rows={[
              ['Autel du Serpent', 'Fortifier'],
              ['Autel de la Rafale', 'Missile du Seigneur de la Guerre'],
              ["Autel de l'Écho", "Invoquer l'Armée des Momies"],
              ['Autel de Plumes', 'Bobine Tesla'],
            ]}
          />
        </Block>
        <Block title="Cadeau du Clan du Grand Fleuve">
          <ul className={styles.list}>
            <li>Après capture, les membres <strong>R4+</strong> peuvent invoquer le cadeau</li>
            <li>Des <strong>bancs de poissons</strong> apparaissent autour de l'Autel</li>
          </ul>
        </Block>
      </>
    ) : (
      <>
        <Img src={`${WIKI}/1776999123341-me389bg3nkm.png`} alt="S6 Altars overview" caption="Altars overview" />
        <p className={styles.lead}>Altars are in the Central Region (neutral Great River Clan). They grant powerful <strong>Alliance Skills</strong> and can be captured <strong>without adjacent territory</strong>.</p>
        <Block title="Opening rules">
          <InfoRow label="Conquest day" value="Every Tuesday at 12:00 (server time)" />
          <InfoRow label="Phase duration" value="1 hour" />
          <InfoRow label="Max per alliance" value="3 Altars simultaneously" />
          <InfoRow label="Abandon" value="60-minute delay (cancellable) — not possible 1h before conquest" />
        </Block>
        <Block title="Mutual exclusions">
          <Img src={`${WIKI}/1776998835508-nufyuxzel9p.png`} alt="Altar exclusions" caption="Exclusion relationships" />
          <ul className={styles.list}>
            <li>🐍 <strong>Serpent Altar</strong> (Serpent Barrier — <em>Fortify</em>) ↔ <strong>Gust Altar</strong> (Warlord Missile) — mutually exclusive</li>
            <li>🦅 <strong>Echo Altar</strong> (Army of Night — <em>Summon Mummy Army</em>) ↔ <strong>Feather Altar</strong> (Tesla Coil) — mutually exclusive</li>
            <li>Capturing multiple identical Altars only activates the skill <strong>once</strong></li>
          </ul>
        </Block>
        <Block title="Altar Skills">
          <Img src={`${WIKI}/1776999316219-hifmzr5awj.png`} alt="Altar capture interface" caption="Capture interface" />
          <Table
            headers={['Altar', 'Skill granted']}
            rows={[
              ['Serpent Altar', 'Fortify'],
              ['Gust Altar', 'Warlord Missile'],
              ['Echo Altar', 'Summon Mummy Army'],
              ['Feather Altar', 'Tesla Coil'],
            ]}
          />
        </Block>
        <Block title="Gift of the Great River Clan">
          <ul className={styles.list}>
            <li>After capture, <strong>R4+</strong> members can summon the gift</li>
            <li><strong>Schools of fish</strong> appear around the Altar</li>
          </ul>
        </Block>
      </>
    ),
  },

  {
    id: 'pacts',
    icon: '🤝',
    title: { fr: 'Pactes d\'Alliance', en: 'Alliance Pacts' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Img src={`${WIKI}/1774860735013-1316j42zeplf.png`} alt="Mécanisme de Pacte d'Alliance" caption="Pactes d'Alliance" />
        <Block title="Former un Pacte">
          <ImgRow images={[
            { src: `${BASE}/2026-03/image-73.png`, alt: "Formulaire Pacte d'Alliance", caption: 'Former un pacte' },
            { src: `${BASE}/2026-03/image-75.png`, alt: 'Rang de Guerre de Faction', caption: 'Rang de Guerre de Faction' },
          ]} />
          <ul className={styles.list}>
            <li>Prérequis : même faction, territoire adjacent, consentement mutuel</li>
            <li>Impossible à former les jours de déclaration de guerre (mer./sam.)</li>
            <li>Avantages : adjacence partagée, renforcement de troupes, chat 200 membres, notifs synchronisées</li>
          </ul>
        </Block>
        <Block title="Capacités déverrouillées par Pacte">
          <Img src={`${WIKI}/1774861303290-3jyopkb5gzx.png`} alt="Avantages tactiques du Pacte" caption="Capacités stratégiques" />
          <ul className={styles.list}>
            <li>Avancer en empruntant le <strong>territoire d'un allié</strong></li>
            <li>Soutien défensif des <strong>villes et du Capitole</strong> allié</li>
            <li>Participation aux <strong>batailles d'avant-postes</strong></li>
            <li>Partage de renseignement entre alliés</li>
          </ul>
        </Block>
        <Block title="Dissolution d'un Pacte">
          <ul className={styles.list}>
            <li>Abandon proactif : <strong>60 minutes</strong> de délai (annulable)</li>
            <li>Aucune période de recharge si annulation proactive</li>
            <li>À la dissolution : Déploiement Rapide de tous les Renforts, fermeture de la Discussion de Groupe</li>
            <li>Les compétences déjà libérées <strong>continuent leur effet</strong></li>
          </ul>
        </Block>
        <Block title="Temps Protégé d'Alliance">
          <ImgRow images={[
            { src: `${BASE}/2026-03/image-41.png`, alt: "Temps Protégé d'Alliance", caption: "Temps Protégé d'Alliance" },
            { src: `${BASE}/2026-03/image-42.png`, alt: 'Créneaux de Combat', caption: 'Créneaux de Combat' },
          ]} />
          <ul className={styles.list}>
            <li>Un créneau fixe par alliance où les Villes/Forts ne peuvent pas être attaqués</li>
            <li>Configurable via Alliance → Paramètres → Temps Protégé d'Alliance</li>
            <li>Les créneaux sont fixes côté serveur (pas dépendants du fuseau horaire)</li>
          </ul>
        </Block>
      </>
    ) : (
      <>
        <Img src={`${WIKI}/1774860735013-1316j42zeplf.png`} alt="Alliance Pact mechanic" caption="Alliance Pacts" />
        <Block title="Forming a Pact">
          <ImgRow images={[
            { src: `${BASE}/2026-03/image-73.png`, alt: 'Form Alliance Pact', caption: 'Forming a pact' },
            { src: `${BASE}/2026-03/image-75.png`, alt: 'Faction War Rank', caption: 'Faction War Rank' },
          ]} />
          <ul className={styles.list}>
            <li>Requirements: same faction, adjacent territory, mutual consent</li>
            <li>Cannot form on War Declaration Days (Wed/Sat)</li>
            <li>Benefits: shared adjacency, troop reinforcement, 200-member chat, synced notifications</li>
          </ul>
        </Block>
        <Block title="Capabilities unlocked by Pact">
          <Img src={`${WIKI}/1774861303290-3jyopkb5gzx.png`} alt="Pact tactical advantages" caption="Strategic capabilities" />
          <ul className={styles.list}>
            <li>Advance through an <strong>ally's territory</strong></li>
            <li>Defensive support for <strong>allied cities and Capitol</strong></li>
            <li>Participation in <strong>outpost battles</strong></li>
            <li>Intelligence sharing between allies</li>
          </ul>
        </Block>
        <Block title="Dissolving a Pact">
          <ul className={styles.list}>
            <li>Proactive abandonment: <strong>60-minute</strong> delay (cancellable)</li>
            <li>No cooldown if proactive cancellation</li>
            <li>On dissolution: Rapid Deployment of all Reinforcements, Group Discussion closed</li>
            <li>Already-released skills <strong>continue their effects</strong></li>
          </ul>
        </Block>
        <Block title="Alliance Safe Time">
          <ImgRow images={[
            { src: `${BASE}/2026-03/image-41.png`, alt: 'Alliance Safe Time', caption: 'Alliance Safe Time' },
            { src: `${BASE}/2026-03/image-42.png`, alt: 'Battle Ready Time slots', caption: 'Battle Ready Time' },
          ]} />
          <ul className={styles.list}>
            <li>One fixed slot per alliance where Cities/Strongholds cannot be attacked</li>
            <li>Configure via Alliance → Settings → Alliance Safe Time</li>
            <li>Slots are server-fixed (not timezone-dependent)</li>
          </ul>
        </Block>
      </>
    ),
  },

  {
    id: 'faction_tech',
    icon: '🔬',
    title: { fr: 'Technologie de Faction', en: 'Faction Technology' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Img src={`${WIKI}/1775530283202-l5063nsl3ce.png`} alt="Technologie de Faction" caption="Interface Technologie de Faction" />
        <p className={styles.lead}>Système de croissance <strong>partagé par toute la Faction</strong>. Les membres investissent des ressources (poissons, matériaux) pour améliorer la Puissance de Combat globale de leur camp.</p>
        <Block title="Ce que ça déverrouille">
          <ul className={styles.list}>
            <li><strong>Fonctions de faction</strong> : mécanismes de coopération entre alliances alliées</li>
            <li><strong>Effets de bonus globaux</strong> : buffs de combat pour toute la faction</li>
            <li><strong>Capacités de Pacte</strong> : fonctionnalités avancées entre alliances partenaires</li>
          </ul>
        </Block>
        <Block title="Lien avec les Points d'Influence">
          <ul className={styles.list}>
            <li>Points d'influence <strong>occupés</strong> (contrôle territorial) → bonus faction</li>
            <li>Points d'influence <strong>détruits</strong> (villes ennemies détruites) → bonus supplémentaires</li>
            <li>Plus les Points d'Influence sont élevés, plus les buffs de faction sont puissants</li>
          </ul>
          <Tip>Donner des prises de pêche dans la Technologie de Faction génère de l'Énergie d'Alliance — un des moyens de contribuer sans combattre directement.</Tip>
        </Block>
      </>
    ) : (
      <>
        <Img src={`${WIKI}/1775530283202-l5063nsl3ce.png`} alt="Faction Technology" caption="Faction Technology interface" />
        <p className={styles.lead}><strong>Faction-wide</strong> growth system. Members invest resources (fish, materials) to boost their side's global Combat Power.</p>
        <Block title="What it unlocks">
          <ul className={styles.list}>
            <li><strong>Faction functions</strong>: cooperation mechanics between allied alliances</li>
            <li><strong>Global bonus effects</strong>: combat buffs for the entire faction</li>
            <li><strong>Pact capabilities</strong>: advanced features between partner alliances</li>
          </ul>
        </Block>
        <Block title="Link with Influence Points">
          <ul className={styles.list}>
            <li><strong>Occupied</strong> Influence Points (territorial control) → faction bonuses</li>
            <li><strong>Destroyed</strong> Influence Points (enemy cities destroyed) → additional bonuses</li>
            <li>Higher Influence Points = stronger faction buffs</li>
          </ul>
          <Tip>Donating fish catches to Faction Technology generates Alliance Energy — a way to contribute without direct combat.</Tip>
        </Block>
      </>
    ),
  },

  {
    id: 'resources',
    icon: '💎',
    title: { fr: 'Nouvelles ressources', en: 'New Resources' },
    content: (lang) => lang === 'fr' ? (
      <>
        <div className={styles.resourceIcons}>
          <div className={styles.resourceIcon}>
            <img src={`${BASE}/2026-03/spore.png`} alt="Spore" />
            <span>Spore</span>
          </div>
          <div className={styles.resourceIcon}>
            <img src={`${BASE}/2026-03/rainforest-mushroom.png`} alt="Rainforest Mushroom" />
            <span>Rainforest Mushroom</span>
          </div>
          <div className={styles.resourceIcon}>
            <img src={`${BASE}/2026-03/war-merit.png`} alt="Mérite de Guerre" />
            <span>Mérite de Guerre</span>
          </div>
        </div>
        <Table
          headers={['Ressource', 'Utilisation', 'Sources principales']}
          rows={[
            ['Spore', 'Construction/amélioration du Fungus Institute', 'Premiers kills, recrutement héros, quêtes, captures de villes, génération Spore Factory'],
            ['Rainforest Mushroom', 'Construction/amélioration Spore Factory', 'Kills de zombies, kills Doom Elite, visiteurs, quêtes, battle pass, captures villes/forts'],
            ['Mérite de Guerre', 'Achats Boutique des Mérites (ressource rare)', 'Éliminations zombies/Doom Elite, génération horaire via villes'],
          ]}
        />
        <Tip>Les Spores et Rainforest Mushrooms se convertissent en Profession EXP à la fin de la saison.</Tip>
        <Warn>Il n'y a pas de tuiles de ressources d'alliance pour les ressources saisonnières en S6 — pas de collecte centralisée possible.</Warn>
        <Block title="Doom Walker — Kill quotidien prioritaire">
          <p className={styles.lead}>Un Doom Walker de niveau 100 peut récompenser jusqu'à <strong>200 000 Rainforest Mushrooms</strong> par jour pour le premier kill. À prioriser chaque jour.</p>
        </Block>
        <Block title="Packs saisonniers (5 premiers jours seulement)">
          <ul className={styles.list}>
            <li>Packs de Rainforest Mushrooms disponibles uniquement les 5 premiers jours</li>
            <li>Coût progressif : ≈5€ / 10€ / 20€ / 50€ par pack successif</li>
            <li><Tag color="accent">Conseil</Tag> Acheter dès J1 pour maximiser le retour</li>
          </ul>
        </Block>
      </>
    ) : (
      <>
        <div className={styles.resourceIcons}>
          <div className={styles.resourceIcon}>
            <img src={`${BASE}/2026-03/spore.png`} alt="Spore" />
            <span>Spore</span>
          </div>
          <div className={styles.resourceIcon}>
            <img src={`${BASE}/2026-03/rainforest-mushroom.png`} alt="Rainforest Mushroom" />
            <span>Rainforest Mushroom</span>
          </div>
          <div className={styles.resourceIcon}>
            <img src={`${BASE}/2026-03/war-merit.png`} alt="War Merit" />
            <span>War Merit</span>
          </div>
        </div>
        <Table
          headers={['Resource', 'Use', 'Main sources']}
          rows={[
            ['Spore', 'Build/upgrade Fungus Institute', 'First kills, hero recruitment, quests, city captures, Spore Factory generation'],
            ['Rainforest Mushroom', 'Build/upgrade Spore Factory', 'Zombie kills, Doom Elite kills, visitors, quests, battle pass, city/stronghold captures'],
            ['War Merit', 'War Merit Shop purchases (rare)', 'Zombie/Doom Elite kills, hourly city generation'],
          ]}
        />
        <Tip>Spores and Rainforest Mushrooms convert to Profession EXP at season end.</Tip>
        <Warn>There are no alliance resource tiles for seasonal resources in S6 — no centralized funneling strategy possible.</Warn>
        <Block title="Doom Walker — Daily priority kill">
          <p className={styles.lead}>A level 100 Doom Walker can reward up to <strong>200,000 Rainforest Mushrooms</strong> for the first daily kill. Prioritize this every day.</p>
        </Block>
        <Block title="Seasonal packs (first 5 days only)">
          <ul className={styles.list}>
            <li>Rainforest Mushroom packs available only for the first 5 days</li>
            <li>Escalating cost: ≈$5 / $10 / $20 / $50 per successive pack</li>
            <li><Tag color="accent">Tip</Tag> Buy on day 1 to maximize returns</li>
          </ul>
        </Block>
      </>
    ),
  },

  {
    id: 'buildings',
    icon: '🏗',
    title: { fr: 'Nouveaux bâtiments', en: 'New Buildings' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Block title="🧫 Fungus Institute">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-10.png`, alt: 'Fungus Institute', caption: 'Bâtiment Fungus Institute' },
            { src: `${BASE}/2026-04/image-11.png`, alt: 'Interface amélioration Fungus Institute', caption: 'Interface d\'amélioration' },
          ]} />
          <InfoRow label="Rôle" value="Améliore la Résistance aux Virus pour le combat contre les zombies et protecteurs de Forts" />
          <InfoRow label="Monnaie d'amélioration" value="Spores" />
          <InfoRow label="Niveau max" value="≈ 60" />
          <ul className={styles.list}>
            <li>La Résistance aux Virus du <strong>leader du rallye</strong> s'applique à tous les participants</li>
            <li>Le Weekly Pass octroie +250 de bonus instantané</li>
            <li>À réparer dès le niveau 4 pour débloquer la Boutique des Mérites</li>
          </ul>
        </Block>
        <Block title="🍄 Spore Factory (I / II / III / IV + Weekly)">
          <InfoRow label="Rôle" value="Génère des Spores en continu" />
          <InfoRow label="Monnaie d'amélioration" value="Rainforest Mushrooms" />
          <InfoRow label="Niveau max par usine" value="30" />
          <InfoRow label="Usine II déblocage" value="Usine I niveau 15" />
          <ul className={styles.list}>
            <li>5 usines au total (I/II/III/IV via progression, V via Weekly Pass)</li>
            <li><Tag color="accent">Stratégie optimale</Tag> Monter chaque usine à 15 successivement pour débloquer les suivantes, puis monter toutes de façon équilibrée</li>
          </ul>
        </Block>
        <Block title="🛡 Protector's Field">
          <InfoRow label="Rôle" value="Nouveau bâtiment saisonnier — prérequis pour la compétence Summon Mummies" />
          <InfoRow label="Niveau requis pour Summon Mummies" value="25" />
        </Block>
        <Block title="🛒 Boutique des Mérites de Guerre">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-154.png`, alt: 'Boutique des Mérites 1', caption: 'Boutique des Mérites (1)' },
            { src: `${BASE}/2026-04/image-155.png`, alt: 'Boutique des Mérites 2', caption: 'Boutique des Mérites (2)' },
          ]} />
          <InfoRow label="Rôle" value="Échange de Mérites de Guerre contre des ressources et objets exclusifs" />
          <InfoRow label="Déblocage" value="Fungus Institute niveau 4" />
          <ul className={styles.list}>
            <li>Certains objets conditionnés par le niveau de Faction War Rank</li>
          </ul>
        </Block>
        <Tip>Priorisé dès J1 : construire le Fungi Institute et la Mushroom Seed Factory, puis monter la Mushroom Factory au niveau 4 pour réparer la Boutique des Mérites.</Tip>
      </>
    ) : (
      <>
        <Block title="🧫 Fungus Institute">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-10.png`, alt: 'Fungus Institute', caption: 'Fungus Institute building' },
            { src: `${BASE}/2026-04/image-11.png`, alt: 'Fungus Institute upgrade', caption: 'Upgrade interface' },
          ]} />
          <InfoRow label="Role" value="Boosts Virus Resistance for zombie and Stronghold protector combat" />
          <InfoRow label="Upgrade currency" value="Spores" />
          <InfoRow label="Max level" value="≈ 60" />
          <ul className={styles.list}>
            <li>The <strong>rally leader's</strong> Virus Resistance applies to all participants</li>
            <li>Weekly Pass grants +250 instant bonus</li>
            <li>Repair at level 4 to unlock the War Merit Shop</li>
          </ul>
        </Block>
        <Block title="🍄 Spore Factory (I / II / III / IV + Weekly)">
          <InfoRow label="Role" value="Continuously generates Spores" />
          <InfoRow label="Upgrade currency" value="Rainforest Mushrooms" />
          <InfoRow label="Max level per factory" value="30" />
          <InfoRow label="Factory II unlock" value="Factory I level 15" />
          <ul className={styles.list}>
            <li>5 factories total (I/II/III/IV via progression, V via Weekly Pass)</li>
            <li><Tag color="accent">Optimal strategy</Tag> Level each factory to 15 sequentially to unlock the next, then level all evenly</li>
          </ul>
        </Block>
        <Block title="🛡 Protector's Field">
          <InfoRow label="Role" value="New seasonal building — prerequisite for Summon Mummies skill" />
          <InfoRow label="Level required for Summon Mummies" value="25" />
        </Block>
        <Block title="🛒 War Merit Shop">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-154.png`, alt: 'War Merit Shop 1', caption: 'War Merit Shop (1)' },
            { src: `${BASE}/2026-04/image-155.png`, alt: 'War Merit Shop 2', caption: 'War Merit Shop (2)' },
          ]} />
          <InfoRow label="Role" value="Exchange War Merit for resources and exclusive items" />
          <InfoRow label="Unlock" value="Fungus Institute level 4" />
          <ul className={styles.list}>
            <li>Certain items gated by Faction War Rank level</li>
          </ul>
        </Block>
        <Tip>Day 1 priority: build the Fungi Institute and Mushroom Seed Factory, then upgrade Mushroom Factory to level 4 to repair the War Merit Shop.</Tip>
      </>
    ),
  },

  {
    id: 'professions',
    icon: '🎓',
    title: { fr: 'Professions', en: 'Professions' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Warn>Le Diplomate n'est PAS disponible en Saison 6. Seuls Ingénieur et War Leader sont jouables.</Warn>
        <Img src={`${BASE}/2025-05/image-178.png`} alt="Profession Hall" caption="Interface de la Profession Hall" />
        <Block title="Informations générales">
          <InfoRow label="Niveau maximum" value="100" />
          <InfoRow label="Professions disponibles" value="Ingénieur, War Leader" />
          <InfoRow label="Compétences saisonnières" value="20 au total" />
          <InfoRow label="Réinitialisation" value="Disponible au début de saison" />
          <p className={styles.note}>Au niveau 100, l'EXP de profession continue à améliorer les Cartes de Tactique plutôt que de monter de niveau.</p>
        </Block>
        <Block title="Arbre de compétences — Ingénieur">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-70.png`, alt: 'Ingénieur niveaux 1-15', caption: 'Niveaux 1–15' },
            { src: `${BASE}/2026-04/image-71.png`, alt: 'Ingénieur niveaux 20-35', caption: 'Niveaux 20–35' },
            { src: `${BASE}/2026-04/image-72.png`, alt: 'Ingénieur niveaux 40-55', caption: 'Niveaux 40–55' },
          ]} />
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-73.png`, alt: 'Ingénieur niveaux 60-75', caption: 'Niveaux 60–75' },
            { src: `${BASE}/2026-04/image-74.png`, alt: 'Ingénieur niveaux 80-95', caption: 'Niveaux 80–95' },
            { src: `${BASE}/2026-04/image-76.png`, alt: 'Ingénieur niveaux 95-100', caption: 'Niveaux 95–100' },
          ]} />
        </Block>
        <Block title="Compétences clés — Croissance (début de saison)">
          <ImgRow images={[
            { src: `${BASE}/2025-03/image-193.png`, alt: 'Combat Experience', caption: 'Combat Experience (Nv.1)' },
            { src: `${BASE}/2025-03/image-195.png`, alt: 'Building Inspiration I', caption: 'Building Inspiration I (Nv.5)' },
            { src: `${BASE}/2025-03/image-199.png`, alt: 'Professional Insights', caption: 'Professional Insights (Nv.20)' },
          ]} />
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-79.png`, alt: 'Extra War Merit', caption: 'Extra War Merit (Nv.30)' },
            { src: `${BASE}/2025-03/image-196.png`, alt: 'Double Exchange', caption: 'Double Exchange (Nv.10)' },
          ]} />
        </Block>
        <Block title="Compétences clés — Pêche">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-80.png`, alt: 'Multi Fishing', caption: 'Multi Fishing (Nv.35)' },
            { src: `${BASE}/2026-04/image-82.png`, alt: 'Golden Bait', caption: 'Golden Bait (Nv.40)' },
            { src: `${BASE}/2026-04/image-87.png`, alt: 'Golden Fish Chest', caption: 'Golden Fish Chest (Nv.55)' },
          ]} />
        </Block>
        <Block title="Compétences clés — Combat / Territoire">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-88.png`, alt: 'Homeland Attack', caption: 'Homeland Attack (Nv.65)' },
            { src: `${BASE}/2026-04/image-89.png`, alt: 'Homeland Defense', caption: 'Homeland Defense (Nv.70)' },
            { src: `${BASE}/2026-04/image-101.png`, alt: 'Invasion Attack', caption: 'Invasion Attack (Nv.95)' },
            { src: `${BASE}/2026-04/image-102.png`, alt: 'Invasion Defense', caption: 'Invasion Defense (Nv.100)' },
          ]} />
        </Block>
        <Block title="Compétences uniques">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-91.png`, alt: 'Summon Mummies', caption: 'Summon Mummies (Nv.85)' },
            { src: `${BASE}/2025-03/image-225.png`, alt: 'Mummy en action', caption: 'Mummy invoquée' },
          ]} />
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-92.png`, alt: 'Buddy Fortify', caption: 'Buddy Fortify — Ingénieur (Nv.90)' },
            { src: `${BASE}/2026-04/image-96.png`, alt: 'Wall Fortify', caption: 'Wall Fortify — War Leader (Nv.90)' },
            { src: `${BASE}/2026-04/image-90.png`, alt: 'Ruins Expert', caption: 'Ruins Expert (Nv.80, Jour 15)' },
          ]} />
        </Block>
        <Block title="Jalons de Mérite de Guerre pour récompenses Profession">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-66.png`, alt: '250k War Merit', caption: '250 000 WM' },
            { src: `${BASE}/2026-04/image-67.png`, alt: '375k War Merit', caption: '375 000 WM' },
            { src: `${BASE}/2026-04/image-68.png`, alt: '625k War Merit', caption: '625 000 WM' },
            { src: `${BASE}/2026-04/image-69.png`, alt: '750k War Merit', caption: '700 000 WM' },
          ]} />
          <Table
            headers={['Mérite de Guerre', 'Récompense']}
            rows={[
              ['250 000', 'Livre de réinitialisation de compétences'],
              ['375 000', 'Certificat de changement de profession'],
              ['625 000', 'Livre de réinitialisation de compétences'],
              ['700 000', 'Livre de réinitialisation de compétences'],
            ]}
          />
        </Block>
      </>
    ) : (
      <>
        <Warn>Diplomat is NOT available in Season 6. Only Engineer and War Leader are playable.</Warn>
        <Img src={`${BASE}/2025-05/image-178.png`} alt="Profession Hall" caption="Profession Hall interface" />
        <Block title="General info">
          <InfoRow label="Level cap" value="100" />
          <InfoRow label="Available professions" value="Engineer, War Leader" />
          <InfoRow label="Seasonal skills" value="20 total" />
          <InfoRow label="Reset" value="Available at season start" />
          <p className={styles.note}>At level 100, profession EXP continues to upgrade Tactics Cards instead of leveling up.</p>
        </Block>
        <Block title="Skill tree — Engineer">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-70.png`, alt: 'Engineer levels 1-15', caption: 'Levels 1–15' },
            { src: `${BASE}/2026-04/image-71.png`, alt: 'Engineer levels 20-35', caption: 'Levels 20–35' },
            { src: `${BASE}/2026-04/image-72.png`, alt: 'Engineer levels 40-55', caption: 'Levels 40–55' },
          ]} />
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-73.png`, alt: 'Engineer levels 60-75', caption: 'Levels 60–75' },
            { src: `${BASE}/2026-04/image-74.png`, alt: 'Engineer levels 80-95', caption: 'Levels 80–95' },
            { src: `${BASE}/2026-04/image-76.png`, alt: 'Engineer levels 95-100', caption: 'Levels 95–100' },
          ]} />
        </Block>
        <Block title="Key skills — Growth (early season)">
          <ImgRow images={[
            { src: `${BASE}/2025-03/image-193.png`, alt: 'Combat Experience', caption: 'Combat Experience (Lv.1)' },
            { src: `${BASE}/2025-03/image-195.png`, alt: 'Building Inspiration I', caption: 'Building Inspiration I (Lv.5)' },
            { src: `${BASE}/2025-03/image-199.png`, alt: 'Professional Insights', caption: 'Professional Insights (Lv.20)' },
          ]} />
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-79.png`, alt: 'Extra War Merit', caption: 'Extra War Merit (Lv.30)' },
            { src: `${BASE}/2025-03/image-196.png`, alt: 'Double Exchange', caption: 'Double Exchange (Lv.10)' },
          ]} />
        </Block>
        <Block title="Key skills — Fishing">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-80.png`, alt: 'Multi Fishing', caption: 'Multi Fishing (Lv.35)' },
            { src: `${BASE}/2026-04/image-82.png`, alt: 'Golden Bait', caption: 'Golden Bait (Lv.40)' },
            { src: `${BASE}/2026-04/image-87.png`, alt: 'Golden Fish Chest', caption: 'Golden Fish Chest (Lv.55)' },
          ]} />
        </Block>
        <Block title="Key skills — Combat / Territory">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-88.png`, alt: 'Homeland Attack', caption: 'Homeland Attack (Lv.65)' },
            { src: `${BASE}/2026-04/image-89.png`, alt: 'Homeland Defense', caption: 'Homeland Defense (Lv.70)' },
            { src: `${BASE}/2026-04/image-101.png`, alt: 'Invasion Attack', caption: 'Invasion Attack (Lv.95)' },
            { src: `${BASE}/2026-04/image-102.png`, alt: 'Invasion Defense', caption: 'Invasion Defense (Lv.100)' },
          ]} />
        </Block>
        <Block title="Unique skills">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-91.png`, alt: 'Summon Mummies', caption: 'Summon Mummies (Lv.85)' },
            { src: `${BASE}/2025-03/image-225.png`, alt: 'Mummy in action', caption: 'Summoned mummy' },
          ]} />
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-92.png`, alt: 'Buddy Fortify', caption: 'Buddy Fortify — Engineer (Lv.90)' },
            { src: `${BASE}/2026-04/image-96.png`, alt: 'Wall Fortify', caption: 'Wall Fortify — War Leader (Lv.90)' },
            { src: `${BASE}/2026-04/image-90.png`, alt: 'Ruins Expert', caption: 'Ruins Expert (Lv.80, Day 15)' },
          ]} />
        </Block>
        <Block title="War Merit milestones for Profession items">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-66.png`, alt: '250k War Merit', caption: '250,000 WM' },
            { src: `${BASE}/2026-04/image-67.png`, alt: '375k War Merit', caption: '375,000 WM' },
            { src: `${BASE}/2026-04/image-68.png`, alt: '625k War Merit', caption: '625,000 WM' },
            { src: `${BASE}/2026-04/image-69.png`, alt: '750k War Merit', caption: '700,000 WM' },
          ]} />
          <Table
            headers={['War Merit', 'Reward']}
            rows={[
              ['250,000', 'Profession Skill Reset Book'],
              ['375,000', 'Profession Change Certificate'],
              ['625,000', 'Profession Skill Reset Book'],
              ['700,000', 'Profession Skill Reset Book'],
            ]}
          />
        </Block>
      </>
    ),
  },

  {
    id: 'fishing',
    icon: '🎣',
    title: { fr: 'Système de Pêche', en: 'Fishing System' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Img src={`${WIKI}/20260424-fr.gif`} alt="Guide Pêche S6" caption="Aperçu du système de pêche S6" />
        <Block title="Terrains de Pêche (Forts)">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-40.png`, alt: 'Shadow Colossus protecteur', caption: 'Shadow Colossus — boss gardien' },
            { src: `${BASE}/2026-04/image-108.png`, alt: 'Règles Conquête des Terrains de Pêche', caption: 'Règles de capture' },
          ]} />
          <ul className={styles.list}>
            <li>Lieux de capture — niveau du terrain détermine la qualité des récompenses</li>
            <li>Le <strong>Shadow Colossus</strong> protège les terrains (boss à vaincre)</li>
            <li><Tag color="danger">Restriction</Tag> Les attaques sur ses propres Terrains de Pêche ne sont possibles que les <strong>mercredis et samedis</strong> (créneaux de combat de 1h)</li>
            <li>La capture doit atteindre 100% pendant la fenêtre ou elle échoue</li>
            <li>Plus proche de la Région Centrale → prise plus lourde (affecte les classements, pas le Taux de Chute ni l'Énergie)</li>
            <li>Objectif de zone de guerre semaine 1 : capturer 20 terrains</li>
            <li>L'alliance doit contrôler un Terrain de Pêche adjacent avant de déclarer la guerre à une Ville</li>
          </ul>
        </Block>
        <Block title="Fishing Fest (mini-jeu)">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-137.png`, alt: 'Fishing Fest gameplay 1', caption: 'Gameplay (1)' },
            { src: `${BASE}/2026-04/image-138.png`, alt: 'Fishing Fest gameplay 2', caption: 'Gameplay (2)' },
            { src: `${BASE}/2026-04/image-139.png`, alt: 'Fishing Fest gameplay 3', caption: 'Gameplay (3)' },
          ]} />
          <ul className={styles.list}>
            <li>Mini-jeu interactif disponible dans les terrains capturés</li>
            <li>Appât Normal (via Visiteur ou Boutique du Mérite) ou Appât Or (Compétence Profession, recharge 23,5h)</li>
            <li>1 poisson ou 3 poissons par session au choix</li>
            <li>Après morsure : <strong>5 secondes</strong> pour remonter la prise</li>
            <li>Type de poisson dépend de la faction d'origine / niveau du terrain</li>
            <li>La barre de timing affecte le poids (pas la probabilité)</li>
            <li>Les poissons du même type donnent autant d'Énergie quel que soit le poids</li>
            <li>Pêche sur terrain d'un allié de faction → chance de déclencher <strong>Collecter</strong> (ne compte pas dans le coffre individuel)</li>
            <li>Donner des prises dans la <strong>Technologie de Faction</strong> → génère de l'Énergie d'Alliance</li>
            <li>Objectif de zone de guerre semaine 1 : 50 000 poissons attrapés</li>
          </ul>
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-110.png`, alt: 'Classement Fishing Fest', caption: 'Classement individuel' },
            { src: `${BASE}/2026-04/image-111.png`, alt: 'Récompenses Fishing Fest', caption: 'Récompenses classement' },
          ]} />
        </Block>
        <Block title="Compétences de pêche (Profession)">
          <InfoRow label="Nv.35 Multi Fishing" value="Plusieurs poissons par tentative (appât supplémentaire requis)" />
          <InfoRow label="Nv.40 Golden Bait" value="1 Appât Doré gratuit toutes les 23.5h" />
          <InfoRow label="Nv.55 Golden Fish Chest" value="+1–5% chance de récompense bonus" />
        </Block>
      </>
    ) : (
      <>
        <Img src={`${WIKI}/20260424-fr.gif`} alt="S6 Fishing guide" caption="Season 6 fishing system overview" />
        <Block title="Fishing Grounds (Strongholds)">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-40.png`, alt: 'Shadow Colossus protector', caption: 'Shadow Colossus — guardian boss' },
            { src: `${BASE}/2026-04/image-108.png`, alt: 'Fishing Ground Conquest rules', caption: 'Capture rules' },
          ]} />
          <ul className={styles.list}>
            <li>Capture locations — ground level determines reward quality</li>
            <li><strong>Shadow Colossus</strong> guards the grounds (boss to defeat)</li>
            <li><Tag color="danger">Restriction</Tag> Attacks on own Fishing Grounds only allowed on <strong>Wednesdays and Saturdays</strong> (1-hour Battle-Ready Time windows)</li>
            <li>Capture must reach 100% during the window or it fails</li>
            <li>Closer to the Central Region → heavier catch (affects rankings, not Drop Rate or Energy)</li>
            <li>Warzone goal week 1: capture 20 grounds</li>
            <li>Alliance must control an adjacent Fishing Ground before declaring war on a City</li>
          </ul>
        </Block>
        <Block title="Fishing Fest (mini-game)">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-137.png`, alt: 'Fishing Fest gameplay 1', caption: 'Gameplay (1)' },
            { src: `${BASE}/2026-04/image-138.png`, alt: 'Fishing Fest gameplay 2', caption: 'Gameplay (2)' },
            { src: `${BASE}/2026-04/image-139.png`, alt: 'Fishing Fest gameplay 3', caption: 'Gameplay (3)' },
          ]} />
          <ul className={styles.list}>
            <li>Interactive mini-game available in captured grounds</li>
            <li>Normal bait (via Visitor or War Merit Shop) or Golden bait (Profession skill, 23.5h cooldown)</li>
            <li>1 fish or 3 fish per session, your choice</li>
            <li>After a bite: <strong>5 seconds</strong> to reel in</li>
            <li>Fish type depends on original faction / ground level</li>
            <li>Timing bar affects catch weight (not probability)</li>
            <li>Same-type fish yield equal Energy regardless of weight</li>
            <li>Fishing at an allied faction ground → chance to trigger <strong>Collect</strong> (doesn't count in individual chest)</li>
            <li>Donating catches to <strong>Faction Technology</strong> → generates Alliance Energy</li>
            <li>Warzone goal week 1: 50,000 fish caught</li>
          </ul>
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-110.png`, alt: 'Fishing Fest ranking', caption: 'Individual ranking' },
            { src: `${BASE}/2026-04/image-111.png`, alt: 'Fishing Fest rewards', caption: 'Ranking rewards' },
          ]} />
        </Block>
        <Block title="Fishing profession skills">
          <InfoRow label="Lv.35 Multi Fishing" value="Multiple fish per attempt (extra bait required)" />
          <InfoRow label="Lv.40 Golden Bait" value="1 free Golden Bait every 23.5h" />
          <InfoRow label="Lv.55 Golden Fish Chest" value="+1–5% chance of bonus reward" />
        </Block>
      </>
    ),
  },

  {
    id: 'merit',
    icon: '🎖️',
    title: { fr: 'Mérite de Guerre', en: 'War Merit' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Img src={`${WIKI}/1775530865739-tx8lx0r3kj.png`} alt="Interface du Mérite de Guerre" caption="Mérite de Guerre — interface" />
        <p className={styles.lead}>Le <strong>Mérite de Guerre</strong> enregistre les contributions individuelles et stimule la progression des grades personnels tout au long de la saison.</p>
        <Block title="Grades & Récompenses">
          <ul className={styles.list}>
            <li>Chaque grade déverrouille : <strong>Titre</strong> / <strong>Cadre d'Avatar</strong> / <strong>Plaque</strong></li>
            <li>En Phase de Règlement : le Mérite n'augmente plus, les Boosts de Grade ne sont plus effectifs</li>
          </ul>
        </Block>
        <Block title="Sources d'obtention">
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>⚔️ Combat & Progression</div>
            <ul className={styles.list}>
              <li>Première élimination d'une Élite Maudite / Zombie de la Forêt Tropicale</li>
              <li>Participation à la Première Capture des Terrains de Pêche / Villes</li>
            </ul>
          </div>
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>🏆 Activités & Classements</div>
            <ul className={styles.list}>
              <li>Classement de l'Action de Purge</li>
              <li>Combat et classement dans Sous les Ruines</li>
            </ul>
          </div>
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>💥 Affrontement de Factions</div>
            <ul className={styles.list}>
              <li>Renforcer les Villes sur la carte</li>
              <li>Participer à la Destruction des Villes adverses</li>
              <li>Classement Tuerie dans le Clash de Factions</li>
              <li>Classement Défense Coopérative dans le Clash de Factions</li>
            </ul>
          </div>
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>🤝 Contribution & Construction</div>
            <ul className={styles.list}>
              <li>Donner des prises dans les Compétences de l'Alliance</li>
              <li>Génération horaire via les villes contrôlées</li>
            </ul>
          </div>
        </Block>
      </>
    ) : (
      <>
        <Img src={`${WIKI}/1775530865739-tx8lx0r3kj.png`} alt="War Merit interface" caption="War Merit — interface" />
        <p className={styles.lead}><strong>War Merit</strong> tracks individual contributions and drives personal rank progression throughout the season.</p>
        <Block title="Ranks & Rewards">
          <ul className={styles.list}>
            <li>Each rank unlocks: <strong>Title</strong> / <strong>Avatar Frame</strong> / <strong>Plaque</strong></li>
            <li>During Settlement Phase: Merit stops increasing, Rank Boosts no longer effective</li>
          </ul>
        </Block>
        <Block title="Merit sources">
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>⚔️ Combat & Progression</div>
            <ul className={styles.list}>
              <li>First kill of a Doom Elite / Rainforest Zombie</li>
              <li>First capture of Fishing Grounds / Cities</li>
            </ul>
          </div>
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>🏆 Activities & Rankings</div>
            <ul className={styles.list}>
              <li>Purge Action rankings</li>
              <li>Combat and ranking in Beneath the Ruins</li>
            </ul>
          </div>
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>💥 Faction Clash</div>
            <ul className={styles.list}>
              <li>Reinforcing Cities on the map</li>
              <li>Participating in enemy City Destruction</li>
              <li>Kill rankings in Faction Clash</li>
              <li>Cooperative Defense rankings in Faction Clash</li>
            </ul>
          </div>
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>🤝 Contribution & Construction</div>
            <ul className={styles.list}>
              <li>Donating catches to Alliance Skills</li>
              <li>Hourly generation via controlled cities</li>
            </ul>
          </div>
        </Block>
      </>
    ),
  },

  {
    id: 'ruins',
    icon: '🏚',
    title: { fr: 'Sous les Ruines', en: 'Beneath the Ruins' },
    content: (lang) => lang === 'fr' ? (
      <>
        <ImgRow images={[
          { src: `${BASE}/2026-04/image-106.png`, alt: 'Beneath the Ruins événement', caption: 'Page de l\'événement' },
          { src: `${BASE}/2026-04/image-107.png`, alt: 'Beneath the Ruins gameplay', caption: 'Aperçu du gameplay' },
        ]} />
        <p className={styles.lead}>Mini-jeu de plateforme disponible 55 jours, avec 48 jours de durée active.</p>
        <Block title="Mécaniques">
          <ul className={styles.list}>
            <li>Jeu de plateforme avec gestion de la santé et des chutes</li>
            <li>La santé se régénère lentement quand aucun dégât n'est subi</li>
            <li>Les victoires rapportent des <strong>War Merits</strong></li>
            <li>Classement quotidien — seul le dernier passage du jour compte</li>
            <li>Difficulté variable selon les niveaux</li>
          </ul>
        </Block>
        <Block title="Mode Duel (Semaine 2)">
          <ul className={styles.list}>
            <li>Pas de soin en mode Duel</li>
            <li>Les chutes infligent des dégâts au lieu de tuer</li>
          </ul>
        </Block>
        <Block title="Donations collectives & classement">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-103.png`, alt: 'Classement donations', caption: 'Classement donations' },
            { src: `${BASE}/2026-04/image-104.png`, alt: 'Récompenses classement', caption: 'Récompenses' },
          ]} />
          <ul className={styles.list}>
            <li>Objectif de zone de guerre : 1 million de pièces collectivement</li>
            <li>Classement basé sur les donations avec récompenses par rang</li>
          </ul>
        </Block>
        <Block title="Compétence de Profession liée">
          <InfoRow label="Nv.80 Ruins Expert (Jour 15)" value="+1 000 dépôt maximum dans le Trésor des Ruines" />
        </Block>
      </>
    ) : (
      <>
        <ImgRow images={[
          { src: `${BASE}/2026-04/image-106.png`, alt: 'Beneath the Ruins event', caption: 'Event page' },
          { src: `${BASE}/2026-04/image-107.png`, alt: 'Beneath the Ruins gameplay', caption: 'Gameplay preview' },
        ]} />
        <p className={styles.lead}>Platformer mini-game available for 55 days, with 48 days of active duration.</p>
        <Block title="Mechanics">
          <ul className={styles.list}>
            <li>Platformer with health and fall mechanics</li>
            <li>Health recovers slowly when no damage is taken</li>
            <li>Victories earn <strong>War Merits</strong></li>
            <li>Daily rankings — only the most recent daily completion counts</li>
            <li>Variable difficulty levels</li>
          </ul>
        </Block>
        <Block title="Duel Mode (Week 2)">
          <ul className={styles.list}>
            <li>No healing in Duel mode</li>
            <li>Falling damages instead of killing</li>
          </ul>
        </Block>
        <Block title="Collective donations & rankings">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-103.png`, alt: 'Donation ranking', caption: 'Donation ranking' },
            { src: `${BASE}/2026-04/image-104.png`, alt: 'Ranking rewards', caption: 'Rewards' },
          ]} />
          <ul className={styles.list}>
            <li>Warzone goal: 1 million coins collectively</li>
            <li>Donation-based ranking with tiered rewards</li>
          </ul>
        </Block>
        <Block title="Linked Profession skill">
          <InfoRow label="Lv.80 Ruins Expert (Day 15)" value="+1,000 max deposit in Ruins Treasure" />
        </Block>
      </>
    ),
  },

  {
    id: 'heroes',
    icon: '🦸',
    title: { fr: 'Héros — Nouveautés S6', en: 'Heroes — S6 Updates' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Block title="🔴 Système d'Éveil — Vue d'ensemble">
          <Img src={`${WIKI}/1776130046114-0kx64nljvon9.jpg`} alt="Présentation de l'Éveil des Héros" caption="Nouveau palier : l'Éveil" />
          <p className={styles.lead}>L'Éveil est un <strong>nouveau palier de progression</strong> au-delà des 5 étoiles classiques, disponible à partir de la S6.</p>
          <InfoRow label="Héros par saison" value="~3 héros avec Éveil disponible" />
          <InfoRow label="Calendrier d'apparition" value="Semaine 1, Semaine 3, Semaine 5" />
          <InfoRow label="Prérequis" value="Arme Exclusive niveau ≥ 20 + accès Saison 6" />
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>Ce qui change après l'Éveil</div>
            <Img src={`${WIKI}/1776130177812-8lnkc9gl9ly.jpg`} alt="Compétences et attributs après Éveil" caption="Nouvelles compétences et attributs" />
            <ul className={styles.list}>
              <li>⭐ <strong>Étoiles rouges</strong> : nouveau tier de progression au-delà des étoiles normales</li>
              <li>📈 <strong>Bonus d'attributs de base</strong> supplémentaires</li>
              <li>🔮 <strong>Compétence d'Éveil (4ème compétence)</strong> débloquée — puissante et unique</li>
              <li>🎨 <strong>Nouveau look</strong> : avatar, illustrations et effets dynamiques</li>
            </ul>
          </div>
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>Comment obtenir les Fragments d'Éveil</div>
            <Img src={`${WIKI}/1776130378617-l9rvycd4rb.jpg`} alt="Source des fragments d'Éveil" caption="Tour du Monde — source principale" />
            <ul className={styles.list}>
              <li>Fragments <strong>exclusifs</strong> du héros via Battle Pass et Hero Trial</li>
              <li>Fragments <strong>universels</strong> via l'Expédition Mondiale (sem.2→7, 3 périodes de 14j)</li>
            </ul>
          </div>
        </Block>
        <Block title="🌟 Éveil de Kimberly (Awakening)">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-163.png`, alt: 'Kimberly Awakening apparence', caption: 'Nouvelle apparence' },
            { src: `${BASE}/2026-04/image-164.png`, alt: 'Kimberly Awakening skill', caption: 'Compétence d\'Éveil exclusive' },
          ]} />
          <InfoRow label="Durée du Battle Pass" value="7 jours (à partir du Jour 4 de la Semaine 1)" />
          <InfoRow label="Prérequis" value="Arme Exclusive niveau ≥ 20 + accès Saison 6" />
          <InfoRow label="Fragments disponibles (exclusifs)" value="70 fragments Kimberly" />
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>Contenu du Battle Pass Éveil</div>
            <Img src={`${BASE}/2026-04/image-158.png`} alt="Contenu Battle Pass Kimberly" caption="Contenu du Battle Pass" />
            <ul className={styles.list}>
              <li>30 Fragments d'Éveil de Kimberly</li>
              <li>1 Coffre Épique Alliance</li>
              <li>4 Coffres Chance de Médailles de Compétence</li>
              <li>4 Coffres de Ressources Légendaires au Choix</li>
              <li>16 Coffres de Ressources Épiques au Choix</li>
              <li>7 000 Médailles de Compétence</li>
            </ul>
          </div>
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>Accès gratuit (Hero Trial)</div>
            <Img src={`${BASE}/2026-04/image-167.png`} alt="Hero Trial Kimberly" caption="Hero Trial — accès gratuit" />
            <Table
              headers={['Niveaux', 'Débloquage', 'Récompense']}
              rows={[
                ['1–3', 'Jour 4 Semaine 1', '1 fragment chacun'],
                ['4–6', 'Jour 4 Semaine 2', '1 fragment chacun'],
                ['7–10', 'Jour 4 Semaine 3', '1 fragment chacun'],
              ]}
            />
          </div>
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>Global Expedition (Semaine 2)</div>
            <ImgRow images={[
              { src: `${BASE}/2026-04/image-169.png`, alt: 'Global Expedition', caption: 'Global Expedition' },
              { src: `${BASE}/2026-04/image-170.png`, alt: 'Détails Global Expedition', caption: 'Détails' },
            ]} />
          </div>
        </Block>
        <Block title="⬆️ Braz — Passage SSR → UR">
          <Img src={`${BASE}/2026-03/image-47.png`} alt="Braz héros UR" caption="Braz — futur héros UR" />
          <ul className={styles.list}>
            <li>Le héros SSR Braz reçoit une amélioration UR cette saison</li>
            <li>Collecter des fragments violets en pré-saison pour le monter à 5⭐ avant le lancement</li>
            <li>La promotion génère des points Duel VS</li>
          </ul>
          <Tip>Basculer vers la profession Ingénieur en début de saison pour profiter des bonus de vitesse/coût, puis repasser War Leader quand les guerres commencent.</Tip>
        </Block>
        <Block title="Recrutement saisonnier">
          <ul className={styles.list}>
            <li>Événement «&nbsp;S6: Legend Returns&nbsp;» — recrutement via tickets</li>
            <li>Invoquer tous les héros saisonniers dès le Jour 1</li>
            <li>Les bonus liés aux héros se cachent au début de saison et réapparaissent avec l'événement correspondant</li>
          </ul>
        </Block>
      </>
    ) : (
      <>
        <Block title="🔴 Awakening System — Overview">
          <Img src={`${WIKI}/1776130046114-0kx64nljvon9.jpg`} alt="Hero Awakening presentation" caption="New tier: Awakening" />
          <p className={styles.lead}>Awakening is a <strong>new progression tier</strong> beyond the classic 5 stars, available from S6 onwards.</p>
          <InfoRow label="Heroes per season" value="~3 heroes with Awakening available" />
          <InfoRow label="Unlock schedule" value="Week 1, Week 3, Week 5" />
          <InfoRow label="Requirements" value="Exclusive Weapon level ≥ 20 + Season 6 access" />
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>What changes after Awakening</div>
            <Img src={`${WIKI}/1776130177812-8lnkc9gl9ly.jpg`} alt="Skills and attributes after Awakening" caption="New skills and attributes" />
            <ul className={styles.list}>
              <li>⭐ <strong>Red stars</strong>: new progression tier beyond normal stars</li>
              <li>📈 Additional <strong>base attribute bonuses</strong></li>
              <li>🔮 <strong>Awakening Skill (4th skill)</strong> unlocked — powerful and unique</li>
              <li>🎨 <strong>New look</strong>: avatar, artwork and dynamic effects</li>
            </ul>
          </div>
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>How to get Awakening Shards</div>
            <Img src={`${WIKI}/1776130378617-l9rvycd4rb.jpg`} alt="Awakening shard sources" caption="Global Expedition — main source" />
            <ul className={styles.list}>
              <li>Hero-<strong>exclusive</strong> shards via Battle Pass and Hero Trial</li>
              <li><strong>Universal</strong> shards via Global Expedition (wk 2→7, 3 periods of 14d)</li>
            </ul>
          </div>
        </Block>
        <Block title="🌟 Kimberly's Awakening">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-163.png`, alt: "Kimberly Awakening appearance", caption: 'New appearance' },
            { src: `${BASE}/2026-04/image-164.png`, alt: 'Kimberly Awakening skill', caption: 'Exclusive Awakened Skill' },
          ]} />
          <InfoRow label="Battle Pass duration" value="7 days (from Day 4 of Week 1)" />
          <InfoRow label="Requirements" value="Exclusive Weapon level ≥ 20 + Season 6 access" />
          <InfoRow label="Exclusive shards available" value="70 Kimberly shards" />
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>Awakening Battle Pass contents</div>
            <Img src={`${BASE}/2026-04/image-158.png`} alt="Kimberly Battle Pass contents" caption="Battle Pass contents" />
            <ul className={styles.list}>
              <li>30 Kimberly Awakening Shards</li>
              <li>1 Epic Chest Alliance</li>
              <li>4 Skill Medal Lucky Chests</li>
              <li>4 Legendary Resource Choice Chests</li>
              <li>16 Epic Resource Choice Chests</li>
              <li>7,000 Skill Medals</li>
            </ul>
          </div>
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>Free access (Hero Trial)</div>
            <Img src={`${BASE}/2026-04/image-167.png`} alt="Hero Trial Kimberly" caption="Hero Trial — free access" />
            <Table
              headers={['Levels', 'Unlock', 'Reward']}
              rows={[
                ['1–3', 'Day 4 Week 1', '1 shard each'],
                ['4–6', 'Day 4 Week 2', '1 shard each'],
                ['7–10', 'Day 4 Week 3', '1 shard each'],
              ]}
            />
          </div>
          <div className={styles.subBlock}>
            <div className={styles.subBlockTitle}>Global Expedition (Week 2)</div>
            <ImgRow images={[
              { src: `${BASE}/2026-04/image-169.png`, alt: 'Global Expedition', caption: 'Global Expedition' },
              { src: `${BASE}/2026-04/image-170.png`, alt: 'Global Expedition details', caption: 'Details' },
            ]} />
          </div>
        </Block>
        <Block title="⬆️ Braz — SSR → UR Upgrade">
          <Img src={`${BASE}/2026-03/image-47.png`} alt="Braz UR hero" caption="Braz — future UR hero" />
          <ul className={styles.list}>
            <li>SSR hero Braz receives a UR upgrade this season</li>
            <li>Collect purple shards during pre-season to promote to 5⭐ before launch</li>
            <li>Promotion generates Duel VS points</li>
          </ul>
          <Tip>Switch to Engineer profession at season start for speed/cost bonuses, then switch back to War Leader when wars begin.</Tip>
        </Block>
        <Block title="Seasonal recruitment">
          <ul className={styles.list}>
            <li>"S6: Legend Returns" event — recruitment via tickets</li>
            <li>Summon all seasonal heroes on Day 1</li>
            <li>Hero-related boosts hide at season start and reappear with respective hero events</li>
          </ul>
        </Block>
      </>
    ),
  },

  {
    id: 'expedition',
    icon: '🌍',
    title: { fr: 'Expédition Mondiale', en: 'Global Expedition' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Img src={`${WIKI}/1776665649259-308ix5o36hj.jpg`} alt="Entrée de l'Expédition Mondiale" caption="Accès via le Tour d'Alerte" />
        <p className={styles.lead}>Nouveau mode disponible à partir de la <strong>Semaine 2 de la S6</strong>, accessible via le <strong>Tour d'Alerte</strong>. Récompense principale : les <strong>Fragments d'Éveil</strong>.</p>
        <Block title="Structure">
          <Img src={`${WIKI}/1776665677758-vliuqr8h61e.png`} alt="Gameplay Expédition Mondiale" caption="Progression par étapes" />
          <InfoRow label="Périodes" value="3 périodes de 14 jours chacune" />
          <InfoRow label="Zones par période" value="4 zones indépendantes à traverser" />
          <InfoRow label="Puissance minimum (Nv.1)" value="33 000 000" />
          <ul className={styles.list}>
            <li>Déployez votre équipe principale et progressez sur les Étapes</li>
            <li>Chaque zone doit être traversée pour accéder à la suivante</li>
            <li>Maximisez les Points pour obtenir le maximum de récompenses</li>
          </ul>
          <Warn>Le niveau 1 de l'Expédition Mondiale requiert 33 millions de puissance minimum.</Warn>
        </Block>
        <Block title="Récompenses (Points Totaux)">
          <Table
            headers={['Récompense', 'Quantité']}
            rows={[
              ["Fragment d'Éveil Exclusif Tesla", '×30'],
              ["Fragment d'Éveil Universel", '×60'],
            ]}
          />
          <Tip>Les Fragments universels peuvent être utilisés sur n'importe quel héros éveillé — à utiliser stratégiquement.</Tip>
        </Block>
      </>
    ) : (
      <>
        <Img src={`${WIKI}/1776665649259-308ix5o36hj.jpg`} alt="Global Expedition entry" caption="Access via Alert Tower" />
        <p className={styles.lead}>New mode available from <strong>Week 2 of S6</strong>, accessed via the <strong>Alert Tower</strong>. Main reward: <strong>Awakening Shards</strong>.</p>
        <Block title="Structure">
          <Img src={`${WIKI}/1776665677758-vliuqr8h61e.png`} alt="Global Expedition gameplay" caption="Stage progression" />
          <InfoRow label="Periods" value="3 periods of 14 days each" />
          <InfoRow label="Zones per period" value="4 independent zones to traverse" />
          <InfoRow label="Minimum power (Lv.1)" value="33,000,000" />
          <ul className={styles.list}>
            <li>Deploy your main team and progress through Stages</li>
            <li>Each zone must be cleared to access the next</li>
            <li>Maximize Points for maximum rewards</li>
          </ul>
          <Warn>Global Expedition level 1 requires 33 million power minimum.</Warn>
        </Block>
        <Block title="Rewards (Total Points)">
          <Table
            headers={['Reward', 'Amount']}
            rows={[
              ['Tesla Exclusive Awakening Shard', '×30'],
              ['Universal Awakening Shard', '×60'],
            ]}
          />
          <Tip>Universal shards can be used on any awakened hero — use them strategically.</Tip>
        </Block>
      </>
    ),
  },

  {
    id: 'calendar',
    icon: '📅',
    title: { fr: 'Calendrier Complet S6', en: 'Full S6 Calendar' },
    content: (lang) => lang === 'fr' ? (
      <>
        <ImgRow images={[
          { src: `${BASE}/2026-04/image-13.png`, alt: 'Missions Fungus Secrets & Beneath the Ruins', caption: 'Tuiles J1–J2' },
          { src: `${BASE}/2026-04/image-2.png`, alt: 'Missions pêche', caption: 'Fishing Grounds & Fest' },
          { src: `${BASE}/2026-04/image-3.png`, alt: 'City Ready for War', caption: 'City Ready for War' },
        ]} />
        <Table
          headers={['Jour', 'Événements lancés']}
          rows={[
            ['J1', 'Fungus Secrets, Purge Action (9j), Fishing Ground Conquest (14j)'],
            ['J2', 'Beneath the Ruins (48j), capture Fishing Grounds, Fishing Fest'],
            ['J3', 'Level 1 City Ready for War (+12h) — City Clash S6 Nv.1 débloqué'],
            ['J4', 'Kimberly\'s Awakening Battle Pass (7j)'],
            ['J6', 'Level 2 City Ready for War (+12h) — City Clash S6 Nv.2 débloqué'],
          ]}
        />
        <Block title="City Clash S6">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-141.png`, alt: 'City Clash Nv.1', caption: 'City Clash Nv.1' },
            { src: `${BASE}/2026-04/image-142.png`, alt: 'City Clash Nv.2', caption: 'City Clash Nv.2' },
            { src: `${BASE}/2026-04/image-146.png`, alt: 'City Clash Nv.3', caption: 'City Clash Nv.3' },
          ]} />
          <InfoRow label="Niveau 1" value="Jour 3 + 12h" />
          <InfoRow label="Niveau 2" value="Jour 6 + 12h" />
          <InfoRow label="Niveau 3" value="Semaine 2, Jour 3 + 12h" />
          <ul className={styles.list}>
            <li>Seuls R4/R5 peuvent déclarer la guerre</li>
            <li>Une seule ville ciblée simultanément par alliance</li>
            <li>Prérequis : contrôler un Terrain de Pêche adjacent</li>
            <li>Les membres gagnent des bonus permanents après capture</li>
          </ul>
        </Block>
        <Block title="Purge Action">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-19.png`, alt: 'Purge Action tuile', caption: 'Événement' },
            { src: `${BASE}/2026-04/image-20.png`, alt: 'Purge Action page', caption: 'Page principale' },
            { src: `${BASE}/2026-04/image-21.png`, alt: 'Élimination zombie', caption: 'Élimination de zombie' },
          ]} />
          <InfoRow label="Durée" value="9 jours" />
          <InfoRow label="Classement" value="Niveau le plus haut de zombie tué (secondaire : vitesse)" />
          <InfoRow label="Niveaux de zombies" value="Jusqu'à 50" />
          <ul className={styles.list}>
            <li>Jalons de récompenses : 5 / 10 / 15 / 20 / 25 / 30 / 40 / 50 zombies tués</li>
            <li>Classement réinitialisé quotidiennement (récompenses par mail)</li>
          </ul>
        </Block>
        <Block title="Rainforest's Wrath / Fureur de la Jungle">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-112.png`, alt: 'Rainforest Wrath', caption: 'Événement' },
            { src: `${BASE}/2026-04/image-115.png`, alt: 'Devouring Flower déclenchée', caption: 'Devouring Flower' },
            { src: `${BASE}/2026-04/image-128.png`, alt: 'Apparence Devouring Flower', caption: 'Apparence sur la carte' },
          ]} />
          <ul className={styles.list}>
            <li>Éliminer des Élites Mutantes → accumuler de la Fureur → déclencher la <strong>Flamme Combative</strong></li>
            <li>Système similaire aux Sandworms S3</li>
            <li>Les récompenses tombent sur la carte à la mort de la créature</li>
            <li>Rangs : Support Leader, Support Officer, Support Vanguard</li>
          </ul>
        </Block>
        <Block title="Calendrier complet — Semaines 1 à 8">
          <Img src={`${WIKI}/1776998048181-ifei08pf26.jpg`} alt="Calendrier officiel des événements S6" caption="Calendrier officiel S6" />
          <Table
            headers={['Événement', 'Description', 'Semaines']}
            rows={[
              ['Action de Purge', 'Tuer zombies, classement élimination', '1–8'],
              ['Guerre Forteresse Pêcherie', 'Terrains de Pêche à capturer', '1–8'],
              ['Fureur de la Jungle', 'Élites Mutantes → Fureur → Flamme Combative', '1–8'],
              ['Compétition de Pêche', 'Classement pêche individuel et faction', '1–8'],
              ['Clash de Villes S6', "Pts d'Influence via captures, classement Saison", '1–8'],
              ['Boutique du Mérite', 'Mérites → récompenses, renouvelée chaque semaine', '1–8'],
              ['Sous les Ruines', 'Progression par étages en chute continue', '1–8'],
              ['Conflit de Faction', 'Alliances alliées avancent ensemble', '1–8'],
              ["Capturer l'Avant-Poste", 'Bataille offensive/défensive des avant-postes', '1–8'],
              ['Promotion de Héros', 'SSR Braz → 5⭐ → promotion UR', '1–8'],
              ['Concours du Sanctuaire', 'Ouverture Sanctuaire — dimanche Semaine 2', 'Sem. 2'],
              ["Guerre Terres Rares de l'Autel", 'Conquête Autel chaque mardi dès Sem. 3', 'Sem. 3–8'],
              ['Poste de Commerce', 'Niveaux 1–4 ouverts toutes les 2 semaines', 'Alternées'],
              ['Duel du Sanctuaire', 'Conquête Sanctuaire ennemi — samedis Sem. 5, 6, 7', 'Sem. 5–7'],
              ['Duel de Factions', 'Grande bataille finale entre les deux factions', 'Sem. 8'],
              ['Conclusion de la Saison', "Récompenses selon classement Pts d'Influence", 'Fin'],
            ]}
          />
        </Block>
        <Block title="Concours du Sanctuaire (Semaine 2)">
          <ul className={styles.list}>
            <li>Ouverture le <strong>dimanche de la Semaine 2</strong></li>
            <li>Accès au Sanctuaire de faction</li>
          </ul>
        </Block>
        <Block title="Duel du Sanctuaire (Semaines 5–7)">
          <ul className={styles.list}>
            <li>Chaque <strong>samedi des Semaines 5, 6 et 7</strong></li>
            <li>Conquête du Sanctuaire ennemi</li>
          </ul>
        </Block>
        <Block title="Duel de Factions (Semaine 8 — Finale)">
          <ul className={styles.list}>
            <li>Grande bataille finale entre les deux factions</li>
            <li>Le classement final détermine les récompenses de <strong>Conclusion de Saison</strong></li>
            <li>Récompenses distribuées selon le classement des Points d'Influence d'Alliance</li>
          </ul>
        </Block>
      </>
    ) : (
      <>
        <ImgRow images={[
          { src: `${BASE}/2026-04/image-13.png`, alt: 'Fungus Secrets & Beneath the Ruins missions', caption: 'D1–D2 tiles' },
          { src: `${BASE}/2026-04/image-2.png`, alt: 'Fishing missions', caption: 'Fishing Grounds & Fest' },
          { src: `${BASE}/2026-04/image-3.png`, alt: 'City Ready for War', caption: 'City Ready for War' },
        ]} />
        <Table
          headers={['Day', 'Events launched']}
          rows={[
            ['D1', 'Fungus Secrets, Purge Action (9d), Fishing Ground Conquest (14d)'],
            ['D2', 'Beneath the Ruins (48d), capture Fishing Grounds, Fishing Fest'],
            ['D3', 'Level 1 City Ready for War (+12h) — City Clash S6 Lv.1 unlocked'],
            ['D4', "Kimberly's Awakening Battle Pass (7d)"],
            ['D6', 'Level 2 City Ready for War (+12h) — City Clash S6 Lv.2 unlocked'],
          ]}
        />
        <Block title="City Clash S6">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-141.png`, alt: 'City Clash Lv.1', caption: 'City Clash Lv.1' },
            { src: `${BASE}/2026-04/image-142.png`, alt: 'City Clash Lv.2', caption: 'City Clash Lv.2' },
            { src: `${BASE}/2026-04/image-146.png`, alt: 'City Clash Lv.3', caption: 'City Clash Lv.3' },
          ]} />
          <InfoRow label="Level 1" value="Day 3 + 12h" />
          <InfoRow label="Level 2" value="Day 6 + 12h" />
          <InfoRow label="Level 3" value="Week 2, Day 3 + 12h" />
          <ul className={styles.list}>
            <li>Only R4/R5 can declare war</li>
            <li>One city targeted simultaneously per alliance</li>
            <li>Prerequisite: control an adjacent Fishing Ground</li>
            <li>Members gain permanent buffs after capture</li>
          </ul>
        </Block>
        <Block title="Purge Action">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-19.png`, alt: 'Purge Action tile', caption: 'Event' },
            { src: `${BASE}/2026-04/image-20.png`, alt: 'Purge Action page', caption: 'Main page' },
            { src: `${BASE}/2026-04/image-21.png`, alt: 'Zombie kill', caption: 'Zombie kill' },
          ]} />
          <InfoRow label="Duration" value="9 days" />
          <InfoRow label="Ranking" value="Highest zombie level killed (secondary: speed)" />
          <InfoRow label="Zombie levels" value="Up to 50" />
          <ul className={styles.list}>
            <li>Reward milestones: 5 / 10 / 15 / 20 / 25 / 30 / 40 / 50 zombies killed</li>
            <li>Rankings reset daily (rewards sent by mail)</li>
          </ul>
        </Block>
        <Block title="Jungle Fury (Rainforest's Wrath)">
          <ImgRow images={[
            { src: `${BASE}/2026-04/image-112.png`, alt: "Rainforest's Wrath", caption: 'Event' },
            { src: `${BASE}/2026-04/image-115.png`, alt: 'Devouring Flower triggered', caption: 'Devouring Flower' },
            { src: `${BASE}/2026-04/image-128.png`, alt: 'Devouring Flower appearance', caption: 'Map appearance' },
          ]} />
          <ul className={styles.list}>
            <li>Eliminate Mutant Elites → accumulate Fury → trigger <strong>Combat Flame</strong></li>
            <li>Similar trigger system to S3 Sandworms</li>
            <li>Rewards drop on the map upon creature defeat</li>
            <li>Ranks: Support Leader, Support Officer, Support Vanguard</li>
          </ul>
        </Block>
        <Block title="Full Calendar — Weeks 1 to 8">
          <Img src={`${WIKI}/1776998048181-ifei08pf26.jpg`} alt="Official S6 event calendar" caption="Official S6 calendar" />
          <Table
            headers={['Event', 'Description', 'Weeks']}
            rows={[
              ['Purge Action', 'Kill zombies, elimination ranking', '1–8'],
              ['Fishing Fortress War', 'Fishing Grounds to capture', '1–8'],
              ['Jungle Fury', 'Mutant Elites → Fury → Combat Flame', '1–8'],
              ['Fishing Competition', 'Individual and faction fishing ranking', '1–8'],
              ['City Clash S6', 'Influence Points via city captures', '1–8'],
              ['Merit Shop', 'War Merit → rewards, refreshed weekly', '1–8'],
              ['Beneath the Ruins', 'Continuous falling stage progression', '1–8'],
              ['Faction Conflict', 'Allied alliances advance together', '1–8'],
              ['Outpost Capture', 'Offensive/defensive outpost battles', '1–8'],
              ['Hero Promotion', 'SSR Braz → 5⭐ → UR promotion', '1–8'],
              ['Sanctuary Contest', 'Sanctuary opens — Sunday of Week 2', 'Wk. 2'],
              ['Altar Rare Resource War', 'Altar conquest every Tuesday from Wk. 3', 'Wk. 3–8'],
              ['Trading Post', 'Levels 1–4 open every 2 weeks', 'Alternating'],
              ['Sanctuary Duel', 'Enemy Sanctuary conquest — Saturdays Wk. 5, 6, 7', 'Wk. 5–7'],
              ['Faction Duel', 'Grand final battle between both factions', 'Wk. 8'],
              ['Season End', 'Rewards by Alliance Influence Point ranking', 'End'],
            ]}
          />
        </Block>
        <Block title="Sanctuary Contest (Week 2)">
          <ul className={styles.list}>
            <li>Opens <strong>Sunday of Week 2</strong></li>
            <li>Access to your faction's Sanctuary</li>
          </ul>
        </Block>
        <Block title="Sanctuary Duel (Weeks 5–7)">
          <ul className={styles.list}>
            <li>Every <strong>Saturday of Weeks 5, 6 and 7</strong></li>
            <li>Conquest of the enemy faction's Sanctuary</li>
          </ul>
        </Block>
        <Block title="Faction Duel (Week 8 — Grand Finale)">
          <ul className={styles.list}>
            <li>Grand final battle between both factions</li>
            <li>Final ranking determines <strong>Season End</strong> rewards</li>
            <li>Rewards distributed by Alliance Influence Point ranking</li>
          </ul>
        </Block>
      </>
    ),
  },

  {
    id: 'strategy',
    icon: '🧠',
    title: { fr: 'Stratégies & Priorités', en: 'Strategy & Priorities' },
    content: (lang) => lang === 'fr' ? (
      <>
        <Block title="Actions Jour 1 — Liste de démarrage">
          <ul className={styles.list}>
            <li>Acheter le <strong>Battle Pass saisonnier</strong> et le <strong>Weekly Pass</strong> immédiatement</li>
            <li>Acheter les <strong>packs de Rainforest Mushrooms</strong> (disponibles 5 premiers jours seulement)</li>
            <li>Construire le <strong>Fungi Institute</strong> et la <strong>Mushroom Seed Factory</strong></li>
            <li>Monter la Mushroom Factory au niveau 4 → réparer le <strong>War Merit Shop</strong></li>
            <li>Récupérer les cadeaux aux portes NPC</li>
            <li>Invoquer immédiatement tous les héros saisonniers</li>
            <li>Tuer un Doom Walker (niveau 100 → 200k Rainforest Mushrooms)</li>
            <li>Vaincre le Doom Envoy et les Poison Swamp Zombies pour les récompenses de ressources</li>
          </ul>
        </Block>
        <Block title="Battle Pass — Timing critique">
          <ImgRow images={[
            { src: `${BASE}/2026-03/image-125.png`, alt: 'Battle Pass saisonnier', caption: 'Season Battle Pass' },
            { src: `${BASE}/2026-03/image-126.png`, alt: 'Weekly Pass', caption: 'Weekly Pass' },
          ]} />
          <ul className={styles.list}>
            <li><Tag color="danger">Acheter le Jour 1</Tag> pour maximiser les doubles récompenses des tâches quotidiennes</li>
            <li>Advanced (≈11.99€) : double les récompenses des tâches quotidiennes</li>
            <li>Luxury (≈23.99€) : récompenses supplémentaires</li>
            <li>Weekly Pass (7j, indisponible semaine 8) : usine supplémentaire + 250 résistance aux virus + 30% vitesse de marche vs zombies + 20k Champignons/jour</li>
          </ul>
        </Block>
        <Block title="Priorités compétences Ingénieur">
          <ul className={styles.list}>
            <li>Maxer l'arbre vert de bas en haut</li>
            <li>Passer le Rainforest Charm, curses, Enemy Territory Assault en début de saison</li>
            <li>Compétences Architecte en priorité (économie matériaux/temps)</li>
            <li>Réserver 1 point pour le <strong>Jour 15 : Relic Expert</strong></li>
          </ul>
        </Block>
        <Block title="Optimisation Spore Factory">
          <ul className={styles.list}>
            <li>Monter chaque usine à 15 successivement (débloque les suivantes)</li>
            <li>Ensuite égaliser : toutes à 16, toutes à 17, etc.</li>
            <li>Maximise la production de Spores au fil du temps</li>
          </ul>
        </Block>
        <Block title="Boutique Saisonnière">
          <Img src={`${BASE}/2026-03/image-32.png`} alt="Boutique Saisonnière" caption="Boutique Saisonnière" />
          <Warn>La Boutique Saisonnière ne ferme jamais et se réinitialise chaque saison. Acheter tous les Mythic Gear Blueprints avant les nouvelles saisons. Ne pas acheter en urgence.</Warn>
        </Block>
      </>
    ) : (
      <>
        <Block title="Day 1 Actions — Launch checklist">
          <ul className={styles.list}>
            <li>Buy the <strong>Season Battle Pass</strong> and <strong>Weekly Pass</strong> immediately</li>
            <li>Buy <strong>Rainforest Mushroom packs</strong> (available first 5 days only)</li>
            <li>Build the <strong>Fungi Institute</strong> and <strong>Mushroom Seed Factory</strong></li>
            <li>Upgrade Mushroom Factory to level 4 → repair the <strong>War Merit Shop</strong></li>
            <li>Claim NPC gate gifts</li>
            <li>Summon all seasonal heroes immediately</li>
            <li>Kill a Doom Walker (level 100 → 200k Rainforest Mushrooms)</li>
            <li>Defeat Doom Envoy and Poison Swamp Zombies for resource rewards</li>
          </ul>
        </Block>
        <Block title="Battle Pass — Critical timing">
          <ImgRow images={[
            { src: `${BASE}/2026-03/image-125.png`, alt: 'Season Battle Pass', caption: 'Season Battle Pass' },
            { src: `${BASE}/2026-03/image-126.png`, alt: 'Weekly Pass', caption: 'Weekly Pass' },
          ]} />
          <ul className={styles.list}>
            <li><Tag color="danger">Buy on Day 1</Tag> to maximize double-reward daily tasks</li>
            <li>Advanced (≈$11.99): doubles daily task rewards</li>
            <li>Luxury (≈$23.99): additional rewards</li>
            <li>Weekly Pass (7d, unavailable week 8): extra factory + 250 virus resistance + 30% march speed vs zombies + 20k Mushrooms/day</li>
          </ul>
        </Block>
        <Block title="Engineer skill priorities">
          <ul className={styles.list}>
            <li>Max the green skill tree bottom-to-top</li>
            <li>Skip Rainforest Charm, curses, Enemy Territory Assault early</li>
            <li>Prioritize Architect skills (material/time savings)</li>
            <li>Reserve 1 point for <strong>Day 15: Relic Expert</strong></li>
          </ul>
        </Block>
        <Block title="Spore Factory optimization">
          <ul className={styles.list}>
            <li>Level each factory to 15 sequentially (unlocks the next ones)</li>
            <li>Then equalize: all to 16, all to 17, etc.</li>
            <li>Maximizes Spore output over time</li>
          </ul>
        </Block>
        <Block title="Season Store">
          <Img src={`${BASE}/2026-03/image-32.png`} alt="Season Store" caption="Season Store" />
          <Warn>The Season Store never closes and resets each season. Buy all Mythic Gear Blueprints before new seasons. Don't rush purchases.</Warn>
        </Block>
      </>
    ),
  },
];

export function Season6() {
  const { state } = useAppContext();
  const lang = state.language as Lang;
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['overview']));

  useEffect(() => {
    function onOpen(e: Event) {
      const id = (e as CustomEvent<string>).detail;
      setOpenSections(prev => new Set([...prev, id]));
      setTimeout(() => {
        document.getElementById(`s6-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
    window.addEventListener('s6-open-section', onOpen);
    return () => window.removeEventListener('s6-open-section', onOpen);
  }, []);

  function toggle(id: string) {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {lang === 'fr' ? 'Saison 6 — Forêt Perdue' : 'Season 6 — Lost Rainforest'}
        </h1>
        <p className={styles.subtitle}>
          {lang === 'fr'
            ? 'Guide de référence complet • Shadow Rainforest • 49 jours'
            : 'Complete reference guide • Shadow Rainforest • 49 days'}
        </p>
      </div>

      <div className={styles.sections}>
        {SECTIONS.map(section => {
          const isOpen = openSections.has(section.id);
          return (
            <div key={section.id} id={`s6-${section.id}`} className={`${styles.section} ${isOpen ? styles.sectionOpen : ''}`}>
              <button className={styles.sectionHeader} onClick={() => toggle(section.id)}>
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
    </div>
  );
}
