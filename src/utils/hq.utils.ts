import { HQ_CAP_MAP, HQCapRow } from '../data/hqCaps.data';

export function getHQCapForLevel(level: number): HQCapRow {
  return HQ_CAP_MAP[level] ?? HQ_CAP_MAP[1];
}

export function isHeroAtCap(starLevel: number, starTier: number, hqLevel: number): boolean {
  const cap = getHQCapForLevel(hqLevel);
  if (starLevel > cap.maxHeroStarLevel) return true;
  if (starLevel === cap.maxHeroStarLevel && starTier >= cap.maxHeroStarTier) return true;
  return false;
}

export function formatStars(starLevel: number, starTier: number): string {
  return `★${starLevel} T${starTier}`;
}
