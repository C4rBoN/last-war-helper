import { createContext, useContext, useReducer, useEffect, useRef, useState, ReactNode, Dispatch } from 'react';
import { PlayerState } from '../types/player.types';
import { PlayerHero, GearLevels, GearSlotValue, DEFAULT_SKILLS } from '../types/hero.types';
import { AppAction } from './actions';
import { appReducer, DEFAULT_STATE } from './appReducer';
import { useAuth } from './AuthContext';
import { supabase, SYNC_TABLE } from '../lib/supabase';

const STORAGE_KEY = 'lastwar_helper_v1';
const DEBOUNCE_MS  = 1500;

/* ─── Migration helpers ─────────────────────────────────────── */

function migrateGearSlot(v: unknown): GearSlotValue {
  if (typeof v === 'object' && v !== null && 'level' in v && 'stars' in v) {
    const o = v as Record<string, unknown>;
    const level = Math.max(0, Math.min(40, typeof o.level === 'number' ? o.level : 0));
    const stars = Math.max(0, Math.min(5,  typeof o.stars === 'number' ? o.stars : 0));
    return { level, stars: level < 40 ? 0 : stars };
  }
  if (typeof v === 'number' && v > 0) return { level: 40, stars: Math.max(0, Math.min(5, v)) };
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
    stars:  typeof raw.stars === 'number' ? Math.max(0, Math.min(5,  raw.stars)) : 0,
    ew:     typeof raw.ew    === 'number' ? Math.max(0, Math.min(30, raw.ew))    : 0,
    gear: {
      canon: migrateGearSlot(gear.canon),
      puce:  migrateGearSlot(gear.puce),
      armor: migrateGearSlot(gear.armor),
      radar: migrateGearSlot(gear.radar),
    } as GearLevels,
    skills: migrateSkills(raw.skills),
  };
}

export function migrateState(parsed: Partial<PlayerState>): PlayerState {
  const heroes = Array.isArray(parsed.heroes)
    ? parsed.heroes.map(h => migrateHero(h as unknown as Record<string, unknown>))
    : [];
  return { ...DEFAULT_STATE, ...parsed, heroes, schemaVersion: 6 };
}

function loadState(): PlayerState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_STATE;
    return migrateState(JSON.parse(saved) as Partial<PlayerState>);
  } catch {
    return DEFAULT_STATE;
  }
}

/* ─── Context ───────────────────────────────────────────────── */

interface AppContextValue {
  state:    PlayerState;
  dispatch: Dispatch<AppAction>;
  syncing:  boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch]   = useReducer(appReducer, undefined, loadState);
  const { user }            = useAuth();
  const [syncing, setSyncing] = useState(false);

  const syncTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userRef    = useRef(user);
  const syncReady  = useRef(false);

  // ── Toujours sauvegarder en localStorage ──
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, lastUpdated: new Date().toISOString() }));
  }, [state]);

  // ── Quand l'utilisateur se connecte : charger depuis Supabase ──
  useEffect(() => {
    userRef.current = user;

    if (!user) {
      syncReady.current = false;
      return;
    }

    (async () => {
      setSyncing(true);
      const { data, error } = await supabase
        .from(SYNC_TABLE)
        .select('data')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!error && data?.data) {
        // Des données cloud existent → les charger
        const remote = migrateState(data.data as Partial<PlayerState>);
        dispatch({ type: 'LOAD_ALL', payload: remote });
      } else {
        // Pas de données cloud → uploader le localStorage actuel
        const local = localStorage.getItem(STORAGE_KEY);
        if (local) {
          await supabase.from(SYNC_TABLE).upsert(
            { user_id: user.id, data: JSON.parse(local), updated_at: new Date().toISOString() },
            { onConflict: 'user_id' }
          );
        }
      }
      syncReady.current = true;
      setSyncing(false);
    })();
  }, [user]);

  // ── Sauvegarde Supabase debouncée à chaque changement d'état ──
  useEffect(() => {
    if (!userRef.current || !syncReady.current) return;

    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(async () => {
      if (!userRef.current) return;
      setSyncing(true);
      await supabase.from(SYNC_TABLE).upsert(
        { user_id: userRef.current.id, data: state, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );
      setSyncing(false);
    }, DEBOUNCE_MS);

    return () => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch, syncing }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
