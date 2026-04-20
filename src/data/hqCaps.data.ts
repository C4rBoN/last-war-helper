import { ResearchTreeId } from '../types/research.types';

export interface HQCapRow {
  hqLevel: number;
  maxBuildingLevel: number;
  maxHeroStarLevel: number;
  maxHeroStarTier: number;
  unlocksResearchTrees: ResearchTreeId[];
}

export const HQ_CAPS: HQCapRow[] = [
  { hqLevel: 1,  maxBuildingLevel: 1,  maxHeroStarLevel: 1, maxHeroStarTier: 1, unlocksResearchTrees: ['development', 'economy'] },
  { hqLevel: 2,  maxBuildingLevel: 2,  maxHeroStarLevel: 1, maxHeroStarTier: 2, unlocksResearchTrees: [] },
  { hqLevel: 3,  maxBuildingLevel: 3,  maxHeroStarLevel: 1, maxHeroStarTier: 3, unlocksResearchTrees: [] },
  { hqLevel: 4,  maxBuildingLevel: 4,  maxHeroStarLevel: 1, maxHeroStarTier: 4, unlocksResearchTrees: [] },
  { hqLevel: 5,  maxBuildingLevel: 5,  maxHeroStarLevel: 1, maxHeroStarTier: 5, unlocksResearchTrees: [] },
  { hqLevel: 6,  maxBuildingLevel: 6,  maxHeroStarLevel: 2, maxHeroStarTier: 1, unlocksResearchTrees: [] },
  { hqLevel: 7,  maxBuildingLevel: 7,  maxHeroStarLevel: 2, maxHeroStarTier: 2, unlocksResearchTrees: [] },
  { hqLevel: 8,  maxBuildingLevel: 8,  maxHeroStarLevel: 2, maxHeroStarTier: 3, unlocksResearchTrees: ['units', 'hero'] },
  { hqLevel: 9,  maxBuildingLevel: 9,  maxHeroStarLevel: 2, maxHeroStarTier: 4, unlocksResearchTrees: [] },
  { hqLevel: 10, maxBuildingLevel: 10, maxHeroStarLevel: 2, maxHeroStarTier: 5, unlocksResearchTrees: ['alliance_duel'] },
  { hqLevel: 11, maxBuildingLevel: 11, maxHeroStarLevel: 3, maxHeroStarTier: 1, unlocksResearchTrees: [] },
  { hqLevel: 12, maxBuildingLevel: 12, maxHeroStarLevel: 3, maxHeroStarTier: 2, unlocksResearchTrees: ['intercity_truck', 'garage'] },
  { hqLevel: 13, maxBuildingLevel: 13, maxHeroStarLevel: 3, maxHeroStarTier: 3, unlocksResearchTrees: [] },
  { hqLevel: 14, maxBuildingLevel: 14, maxHeroStarLevel: 3, maxHeroStarTier: 4, unlocksResearchTrees: [] },
  { hqLevel: 15, maxBuildingLevel: 15, maxHeroStarLevel: 3, maxHeroStarTier: 5, unlocksResearchTrees: ['special_forces'] },
  { hqLevel: 16, maxBuildingLevel: 16, maxHeroStarLevel: 4, maxHeroStarTier: 1, unlocksResearchTrees: [] },
  { hqLevel: 17, maxBuildingLevel: 17, maxHeroStarLevel: 4, maxHeroStarTier: 2, unlocksResearchTrees: [] },
  { hqLevel: 18, maxBuildingLevel: 18, maxHeroStarLevel: 4, maxHeroStarTier: 3, unlocksResearchTrees: [] },
  { hqLevel: 19, maxBuildingLevel: 19, maxHeroStarLevel: 4, maxHeroStarTier: 4, unlocksResearchTrees: [] },
  { hqLevel: 20, maxBuildingLevel: 20, maxHeroStarLevel: 4, maxHeroStarTier: 5, unlocksResearchTrees: [] },
  { hqLevel: 21, maxBuildingLevel: 21, maxHeroStarLevel: 4, maxHeroStarTier: 5, unlocksResearchTrees: [] },
  { hqLevel: 22, maxBuildingLevel: 22, maxHeroStarLevel: 5, maxHeroStarTier: 1, unlocksResearchTrees: [] },
  { hqLevel: 23, maxBuildingLevel: 23, maxHeroStarLevel: 5, maxHeroStarTier: 2, unlocksResearchTrees: [] },
  { hqLevel: 24, maxBuildingLevel: 24, maxHeroStarLevel: 5, maxHeroStarTier: 3, unlocksResearchTrees: [] },
  { hqLevel: 25, maxBuildingLevel: 25, maxHeroStarLevel: 5, maxHeroStarTier: 4, unlocksResearchTrees: [] },
  { hqLevel: 26, maxBuildingLevel: 26, maxHeroStarLevel: 5, maxHeroStarTier: 4, unlocksResearchTrees: [] },
  { hqLevel: 27, maxBuildingLevel: 27, maxHeroStarLevel: 5, maxHeroStarTier: 5, unlocksResearchTrees: [] },
  { hqLevel: 28, maxBuildingLevel: 28, maxHeroStarLevel: 5, maxHeroStarTier: 5, unlocksResearchTrees: [] },
  { hqLevel: 29, maxBuildingLevel: 29, maxHeroStarLevel: 5, maxHeroStarTier: 5, unlocksResearchTrees: [] },
  { hqLevel: 30, maxBuildingLevel: 30, maxHeroStarLevel: 5, maxHeroStarTier: 5, unlocksResearchTrees: [] },
  { hqLevel: 31, maxBuildingLevel: 31, maxHeroStarLevel: 5, maxHeroStarTier: 5, unlocksResearchTrees: ['age_of_oil'] },
  { hqLevel: 32, maxBuildingLevel: 32, maxHeroStarLevel: 5, maxHeroStarTier: 5, unlocksResearchTrees: [] },
  { hqLevel: 33, maxBuildingLevel: 33, maxHeroStarLevel: 5, maxHeroStarTier: 5, unlocksResearchTrees: [] },
  { hqLevel: 34, maxBuildingLevel: 34, maxHeroStarLevel: 5, maxHeroStarTier: 5, unlocksResearchTrees: [] },
  { hqLevel: 35, maxBuildingLevel: 35, maxHeroStarLevel: 5, maxHeroStarTier: 5, unlocksResearchTrees: [] },
];

export const HQ_CAP_MAP: Record<number, HQCapRow> =
  Object.fromEntries(HQ_CAPS.map(row => [row.hqLevel, row]));
