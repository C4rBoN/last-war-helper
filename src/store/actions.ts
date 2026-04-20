import { Lang } from '../types/player.types';
import { GearSlot, GearSlotValue, PlayerHero, SkillLevels } from '../types/hero.types';

export type AppAction =
  | { type: 'SET_HQ_LEVEL'; payload: number }
  | { type: 'SET_LANGUAGE'; payload: Lang }
  | { type: 'COMPLETE_SETUP' }
  // Héros
  | { type: 'UPDATE_HERO'; payload: PlayerHero }
  | { type: 'SET_HERO_STARS'; payload: { heroId: string; stars: number } }
  | { type: 'SET_HERO_EW'; payload: { heroId: string; ew: number } }
  | { type: 'SET_HERO_GEAR'; payload: { heroId: string; slot: GearSlot; value: GearSlotValue } }
  | { type: 'SET_HERO_SKILLS'; payload: { heroId: string; skills: SkillLevels } }
  // Bâtiments
  | { type: 'UPDATE_BUILDING_LEVEL'; payload: { buildingId: string; level: number } }
  // Recherche
  | { type: 'TOGGLE_RESEARCH_COMPLETE'; payload: { nodeId: string } }
  | { type: 'SET_RESEARCH_IN_PROGRESS'; payload: { nodeId: string; inProgress: boolean } }
  // Reset
  | { type: 'RESET_ALL' };
