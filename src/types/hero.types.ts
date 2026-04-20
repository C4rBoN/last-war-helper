export type HeroTeam = 'T1' | 'T2' | 'T3';
export type HeroType = 'Tank' | 'Aircraft' | 'Missile';
export type HeroRole = 'DPS' | 'Tank défensif' | 'Support';

/** Niveau d'un slot d'équipement : niv. 0–40, puis 0–5★ une fois au niveau 40. */
export interface GearSlotValue {
  level: number;  // 0–40 (0 = non démarré)
  stars: number;  // 0–5 (actif uniquement quand level === 40)
}

export interface GearLevels {
  canon: GearSlotValue;
  puce:  GearSlotValue;
  armor: GearSlotValue;
  radar: GearSlotValue;
}

export type GearSlot = keyof GearLevels;

export const DEFAULT_GEAR_SLOT: GearSlotValue = { level: 0, stars: 0 };
export const DEFAULT_GEAR: GearLevels = {
  canon: { level: 0, stars: 0 },
  puce:  { level: 0, stars: 0 },
  armor: { level: 0, stars: 0 },
  radar: { level: 0, stars: 0 },
};

export interface SkillNames {
  tactics:    string;
  autoAttack: string;
  passive:    string;
}

export interface HeroDefinition {
  id: string;
  name: string;
  team: HeroTeam;
  type: HeroType;
  role: HeroRole;
  ewTarget: number;     // palier cible EW : 10, 20 ou 30
  teamPriority: number; // 1–5 (5 = plus haute priorité dans la team)
  imageUrl?: string;    // portrait depuis le wiki
  skillNames?: SkillNames;
  skillNamesFr?: SkillNames;
}

/** Niveaux des 3 compétences d'un héros (0–40). Max dépend de l'EW : base 30, +1/3 EW au-delà. */
export interface SkillLevels {
  tactics:    number;  // 0–40
  autoAttack: number;  // 0–40
  passive:    number;  // 0–40
}

export const DEFAULT_SKILLS: SkillLevels = { tactics: 0, autoAttack: 0, passive: 0 };

export interface PlayerHero {
  heroId: string;
  stars: number;      // 1–5 (0 = inconnu) | 2★ débloque skills | 4★ Super Sensing | 5★ prérequis EW
  ew: number;         // 0–30
  gear: GearLevels;
  skills: SkillLevels;
}
