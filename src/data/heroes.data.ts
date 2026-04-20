import { HeroDefinition } from '../types/hero.types';

const W = 'https://lastwar.wiki/wp-content/uploads';

export const HEROES: HeroDefinition[] = [
  // ── T1 — Tank ────────────────────────────────────────────────────────────
  {
    id: 'kimberly', name: 'Kimberly', team: 'T1', type: 'Tank', role: 'DPS',
    ewTarget: 30, teamPriority: 5, imageUrl: `${W}/2024/09/kimberly-last-war-survival.webp`,
    skillNames:   { tactics: 'Barrage Strike',     autoAttack: 'Energy Assault',         passive: 'Energy Boost' },
    skillNamesFr: { tactics: 'Frappe Barrage',     autoAttack: 'Assaut Énergétique',      passive: 'Boost Énergétique' },
  },
  {
    id: 'murphy', name: 'Murphy', team: 'T1', type: 'Tank', role: 'Tank défensif',
    ewTarget: 20, teamPriority: 4, imageUrl: `${W}/2024/09/murphy-last-war-survival-game.webp`,
    skillNames:   { tactics: 'Ironclad Barrier',   autoAttack: 'Cannon Fire',             passive: 'Stand Firm' },
    skillNamesFr: { tactics: 'Barrière de Fer',    autoAttack: 'Tir de Canon',            passive: 'Tenir Bon' },
  },
  {
    id: 'stetmann', name: 'Stetmann', team: 'T1', type: 'Tank', role: 'DPS',
    ewTarget: 20, teamPriority: 3, imageUrl: `${W}/2024/09/stetmann-last-war-survival.webp`,
    skillNames:   { tactics: 'Lightning Rush',     autoAttack: 'Orb Lightning',           passive: 'Critical Charge' },
    skillNamesFr: { tactics: 'Ruée Fulminante',    autoAttack: 'Foudre Orbitale',         passive: 'Charge Critique' },
  },
  {
    id: 'marshall', name: 'Marshall', team: 'T1', type: 'Tank', role: 'Support',
    ewTarget: 20, teamPriority: 2, imageUrl: `${W}/2024/11/marshall-last-war-survival.webp`,
    skillNames:   { tactics: 'Command Strategy',   autoAttack: 'Triad Harmony',           passive: 'Rapid Start' },
    skillNamesFr: { tactics: 'Stratégie de Commandement', autoAttack: 'Harmonie Triade',  passive: 'Départ Rapide' },
  },
  {
    id: 'williams', name: 'Williams', team: 'T1', type: 'Tank', role: 'Tank défensif',
    ewTarget: 20, teamPriority: 1, imageUrl: `${W}/2024/09/williams-last-war-survival-game.webp`,
    skillNames:   { tactics: 'Iron Will',          autoAttack: 'Stun Bomb',               passive: 'All-Around Armor' },
    skillNamesFr: { tactics: 'Volonté de Fer',     autoAttack: 'Bombe Étourdissante',     passive: 'Armure Polyvalente' },
  },

  // ── T2 — Aircraft ─────────────────────────────────────────────────────────
  {
    id: 'dva', name: 'DVA', team: 'T2', type: 'Aircraft', role: 'DPS',
    ewTarget: 20, teamPriority: 5, imageUrl: `${W}/2024/09/dva-last-war-survival-game.webp`,
    skillNames:   { tactics: 'Steel Barrage',      autoAttack: 'Vortex Missile',          passive: 'Armament Upgrade' },
    skillNamesFr: { tactics: "Barrage d'Acier",    autoAttack: 'Missile Vortex',          passive: "Amélioration d'Armement" },
  },
  {
    id: 'morrison', name: 'Morrison', team: 'T2', type: 'Aircraft', role: 'DPS',
    ewTarget: 20, teamPriority: 4, imageUrl: `${W}/2024/09/morrison-last-war-survival-game.webp`,
    skillNames:   { tactics: 'Armor-Piercing Shot',    autoAttack: 'Full-Auto Machine Gun', passive: 'Full Firepower' },
    skillNamesFr: { tactics: 'Tir Perforant',          autoAttack: 'Mitrailleuse Automatique', passive: 'Puissance de Feu' },
  },
  {
    id: 'schuyler', name: 'Skyler', team: 'T2', type: 'Aircraft', role: 'DPS',
    ewTarget: 20, teamPriority: 3, imageUrl: `${W}/2024/09/Schuyler-last-war-survival.webp`,
    skillNames:   { tactics: 'Blast Frenzy',       autoAttack: 'Power Barrage',           passive: 'Antimatter Armor' },
    skillNamesFr: { tactics: "Frénésie d'Assaut",  autoAttack: 'Barrage de Puissance',    passive: 'Armure Antimatière' },
  },
  {
    id: 'lucius', name: 'Lucius', team: 'T2', type: 'Aircraft', role: 'Tank défensif',
    ewTarget: 20, teamPriority: 2, imageUrl: `${W}/2024/09/lucius-last-war-survival-gamre.webp`,
    skillNames:   { tactics: "Knight's Spirit",        autoAttack: 'Lightning Triple Strike', passive: 'Silver Armor' },
    skillNamesFr: { tactics: 'Esprit du Chevalier',    autoAttack: 'Triple Frappe Éclair',    passive: "Armure d'Argent" },
  },
  {
    id: 'carlie', name: 'Carlie', team: 'T2', type: 'Aircraft', role: 'Tank défensif',
    ewTarget: 20, teamPriority: 1, imageUrl: `${W}/2024/09/carlie-last-war-survival.webp`,
    skillNames:   { tactics: 'Inferno Blaze',      autoAttack: 'Dual-String Rocket',      passive: 'Energy Adaption' },
    skillNamesFr: { tactics: 'Brasier Infernal',   autoAttack: 'Roquette Double Corde',   passive: 'Adaptation Énergétique' },
  },

  // ── T3 — Missile ──────────────────────────────────────────────────────────
  {
    id: 'tesla', name: 'Tesla', team: 'T3', type: 'Missile', role: 'DPS',
    ewTarget: 20, teamPriority: 5, imageUrl: `${W}/2024/09/tesla-last-war-survival.webp`,
    skillNames:   { tactics: 'Electric Grid Lockdown',  autoAttack: 'Lightning Chain',        passive: 'Electric Power Boost' },
    skillNamesFr: { tactics: 'Verrouillage Électrique', autoAttack: 'Chaîne Éclair',          passive: 'Boost de Puissance Électrique' },
  },
  {
    id: 'fiona', name: 'Fiona', team: 'T3', type: 'Missile', role: 'DPS',
    ewTarget: 20, teamPriority: 4, imageUrl: `${W}/2024/09/fiona-last-war-survival-game.webp`,
    skillNames:   { tactics: 'Atomic Blast',       autoAttack: 'Double Trajectory',       passive: 'Ballistic Boost' },
    skillNamesFr: { tactics: 'Explosion Atomique', autoAttack: 'Double Trajectoire',      passive: 'Boost Balistique' },
  },
  {
    id: 'swift', name: 'Swift', team: 'T3', type: 'Missile', role: 'DPS',
    ewTarget: 20, teamPriority: 3, imageUrl: `${W}/2024/09/swift-last-war-survival-game.webp`,
    skillNames:   { tactics: 'Weakness Targeting',    autoAttack: 'Targeted Strike',        passive: 'Precise Guidance' },
    skillNamesFr: { tactics: 'Ciblage des Faiblesses', autoAttack: 'Frappe Ciblée',         passive: 'Guidage Précis' },
  },
  {
    id: 'adam', name: 'Adam', team: 'T3', type: 'Missile', role: 'Tank défensif',
    ewTarget: 10, teamPriority: 2, imageUrl: `${W}/2024/09/adam-last-war-survival.webp`,
    skillNames:   { tactics: 'Counter Defense',    autoAttack: 'MK43 Machine Gun',        passive: 'Spike Armor' },
    skillNamesFr: { tactics: 'Défense Contrattaque', autoAttack: 'Mitrailleuse MK43',     passive: 'Armure à Pointes' },
  },
  {
    id: 'mcgregor', name: 'McGregor', team: 'T3', type: 'Missile', role: 'Tank défensif',
    ewTarget: 10, teamPriority: 1, imageUrl: `${W}/2024/09/mcgregor-last-war-survival.webp`,
    skillNames:   { tactics: 'Unyielding Heart',   autoAttack: 'Forward Rush',            passive: 'HP Boost' },
    skillNamesFr: { tactics: 'Cœur Inébranlable',  autoAttack: 'Ruée en Avant',           passive: 'Boost de PV' },
  },
];

export const HERO_MAP: Record<string, HeroDefinition> =
  Object.fromEntries(HEROES.map(h => [h.id, h]));

export const HEROES_BY_TEAM: Record<string, HeroDefinition[]> = {
  T1: HEROES.filter(h => h.team === 'T1'),
  T2: HEROES.filter(h => h.team === 'T2'),
  T3: HEROES.filter(h => h.team === 'T3'),
};
