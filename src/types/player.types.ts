import { PlayerHero } from './hero.types';
import { PlayerBuilding } from './building.types';
import { PlayerResearch } from './research.types';

export type Lang = 'fr' | 'en';

export interface PlayerProfile {
  hqLevel: number;
  setupComplete: boolean;
}

export interface PlayerState {
  schemaVersion: number;
  profile: PlayerProfile;
  language: Lang;
  heroes: PlayerHero[];
  buildings: PlayerBuilding[];
  research: PlayerResearch[];
  lastUpdated: string;
}
