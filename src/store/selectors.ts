import { PlayerState } from '../types/player.types';
import { PlayerHero } from '../types/hero.types';
import { PlayerBuilding } from '../types/building.types';
import { BUILDING_MAP } from '../data/buildings.data';
import { HQ_CAP_MAP, HQCapRow } from '../data/hqCaps.data';
import { defaultPlayerHero } from '../utils/hero.utils';

export function getPlayerHero(state: PlayerState, heroId: string): PlayerHero {
  return state.heroes.find(h => h.heroId === heroId) ?? defaultPlayerHero(heroId);
}

export function getPlayerBuilding(state: PlayerState, buildingId: string): PlayerBuilding {
  return state.buildings.find(b => b.buildingId === buildingId) ?? { buildingId, currentLevel: 0 };
}

export function getCompletedResearchIds(state: PlayerState): Set<string> {
  return new Set(state.research.filter(r => r.completed).map(r => r.nodeId));
}

export function getInProgressResearchIds(state: PlayerState): Set<string> {
  return new Set(state.research.filter(r => r.inProgress).map(r => r.nodeId));
}

export function getHQCap(state: PlayerState): HQCapRow {
  return HQ_CAP_MAP[state.profile.hqLevel] ?? HQ_CAP_MAP[1];
}

export function getBuildingsBehindHQ(state: PlayerState): string[] {
  const hqLevel = state.profile.hqLevel;
  return Object.values(BUILDING_MAP)
    .filter(b => b.id !== 'hq' && b.hqRequired <= hqLevel)
    .filter(b => {
      const pb = getPlayerBuilding(state, b.id);
      return pb.currentLevel > 0 && pb.currentLevel < hqLevel;
    })
    .map(b => b.id);
}
