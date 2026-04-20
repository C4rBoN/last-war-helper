export type ResearchTreeId =
  | 'development'
  | 'economy'
  | 'hero'
  | 'units'
  | 'special_forces'
  | 'alliance_duel'
  | 'intercity_truck'
  | 'garage'
  | 'age_of_oil';

export type ResearchPriorityGroup = 'critical' | 'high' | 'medium' | 'low' | 'endgame';

export interface ResearchNode {
  id: string;
  treeId: ResearchTreeId;
  nameKey: string;
  hqRequired: number;
  prerequisiteIds: string[];
  priorityGroup: ResearchPriorityGroup;
  priorityOrder: number;
}

export interface ResearchTree {
  id: ResearchTreeId;
  nameKey: string;
  descriptionKey: string;
  hqUnlock: number;
  priorityGroup: ResearchPriorityGroup;
  nodes: ResearchNode[];
}

export interface PlayerResearch {
  nodeId: string;
  completed: boolean;
  inProgress: boolean;
}
