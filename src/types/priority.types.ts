export type PriorityCategory = 'hero' | 'building' | 'research';
export type PriorityLevel = 'urgent' | 'recommended' | 'optional';

export interface PriorityItem {
  id: string;
  category: PriorityCategory;
  priorityLevel: PriorityLevel;
  score: number;
  titleKey: string;
  reasonKey: string;
  reasonParams?: Record<string, string | number>;
}
