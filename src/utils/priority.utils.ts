import { PlayerState } from '../types/player.types';
import { PriorityItem, PriorityLevel } from '../types/priority.types';
import { HEROES } from '../data/heroes.data';
import { BUILDINGS } from '../data/buildings.data';
import { RESEARCH_TREES } from '../data/research.data';
import { getPlayerBuilding, getCompletedResearchIds, getInProgressResearchIds } from '../store/selectors';
import { BUILDING_MAP } from '../data/buildings.data';
import { getMissingPrereqs } from '../data/hqPrerequisites.data';
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

// Règles Notion (Règle 2 + Règle 4) :
// PRIORITÉ 2 URGENT  : tech_center (doit être QG-1), hospital
// PRIORITÉ 3 RECOMMANDÉ : barracks/wall/alliance (gap > 2), gear_factory, combat centers
// PRIORITÉ 4+ : drill_ground, secondaires — exclus de la liste
function getBuildingPriority(
  id: string,
  gap: number,
  hqLevel: number,
  currentLevel: number
): { priorityLevel: PriorityLevel; reasonKey: string } | null {
  switch (id) {
    case 'tech_center':
      return { priorityLevel: 'urgent', reasonKey: 'priority.reason.building.tech_bottleneck' };

    case 'hospital':
      return { priorityLevel: 'urgent', reasonKey: 'priority.reason.building.behind' };

    case 'gear_factory':
      if (hqLevel >= 20 && currentLevel < 20)
        return { priorityLevel: 'urgent', reasonKey: 'priority.reason.building.gear_factory_stars' };
      return { priorityLevel: 'recommended', reasonKey: 'priority.reason.building.behind' };

    case 'barracks':
    case 'wall':
    case 'alliance_center':
      // PRIORITÉ 3 seulement si > 2 niveaux derrière (seuil Notion QG-2 / QG-3)
      if (gap > 2)
        return { priorityLevel: 'recommended', reasonKey: 'priority.reason.building.behind' };
      return null;

    case 'tank_center':
    case 'missile_center':
    case 'aircraft_center':
      return { priorityLevel: 'recommended', reasonKey: 'priority.reason.building.behind' };

    default:
      return null; // drill_ground et tous les Secondaires exclus
  }
}

export function computeBuildingPriorities(state: PlayerState): PriorityItem[] {
  const hqLevel = state.profile.hqLevel;
  const nextHQ = hqLevel + 1;
  const items: (PriorityItem & { score: number; gap: number })[] = [];

  // ── PRIORITÉ 1 : prérequis manquants pour le prochain niveau de QG ────────
  const getLevel = (id: string) => getPlayerBuilding(state, id).currentLevel;
  const missingPrereqs = getMissingPrereqs(hqLevel, getLevel);
  const prereqBuildingIds = new Set<string>();

  // any_combat_center : un seul item dans la liste si aucun centre n'est au niveau
  const combatIds = ['tank_center', 'missile_center', 'aircraft_center'];
  const allCombatMissing = combatIds.every(id => missingPrereqs.has(id));
  if (allCombatMissing && missingPrereqs.has('tank_center')) {
    combatIds.forEach(id => prereqBuildingIds.add(id));
    const reqLevel = missingPrereqs.get('tank_center')!;
    items.push({
      id: 'building_any_combat_center',
      category: 'building',
      priorityLevel: 'urgent',
      score: 3000,
      gap: reqLevel - Math.max(...combatIds.map(getLevel)),
      titleKey: 'buildings.any_combat_center',
      reasonKey: 'priority.reason.building.hq_prereq',
      reasonParams: { next: nextHQ },
    });
  }

  // Autres prérequis (bâtiments individuels)
  for (const [buildingId, reqLevel] of missingPrereqs.entries()) {
    if (combatIds.includes(buildingId)) continue; // géré ci-dessus
    prereqBuildingIds.add(buildingId);
    const currentLevel = getLevel(buildingId);
    const building = BUILDING_MAP[buildingId];
    const rankScore = building ? (13 - building.priorityRank) * 15 : 0;
    items.push({
      id: `building_${buildingId}`,
      category: 'building',
      priorityLevel: 'urgent',
      score: 3000 + rankScore,
      gap: reqLevel - currentLevel,
      titleKey: building?.nameKey ?? buildingId,
      reasonKey: 'priority.reason.building.hq_prereq',
      reasonParams: { next: nextHQ },
    });
  }

  // ── PRIORITÉ 2-3 : bâtiments en retard (hors prérequis déjà listés) ───────
  for (const building of BUILDINGS) {
    if (building.id === 'hq') continue;
    if (building.hqRequired > hqLevel) continue;
    if (prereqBuildingIds.has(building.id)) continue;

    const pb = getPlayerBuilding(state, building.id);
    if (pb.currentLevel === 0) continue;

    const gap = hqLevel - pb.currentLevel;
    if (gap <= 0) continue;

    const result = getBuildingPriority(building.id, gap, hqLevel, pb.currentLevel);
    if (!result) continue;

    const score = (13 - building.priorityRank) * 15 + gap;
    items.push({
      id: `building_${building.id}`,
      category: 'building',
      priorityLevel: result.priorityLevel,
      score,
      gap,
      titleKey: building.nameKey,
      reasonKey: result.reasonKey,
      reasonParams: { gap },
    });
  }

  const levelOrder: Record<PriorityLevel, number> = { urgent: 0, recommended: 1, optional: 2 };
  items.sort((a, b) =>
    levelOrder[a.priorityLevel] !== levelOrder[b.priorityLevel]
      ? levelOrder[a.priorityLevel] - levelOrder[b.priorityLevel]
      : b.score - a.score
  );
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
