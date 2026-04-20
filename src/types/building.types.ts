export type BuildingCategory = 'core' | 'military' | 'defense' | 'economy' | 'support';

export interface BuildingDefinition {
  id: string;
  nameKey: string;
  category: BuildingCategory;
  maxLevel: number;
  priorityRank: number;   // 1 = highest priority
  hqRequired: number;     // minimum HQ level to unlock
  isUnique: boolean;
  imageUrl?: string;
}

export interface PlayerBuilding {
  buildingId: string;
  currentLevel: number;
}
