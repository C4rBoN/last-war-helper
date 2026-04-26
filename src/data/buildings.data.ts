import { BuildingDefinition } from '../types/building.types';

const W = 'https://lastwar.wiki/wp-content/uploads';
const CPT = 'https://cpt-hedge.com/_next/image?url=%2Fimages%2Fbuildings';
const Q = '&w=384&q=75&dpl=dpl_WC2ry3W4w9FBhdRkvJn63x3tg3fz';

// priorityRank : 0 = plus haute priorité (scoring = (maxRank - rank) * 15)
// priorityRank : 0 = plus haute priorité, 12 = plus basse
// Catégories Notion : Critique (0-1) > Prioritaire (2-5) > Important (6-8) > Secondaire (9-11) > Bas (12)
export const BUILDINGS: BuildingDefinition[] = [
  // ── Critiques ──────────────────────────────────────────────────────────────
  { id: 'hq',              nameKey: 'building.hq',              category: 'core',     maxLevel: 35, priorityRank: 0,  hqRequired: 1,  isUnique: true,  imageUrl: `${W}/2024/09/headquaters-last-war-survival.webp` },
  { id: 'tech_center',     nameKey: 'building.tech_center',     category: 'core',     maxLevel: 35, priorityRank: 1,  hqRequired: 1,  isUnique: true,  imageUrl: `${W}/2024/09/tech-centre-last-war-survival.webp` },
  // ── Prioritaires ───────────────────────────────────────────────────────────
  { id: 'barracks',        nameKey: 'building.barracks',        category: 'military', maxLevel: 35, priorityRank: 2,  hqRequired: 1,  isUnique: false, imageUrl: `${W}/2024/09/barracks-last-war-survival.webp` },
  { id: 'drill_ground',    nameKey: 'building.drill_ground',    category: 'military', maxLevel: 35, priorityRank: 3,  hqRequired: 2,  isUnique: true,  imageUrl: `${W}/2024/09/drill-ground-last-war-survival-game.webp` },
  { id: 'hospital',        nameKey: 'building.hospital',        category: 'support',  maxLevel: 35, priorityRank: 4,  hqRequired: 3,  isUnique: false, imageUrl: `${W}/2024/09/hospital-last-war-survival-game.webp` },
  { id: 'wall',            nameKey: 'building.wall',            category: 'defense',  maxLevel: 35, priorityRank: 5,  hqRequired: 1,  isUnique: true,  imageUrl: `${W}/2024/09/wall-last-war-survival-game.webp` },
  // ── Importants ─────────────────────────────────────────────────────────────
  { id: 'alliance_center', nameKey: 'building.alliance_center', category: 'support',  maxLevel: 35, priorityRank: 6,  hqRequired: 6,  isUnique: true,  imageUrl: `${W}/2024/10/alliance-center-last-war-survival.webp` },
  { id: 'tank_center',     nameKey: 'building.tank_center',     category: 'military', maxLevel: 35, priorityRank: 7,  hqRequired: 5,  isUnique: true,  imageUrl: `${W}/2024/09/tank-center-last-war-survival.webp` },
  { id: 'missile_center',  nameKey: 'building.missile_center',  category: 'military', maxLevel: 35, priorityRank: 7,  hqRequired: 5,  isUnique: true,  imageUrl: `${W}/2024/09/missile-center-last-war-survival.webp` },
  { id: 'aircraft_center', nameKey: 'building.aircraft_center', category: 'military', maxLevel: 35, priorityRank: 7,  hqRequired: 5,  isUnique: true,  imageUrl: `${W}/2024/09/aircraft-center-last-war-survival.webp` },
  { id: 'gear_factory',    nameKey: 'building.gear_factory',    category: 'support',  maxLevel: 35, priorityRank: 8,  hqRequired: 9,  isUnique: true,  imageUrl: `${W}/2024/11/gear-factory-last-war-survival.webp` },
  // ── Secondaires ────────────────────────────────────────────────────────────
  { id: 'iron_warehouse',  nameKey: 'building.iron_warehouse',  category: 'core',     maxLevel: 35, priorityRank: 9,  hqRequired: 1,  isUnique: true,  imageUrl: `${CPT}%2Firon-warehouse.png${Q}` },
  { id: 'coin_vault',      nameKey: 'building.coin_vault',      category: 'core',     maxLevel: 35, priorityRank: 9,  hqRequired: 1,  isUnique: true,  imageUrl: `${CPT}%2Fcoin-vault.png${Q}` },
  { id: 'food_warehouse',  nameKey: 'building.food_warehouse',  category: 'core',     maxLevel: 35, priorityRank: 9,  hqRequired: 1,  isUnique: true,  imageUrl: `${CPT}%2Ffood-warehouse.png${Q}` },
  { id: 'gold_mine',       nameKey: 'building.gold_mine',       category: 'economy',  maxLevel: 35, priorityRank: 10, hqRequired: 1,  isUnique: false, imageUrl: `${W}/2024/10/gold-mine-last-war-survival.webp` },
  { id: 'iron_mine',       nameKey: 'building.iron_mine',       category: 'economy',  maxLevel: 35, priorityRank: 10, hqRequired: 1,  isUnique: false, imageUrl: `${W}/2024/10/iron-mine-last-war-survival.webp` },
  { id: 'field',           nameKey: 'building.field',           category: 'economy',  maxLevel: 35, priorityRank: 11, hqRequired: 1,  isUnique: false, imageUrl: `${W}/2024/10/farmland-last-war-survival.webp` },
  // ── Bas de liste ───────────────────────────────────────────────────────────
  { id: 'builders_hut',    nameKey: 'building.builders_hut',    category: 'support',  maxLevel: 35, priorityRank: 12, hqRequired: 3,  isUnique: false, imageUrl: `${W}/2024/10/builders-hut-last-war-survival.webp` },
];

export const BUILDING_MAP: Record<string, BuildingDefinition> =
  Object.fromEntries(BUILDINGS.map(b => [b.id, b]));
