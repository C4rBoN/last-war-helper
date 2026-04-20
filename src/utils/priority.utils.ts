import { PlayerState } from '../types/player.types';
import { PriorityItem, PriorityLevel } from '../types/priority.types';
import { HEROES } from '../data/heroes.data';
import { BUILDINGS } from '../data/buildings.data';
import { RESEARCH_TREES } from '../data/research.data';
import { getPlayerBuilding, getCompletedResearchIds, getInProgressResearchIds } from '../store/selectors';
import { checkT1Thresholds, computeHeroRecos } from './hero.utils';

// ─── Hero Priorities ──────────────────────────────────────────────────────────

export function computeHeroPriorities(state: PlayerState): PriorityItem[] {
  const playerHeroes = state.heroes;
  const t1Result = checkT1Thresholds(playerHeroes);
  const recos = computeHeroRecos(HEROES, playerHeroes, t1Result.allMet);

  return recos.filter(r => r.urgency !== 'optional').slice(0, 5).map(reco => ({
    id: `hero_${reco.heroId}_${reco.type}${reco.slot ? `_${reco.slot}` : ''}`,
    category: 'hero' as const,
    priorityLevel: reco.urgency,
    score: reco.score,
    titleKey: 'priority.hero.title',
    reasonKey: 'priority.hero.reco',
    reasonParams: { label: reco.label },
  }));
}

// ─── Building Priorities ─────────────────────────────────────────────────────

export function computeBuildingPriorities(state: PlayerState): PriorityItem[] {
  const hqLevel = state.profile.hqLevel;
  const items: (PriorityItem & { score: number; gap: number })[] = [];

  for (const building of BUILDINGS) {
    if (building.id === 'hq') continue;
    if (building.hqRequired > hqLevel) continue;

    const pb = getPlayerBuilding(state, building.id);
    if (pb.currentLevel === 0) continue;

    const gap = hqLevel - pb.currentLevel;
    if (gap <= 0) continue;

    const rankBonus = (14 - building.priorityRank) * 15; // max rank = 13 (drill_ground)
    const baseScore = gap * 10 + rankBonus;
    const priorityLevel: PriorityLevel = gap >= 3 ? 'urgent' : gap >= 1 ? 'recommended' : 'optional';

    // Boosters de score contextuels (Notion)
    let scoreBonus = 0;
    let reasonKey = 'priority.reason.building.behind';

    if (building.id === 'tech_center') {
      scoreBonus = 10000;
      reasonKey = 'priority.reason.building.tech_bottleneck';
    } else if (building.id === 'gear_factory' && hqLevel >= 20 && pb.currentLevel < 20) {
      // Usine de Gear niveau 20 requis pour les étoiles gear — urgent si HQ ≥ 20
      scoreBonus = 8000;
      reasonKey = 'priority.reason.building.gear_factory_stars';
    } else if (building.id === 'hospital') {
      // Hôpital toujours au max — pertes permanentes si plein pendant un combat
      scoreBonus = 2000;
    }

    items.push({
      id: `building_${building.id}`,
      category: 'building',
      priorityLevel,
      score: baseScore + scoreBonus,
      gap,
      titleKey: building.nameKey,
      reasonKey,
      reasonParams: { name: building.nameKey, gap },
    });
  }

  items.sort((a, b) => b.score - a.score);
  return items as PriorityItem[];
}

// ─── Research Priorities ─────────────────────────────────────────────────────

export function computeResearchPriorities(state: PlayerState): PriorityItem[] {
  const hqLevel = state.profile.hqLevel;
  const completed = getCompletedResearchIds(state);
  const inProgress = getInProgressResearchIds(state);
  const items: (PriorityItem & { score: number })[] = [];

  for (const tree of RESEARCH_TREES) {
    if (tree.hqUnlock > hqLevel) continue;

    for (const node of tree.nodes) {
      if (node.hqRequired > hqLevel) continue;
      if (completed.has(node.id)) continue;

      const blocked = node.prerequisiteIds.some(pid => !completed.has(pid));
      if (blocked) continue;

      const groupScore =
        node.priorityGroup === 'critical' ? 500 :
        node.priorityGroup === 'high'     ? 400 :
        node.priorityGroup === 'medium'   ? 300 :
        node.priorityGroup === 'low'      ? 200 : 100;

      const orderPenalty = -node.priorityOrder * 5;
      const ipBonus = inProgress.has(node.id) ? 50 : 0;
      const score = groupScore + orderPenalty + ipBonus;
      const priorityLevel: PriorityLevel =
        node.priorityGroup === 'critical' ? 'urgent' :
        node.priorityGroup === 'high'     ? 'recommended' : 'optional';

      if (priorityLevel === 'optional') continue;

      const reasonKey = inProgress.has(node.id)
        ? 'priority.reason.research.in_progress'
        : 'priority.reason.research.do_now';

      items.push({
        id: `research_${node.id}`,
        category: 'research',
        priorityLevel,
        score,
        titleKey: node.nameKey,
        reasonKey,
      });
    }
  }

  items.sort((a, b) => b.score - a.score);
  return items as PriorityItem[];
}

// ─── Dashboard Top-3 ─────────────────────────────────────────────────────────

export function computeTopPriorities(state: PlayerState): PriorityItem[] {
  const heroes = computeHeroPriorities(state);
  const buildings = computeBuildingPriorities(state);
  const research = computeResearchPriorities(state);
  const result: PriorityItem[] = [];
  if (heroes[0]) result.push(heroes[0]);
  if (buildings[0]) result.push(buildings[0]);
  if (research[0]) result.push(research[0]);
  return result;
}
