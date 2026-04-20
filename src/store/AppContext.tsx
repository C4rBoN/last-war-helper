import { createContext, useContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';
import { PlayerState } from '../types/player.types';
import { PlayerHero, GearLevels, GearSlotValue, DEFAULT_GEAR, DEFAULT_SKILLS } from '../types/hero.types';
import { AppAction } from './actions';
import { appReducer, DEFAULT_STATE } from './appReducer';

const STORAGE_KEY = 'lastwar_helper_v1';

/** Migre un slot d'équipement depuis n'importe quel ancien format. */
function migrateGearSlot(v: unknown): GearSlotValue {
  // Nouveau format : { level, stars }
  if (typeof v === 'object' && v !== null && 'level' in v && 'stars' in v) {
    const o = v as Record<string, unknown>;
    const level = Math.max(0, Math.min(40, typeof o.level === 'number' ? o.level : 0));
    const stars = Math.max(0, Math.min(5, typeof o.stars === 'number' ? o.stars : 0));
    return { level, stars: level < 40 ? 0 : stars };
  }
  // Ancien format (v3) : number = étoiles seulement
  if (typeof v === 'number' && v > 0) {
    return { level: 40, stars: Math.max(0, Math.min(5, v)) };
  }
  return { level: 0, stars: 0 };
}

function migrateSkills(raw: unknown): typeof DEFAULT_SKILLS {
  if (typeof raw === 'object' && raw !== null) {
    const o = raw as Record<string, unknown>;
    return {
      tactics:    typeof o.tactics    === 'number' ? Math.max(0, Math.min(40, o.tactics))    : 0,
      autoAttack: typeof o.autoAttack === 'number' ? Math.max(0, Math.min(40, o.autoAttack)) : 0,
      passive:    typeof o.passive    === 'number' ? Math.max(0, Math.min(40, o.passive))    : 0,
    };
  }
  return { ...DEFAULT_SKILLS };
}

function migrateHero(raw: Record<string, unknown>): PlayerHero {
  const gear = (raw.gear ?? {}) as Record<string, unknown>;
  return {
    heroId: raw.heroId as string,
    stars: typeof raw.stars === 'number' ? Math.max(0, Math.min(5, raw.stars)) : 0,
    ew: typeof raw.ew === 'number' ? Math.max(0, Math.min(30, raw.ew)) : 0,
    gear: {
      canon: migrateGearSlot(gear.canon),
      puce:  migrateGearSlot(gear.puce),
      armor: migrateGearSlot(gear.armor),
      radar: migrateGearSlot(gear.radar),
    } as GearLevels,
    skills: migrateSkills(raw.skills),
  };
}

function loadState(): PlayerState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_STATE;
    const parsed = JSON.parse(saved) as Partial<PlayerState> & { schemaVersion?: number };
    const heroes = Array.isArray(parsed.heroes)
      ? parsed.heroes.map(h => migrateHero(h as unknown as Record<string, unknown>))
      : [];
    return { ...DEFAULT_STATE, ...parsed, heroes, schemaVersion: 6 };
  } catch {
    return DEFAULT_STATE;
  }
}

interface AppContextValue {
  state: PlayerState;
  dispatch: Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, lastUpdated: new Date().toISOString() }));
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
