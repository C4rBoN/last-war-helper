// Prérequis obligatoires par niveau de QG cible (source : page Notion Bâtiments)
// 'any_combat_center' = au moins un Centre de Combat (Tank/Avion/Missile) au niveau requis

export interface HQPrereq {
  buildingId: string;
  level: number;
}

export const HQ_PREREQUISITES: Record<number, HQPrereq[]> = {
  2:  [{ buildingId: 'tech_center', level: 1 }],
  3:  [{ buildingId: 'tech_center', level: 2 }, { buildingId: 'barracks', level: 2 }],
  4:  [{ buildingId: 'tech_center', level: 3 }, { buildingId: 'wall', level: 3 }],
  5:  [{ buildingId: 'tech_center', level: 4 }, { buildingId: 'barracks', level: 4 }, { buildingId: 'drill_ground', level: 1 }],
  6:  [{ buildingId: 'tech_center', level: 5 }, { buildingId: 'wall', level: 5 }, { buildingId: 'hospital', level: 1 }],
  7:  [{ buildingId: 'tech_center', level: 6 }, { buildingId: 'barracks', level: 5 }, { buildingId: 'alliance_center', level: 1 }],
  8:  [{ buildingId: 'tech_center', level: 7 }, { buildingId: 'wall', level: 7 }, { buildingId: 'drill_ground', level: 3 }],
  9:  [{ buildingId: 'tech_center', level: 8 }, { buildingId: 'barracks', level: 7 }, { buildingId: 'hospital', level: 5 }],
  10: [{ buildingId: 'tech_center', level: 9 }, { buildingId: 'wall', level: 9 }, { buildingId: 'alliance_center', level: 5 }],
  11: [{ buildingId: 'tech_center', level: 10 }, { buildingId: 'barracks', level: 9 }, { buildingId: 'drill_ground', level: 5 }],
  12: [{ buildingId: 'tech_center', level: 11 }, { buildingId: 'wall', level: 11 }, { buildingId: 'hospital', level: 8 }],
  13: [{ buildingId: 'tech_center', level: 12 }, { buildingId: 'barracks', level: 11 }, { buildingId: 'alliance_center', level: 8 }],
  14: [{ buildingId: 'tech_center', level: 13 }, { buildingId: 'wall', level: 13 }, { buildingId: 'drill_ground', level: 8 }],
  15: [{ buildingId: 'tech_center', level: 14 }, { buildingId: 'barracks', level: 13 }, { buildingId: 'hospital', level: 11 }, { buildingId: 'any_combat_center', level: 10 }],
  16: [{ buildingId: 'tech_center', level: 15 }, { buildingId: 'wall', level: 15 }, { buildingId: 'alliance_center', level: 11 }],
  17: [{ buildingId: 'tech_center', level: 16 }, { buildingId: 'barracks', level: 15 }, { buildingId: 'drill_ground', level: 11 }],
  18: [{ buildingId: 'tech_center', level: 17 }, { buildingId: 'wall', level: 17 }, { buildingId: 'hospital', level: 14 }],
  19: [{ buildingId: 'tech_center', level: 18 }, { buildingId: 'barracks', level: 17 }, { buildingId: 'alliance_center', level: 14 }],
  20: [{ buildingId: 'tech_center', level: 19 }, { buildingId: 'wall', level: 19 }, { buildingId: 'drill_ground', level: 14 }, { buildingId: 'gear_factory', level: 15 }],
  21: [{ buildingId: 'tech_center', level: 20 }, { buildingId: 'barracks', level: 19 }, { buildingId: 'hospital', level: 17 }],
  22: [{ buildingId: 'tech_center', level: 21 }, { buildingId: 'wall', level: 21 }, { buildingId: 'alliance_center', level: 17 }],
  23: [{ buildingId: 'tech_center', level: 22 }, { buildingId: 'barracks', level: 21 }, { buildingId: 'drill_ground', level: 17 }],
  24: [{ buildingId: 'tech_center', level: 23 }, { buildingId: 'wall', level: 23 }, { buildingId: 'hospital', level: 20 }],
  25: [{ buildingId: 'tech_center', level: 24 }, { buildingId: 'barracks', level: 23 }, { buildingId: 'alliance_center', level: 20 }, { buildingId: 'any_combat_center', level: 20 }],
  26: [{ buildingId: 'tech_center', level: 25 }, { buildingId: 'wall', level: 25 }, { buildingId: 'drill_ground', level: 20 }],
  27: [{ buildingId: 'tech_center', level: 26 }, { buildingId: 'barracks', level: 25 }, { buildingId: 'hospital', level: 23 }],
  28: [{ buildingId: 'tech_center', level: 27 }, { buildingId: 'wall', level: 27 }, { buildingId: 'alliance_center', level: 23 }],
  29: [{ buildingId: 'tech_center', level: 28 }, { buildingId: 'barracks', level: 27 }, { buildingId: 'drill_ground', level: 23 }],
  30: [{ buildingId: 'tech_center', level: 29 }, { buildingId: 'wall', level: 29 }, { buildingId: 'hospital', level: 26 }, { buildingId: 'alliance_center', level: 26 }],
  31: [{ buildingId: 'tech_center', level: 30 }, { buildingId: 'barracks', level: 29 }, { buildingId: 'wall', level: 30 }],
  32: [{ buildingId: 'tech_center', level: 31 }, { buildingId: 'wall', level: 31 }, { buildingId: 'hospital', level: 29 }],
  33: [{ buildingId: 'tech_center', level: 32 }, { buildingId: 'barracks', level: 31 }, { buildingId: 'alliance_center', level: 29 }],
  34: [{ buildingId: 'tech_center', level: 33 }, { buildingId: 'wall', level: 33 }, { buildingId: 'drill_ground', level: 29 }],
  35: [{ buildingId: 'tech_center', level: 34 }, { buildingId: 'barracks', level: 33 }, { buildingId: 'hospital', level: 32 }, { buildingId: 'wall', level: 34 }],
};

// Retourne les prérequis manquants pour le prochain niveau de QG.
// Pour 'any_combat_center', retourne les IDs des centres de combat si aucun n'est au niveau requis.
export function getMissingPrereqs(
  hqLevel: number,
  getLevel: (id: string) => number
): Map<string, number> {
  const nextHQ = hqLevel + 1;
  const prereqs = HQ_PREREQUISITES[nextHQ] ?? [];
  const missing = new Map<string, number>();

  for (const prereq of prereqs) {
    if (prereq.buildingId === 'any_combat_center') {
      const maxCombat = Math.max(
        getLevel('tank_center'),
        getLevel('missile_center'),
        getLevel('aircraft_center'),
      );
      if (maxCombat < prereq.level) {
        missing.set('tank_center', prereq.level);
        missing.set('missile_center', prereq.level);
        missing.set('aircraft_center', prereq.level);
      }
    } else if (getLevel(prereq.buildingId) < prereq.level) {
      missing.set(prereq.buildingId, prereq.level);
    }
  }

  return missing;
}
