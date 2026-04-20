import { PlayerState } from '../types/player.types';
import { PlayerHero, GearLevels, GearSlotValue, SkillLevels, DEFAULT_SKILLS } from '../types/hero.types';
import { PlayerBuilding } from '../types/building.types';
import { PlayerResearch } from '../types/research.types';
import { AppAction } from './actions';
import { defaultPlayerHero } from '../utils/hero.utils';

export const DEFAULT_STATE: PlayerState = {
  schemaVersion: 6,
  profile: { hqLevel: 1, setupComplete: false },
  language: 'fr',
  heroes: [],
  buildings: [],
  research: [],
  lastUpdated: new Date().toISOString(),
};

function getOrDefault(heroes: PlayerHero[], heroId: string): PlayerHero {
  return heroes.find(h => h.heroId === heroId) ?? defaultPlayerHero(heroId);
}

function upsertHero(heroes: PlayerHero[], heroId: string, update: Partial<PlayerHero>): PlayerHero[] {
  const base = getOrDefault(heroes, heroId);
  const updated = { ...base, ...update };
  const idx = heroes.findIndex(h => h.heroId === heroId);
  return idx >= 0 ? heroes.map((h, i) => (i === idx ? updated : h)) : [...heroes, updated];
}

function upsertBuilding(buildings: PlayerBuilding[], buildingId: string, level: number): PlayerBuilding[] {
  const idx = buildings.findIndex(b => b.buildingId === buildingId);
  const updated = { buildingId, currentLevel: level };
  return idx >= 0 ? buildings.map((b, i) => (i === idx ? updated : b)) : [...buildings, updated];
}

function upsertResearch(research: PlayerResearch[], nodeId: string, update: Partial<PlayerResearch>): PlayerResearch[] {
  const idx = research.findIndex(r => r.nodeId === nodeId);
  const base: PlayerResearch = idx >= 0 ? research[idx] : { nodeId, completed: false, inProgress: false };
  const updated = { ...base, ...update };
  return idx >= 0 ? research.map((r, i) => (i === idx ? updated : r)) : [...research, updated];
}

export function appReducer(state: PlayerState, action: AppAction): PlayerState {
  switch (action.type) {
    case 'SET_HQ_LEVEL':
      return { ...state, profile: { ...state.profile, hqLevel: action.payload } };

    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };

    case 'COMPLETE_SETUP':
      return { ...state, profile: { ...state.profile, setupComplete: true } };

    case 'UPDATE_HERO': {
      const hero = action.payload;
      return { ...state, heroes: upsertHero(state.heroes, hero.heroId, hero) };
    }

    case 'SET_HERO_STARS': {
      const { heroId, stars } = action.payload;
      return { ...state, heroes: upsertHero(state.heroes, heroId, { stars: Math.max(0, Math.min(5, stars)) }) };
    }

    case 'SET_HERO_EW': {
      const { heroId, ew } = action.payload;
      return { ...state, heroes: upsertHero(state.heroes, heroId, { ew: Math.max(0, Math.min(30, ew)) }) };
    }

    case 'SET_HERO_GEAR': {
      const { heroId, slot, value } = action.payload;
      const existing = getOrDefault(state.heroes, heroId);
      const safeLevel = Math.max(0, Math.min(40, value.level));
      const safeSlot: GearSlotValue = {
        level: safeLevel,
        stars: safeLevel < 40 ? 0 : Math.max(0, Math.min(5, value.stars)),
      };
      const gear: GearLevels = { ...existing.gear, [slot]: safeSlot };
      return { ...state, heroes: upsertHero(state.heroes, heroId, { gear }) };
    }

    case 'SET_HERO_SKILLS': {
      const { heroId, skills } = action.payload;
      const safe: SkillLevels = {
        tactics:    Math.max(0, Math.min(40, skills.tactics)),
        autoAttack: Math.max(0, Math.min(40, skills.autoAttack)),
        passive:    Math.max(0, Math.min(40, skills.passive)),
      };
      return { ...state, heroes: upsertHero(state.heroes, heroId, { skills: safe }) };
    }

    case 'UPDATE_BUILDING_LEVEL':
      return { ...state, buildings: upsertBuilding(state.buildings, action.payload.buildingId, action.payload.level) };

    case 'TOGGLE_RESEARCH_COMPLETE': {
      const { nodeId } = action.payload;
      const existing = state.research.find(r => r.nodeId === nodeId);
      const wasCompleted = existing?.completed ?? false;
      return { ...state, research: upsertResearch(state.research, nodeId, { completed: !wasCompleted, inProgress: false }) };
    }

    case 'SET_RESEARCH_IN_PROGRESS': {
      const { nodeId, inProgress } = action.payload;
      return { ...state, research: upsertResearch(state.research, nodeId, { inProgress }) };
    }

    case 'RESET_ALL':
      return { ...DEFAULT_STATE, language: state.language };

    default:
      return state;
  }
}
