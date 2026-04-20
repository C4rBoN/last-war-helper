import { ResearchTree } from '../types/research.types';

export const RESEARCH_TREES: ResearchTree[] = [
  {
    id: 'development',
    nameKey: 'research.tree.development',
    descriptionKey: 'research.tree.development.desc',
    hqUnlock: 1,
    priorityGroup: 'critical',
    nodes: [
      { id: 'dev_construction_speed', treeId: 'development', nameKey: 'research.dev.construction_speed', hqRequired: 1, prerequisiteIds: [], priorityGroup: 'critical', priorityOrder: 1 },
      { id: 'dev_troop_capacity',     treeId: 'development', nameKey: 'research.dev.troop_capacity',     hqRequired: 1, prerequisiteIds: ['dev_construction_speed'], priorityGroup: 'critical', priorityOrder: 2 },
      { id: 'dev_research_speed',     treeId: 'development', nameKey: 'research.dev.research_speed',     hqRequired: 3, prerequisiteIds: ['dev_construction_speed'], priorityGroup: 'critical', priorityOrder: 3 },
      { id: 'dev_march_speed',        treeId: 'development', nameKey: 'research.dev.march_speed',        hqRequired: 5, prerequisiteIds: ['dev_troop_capacity'], priorityGroup: 'high', priorityOrder: 4 },
      { id: 'dev_gathering_speed',    treeId: 'development', nameKey: 'research.dev.gathering_speed',    hqRequired: 5, prerequisiteIds: ['dev_research_speed'], priorityGroup: 'medium', priorityOrder: 5 },
      { id: 'dev_hospital_capacity',  treeId: 'development', nameKey: 'research.dev.hospital_capacity',  hqRequired: 8, prerequisiteIds: ['dev_march_speed'], priorityGroup: 'medium', priorityOrder: 6 },
    ],
  },
  {
    id: 'economy',
    nameKey: 'research.tree.economy',
    descriptionKey: 'research.tree.economy.desc',
    hqUnlock: 1,
    priorityGroup: 'critical',
    nodes: [
      { id: 'eco_food_production',    treeId: 'economy', nameKey: 'research.eco.food_production',    hqRequired: 1, prerequisiteIds: [], priorityGroup: 'critical', priorityOrder: 1 },
      { id: 'eco_iron_production',    treeId: 'economy', nameKey: 'research.eco.iron_production',    hqRequired: 1, prerequisiteIds: ['eco_food_production'], priorityGroup: 'critical', priorityOrder: 2 },
      { id: 'eco_coin_production',    treeId: 'economy', nameKey: 'research.eco.coin_production',    hqRequired: 2, prerequisiteIds: ['eco_food_production'], priorityGroup: 'critical', priorityOrder: 3 },
      { id: 'eco_storage_boost',      treeId: 'economy', nameKey: 'research.eco.storage_boost',      hqRequired: 4, prerequisiteIds: ['eco_iron_production', 'eco_coin_production'], priorityGroup: 'high', priorityOrder: 4 },
      { id: 'eco_rss_protection',     treeId: 'economy', nameKey: 'research.eco.rss_protection',     hqRequired: 6, prerequisiteIds: ['eco_storage_boost'], priorityGroup: 'medium', priorityOrder: 5 },
      { id: 'eco_speedup_production', treeId: 'economy', nameKey: 'research.eco.speedup_production', hqRequired: 8, prerequisiteIds: ['eco_rss_protection'], priorityGroup: 'medium', priorityOrder: 6 },
    ],
  },
  {
    id: 'alliance_duel',
    nameKey: 'research.tree.alliance_duel',
    descriptionKey: 'research.tree.alliance_duel.desc',
    hqUnlock: 10,
    priorityGroup: 'high',
    nodes: [
      { id: 'vs_troop_atk',       treeId: 'alliance_duel', nameKey: 'research.vs.troop_atk',       hqRequired: 10, prerequisiteIds: [], priorityGroup: 'high', priorityOrder: 1 },
      { id: 'vs_troop_def',       treeId: 'alliance_duel', nameKey: 'research.vs.troop_def',       hqRequired: 10, prerequisiteIds: ['vs_troop_atk'], priorityGroup: 'high', priorityOrder: 2 },
      { id: 'vs_troop_hp',        treeId: 'alliance_duel', nameKey: 'research.vs.troop_hp',        hqRequired: 12, prerequisiteIds: ['vs_troop_def'], priorityGroup: 'high', priorityOrder: 3 },
      { id: 'vs_hero_atk',        treeId: 'alliance_duel', nameKey: 'research.vs.hero_atk',        hqRequired: 12, prerequisiteIds: ['vs_troop_atk'], priorityGroup: 'high', priorityOrder: 4 },
      { id: 'vs_alliance_help',   treeId: 'alliance_duel', nameKey: 'research.vs.alliance_help',   hqRequired: 14, prerequisiteIds: ['vs_troop_hp', 'vs_hero_atk'], priorityGroup: 'medium', priorityOrder: 5 },
    ],
  },
  {
    id: 'units',
    nameKey: 'research.tree.units',
    descriptionKey: 'research.tree.units.desc',
    hqUnlock: 8,
    priorityGroup: 'medium',
    nodes: [
      { id: 'units_tank_atk',     treeId: 'units', nameKey: 'research.units.tank_atk',     hqRequired: 8,  prerequisiteIds: [], priorityGroup: 'high', priorityOrder: 1 },
      { id: 'units_missile_atk',  treeId: 'units', nameKey: 'research.units.missile_atk',  hqRequired: 8,  prerequisiteIds: [], priorityGroup: 'high', priorityOrder: 2 },
      { id: 'units_aircraft_atk', treeId: 'units', nameKey: 'research.units.aircraft_atk', hqRequired: 8,  prerequisiteIds: [], priorityGroup: 'high', priorityOrder: 3 },
      { id: 'units_tank_hp',      treeId: 'units', nameKey: 'research.units.tank_hp',      hqRequired: 10, prerequisiteIds: ['units_tank_atk'], priorityGroup: 'high', priorityOrder: 4 },
      { id: 'units_missile_hp',   treeId: 'units', nameKey: 'research.units.missile_hp',   hqRequired: 10, prerequisiteIds: ['units_missile_atk'], priorityGroup: 'high', priorityOrder: 5 },
      { id: 'units_aircraft_hp',  treeId: 'units', nameKey: 'research.units.aircraft_hp',  hqRequired: 10, prerequisiteIds: ['units_aircraft_atk'], priorityGroup: 'high', priorityOrder: 6 },
      { id: 'units_t5_unlock',    treeId: 'units', nameKey: 'research.units.t5_unlock',    hqRequired: 15, prerequisiteIds: ['units_tank_hp', 'units_missile_hp', 'units_aircraft_hp'], priorityGroup: 'critical', priorityOrder: 7 },
    ],
  },
  {
    id: 'hero',
    nameKey: 'research.tree.hero',
    descriptionKey: 'research.tree.hero.desc',
    hqUnlock: 8,
    priorityGroup: 'medium',
    nodes: [
      { id: 'hero_atk_boost',      treeId: 'hero', nameKey: 'research.hero.atk_boost',      hqRequired: 8,  prerequisiteIds: [], priorityGroup: 'high', priorityOrder: 1 },
      { id: 'hero_hp_boost',       treeId: 'hero', nameKey: 'research.hero.hp_boost',       hqRequired: 8,  prerequisiteIds: ['hero_atk_boost'], priorityGroup: 'high', priorityOrder: 2 },
      { id: 'hero_skill_boost',    treeId: 'hero', nameKey: 'research.hero.skill_boost',    hqRequired: 10, prerequisiteIds: ['hero_hp_boost'], priorityGroup: 'medium', priorityOrder: 3 },
      { id: 'hero_star_bonus',     treeId: 'hero', nameKey: 'research.hero.star_bonus',     hqRequired: 12, prerequisiteIds: ['hero_skill_boost'], priorityGroup: 'low', priorityOrder: 4 },
      { id: 'hero_command',        treeId: 'hero', nameKey: 'research.hero.command',        hqRequired: 15, prerequisiteIds: ['hero_star_bonus'], priorityGroup: 'low', priorityOrder: 5 },
    ],
  },
  {
    id: 'special_forces',
    nameKey: 'research.tree.special_forces',
    descriptionKey: 'research.tree.special_forces.desc',
    hqUnlock: 15,
    priorityGroup: 'high',
    nodes: [
      { id: 'sf_tank_unlock',     treeId: 'special_forces', nameKey: 'research.sf.tank_unlock',     hqRequired: 15, prerequisiteIds: [], priorityGroup: 'high', priorityOrder: 1 },
      { id: 'sf_missile_unlock',  treeId: 'special_forces', nameKey: 'research.sf.missile_unlock',  hqRequired: 15, prerequisiteIds: [], priorityGroup: 'high', priorityOrder: 2 },
      { id: 'sf_aircraft_unlock', treeId: 'special_forces', nameKey: 'research.sf.aircraft_unlock', hqRequired: 15, prerequisiteIds: [], priorityGroup: 'high', priorityOrder: 3 },
      { id: 'sf_tank_t10',        treeId: 'special_forces', nameKey: 'research.sf.tank_t10',        hqRequired: 25, prerequisiteIds: ['sf_tank_unlock'], priorityGroup: 'high', priorityOrder: 4 },
      { id: 'sf_missile_t10',     treeId: 'special_forces', nameKey: 'research.sf.missile_t10',     hqRequired: 25, prerequisiteIds: ['sf_missile_unlock'], priorityGroup: 'high', priorityOrder: 5 },
      { id: 'sf_aircraft_t10',    treeId: 'special_forces', nameKey: 'research.sf.aircraft_t10',    hqRequired: 25, prerequisiteIds: ['sf_aircraft_unlock'], priorityGroup: 'high', priorityOrder: 6 },
    ],
  },
  {
    id: 'intercity_truck',
    nameKey: 'research.tree.intercity_truck',
    descriptionKey: 'research.tree.intercity_truck.desc',
    hqUnlock: 12,
    priorityGroup: 'low',
    nodes: [
      { id: 'truck_speed',        treeId: 'intercity_truck', nameKey: 'research.truck.speed',        hqRequired: 12, prerequisiteIds: [], priorityGroup: 'low', priorityOrder: 1 },
      { id: 'truck_capacity',     treeId: 'intercity_truck', nameKey: 'research.truck.capacity',     hqRequired: 14, prerequisiteIds: ['truck_speed'], priorityGroup: 'low', priorityOrder: 2 },
      { id: 'truck_reward_boost', treeId: 'intercity_truck', nameKey: 'research.truck.reward_boost', hqRequired: 16, prerequisiteIds: ['truck_capacity'], priorityGroup: 'low', priorityOrder: 3 },
    ],
  },
  {
    id: 'garage',
    nameKey: 'research.tree.garage',
    descriptionKey: 'research.tree.garage.desc',
    hqUnlock: 12,
    priorityGroup: 'low',
    nodes: [
      { id: 'garage_tank_atk',     treeId: 'garage', nameKey: 'research.garage.tank_atk',     hqRequired: 12, prerequisiteIds: [], priorityGroup: 'low', priorityOrder: 1 },
      { id: 'garage_missile_atk',  treeId: 'garage', nameKey: 'research.garage.missile_atk',  hqRequired: 12, prerequisiteIds: [], priorityGroup: 'low', priorityOrder: 2 },
      { id: 'garage_aircraft_atk', treeId: 'garage', nameKey: 'research.garage.aircraft_atk', hqRequired: 12, prerequisiteIds: [], priorityGroup: 'low', priorityOrder: 3 },
      { id: 'garage_tank_def',     treeId: 'garage', nameKey: 'research.garage.tank_def',     hqRequired: 15, prerequisiteIds: ['garage_tank_atk'], priorityGroup: 'low', priorityOrder: 4 },
      { id: 'garage_missile_def',  treeId: 'garage', nameKey: 'research.garage.missile_def',  hqRequired: 15, prerequisiteIds: ['garage_missile_atk'], priorityGroup: 'low', priorityOrder: 5 },
      { id: 'garage_aircraft_def', treeId: 'garage', nameKey: 'research.garage.aircraft_def', hqRequired: 15, prerequisiteIds: ['garage_aircraft_atk'], priorityGroup: 'low', priorityOrder: 6 },
    ],
  },
  {
    id: 'age_of_oil',
    nameKey: 'research.tree.age_of_oil',
    descriptionKey: 'research.tree.age_of_oil.desc',
    hqUnlock: 31,
    priorityGroup: 'endgame',
    nodes: [
      { id: 'oil_production',     treeId: 'age_of_oil', nameKey: 'research.oil.production',     hqRequired: 31, prerequisiteIds: [], priorityGroup: 'endgame', priorityOrder: 1 },
      { id: 'oil_troop_boost',    treeId: 'age_of_oil', nameKey: 'research.oil.troop_boost',    hqRequired: 31, prerequisiteIds: ['oil_production'], priorityGroup: 'endgame', priorityOrder: 2 },
      { id: 'oil_elite_troops',   treeId: 'age_of_oil', nameKey: 'research.oil.elite_troops',   hqRequired: 33, prerequisiteIds: ['oil_troop_boost'], priorityGroup: 'endgame', priorityOrder: 3 },
    ],
  },
];

export const RESEARCH_NODE_MAP = Object.fromEntries(
  RESEARCH_TREES.flatMap(t => t.nodes).map(n => [n.id, n])
);

export const RESEARCH_TREE_MAP = Object.fromEntries(
  RESEARCH_TREES.map(t => [t.id, t])
);
