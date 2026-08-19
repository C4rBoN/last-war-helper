import { GearLevels, GearSlot, GearSlotValue, HeroRole, HeroTeam, PlayerHero, SkillLevels, DEFAULT_GEAR, DEFAULT_SKILLS } from '../types/hero.types';
import { HeroDefinition } from '../types/hero.types';

// ─── Gear priority par rôle ───────────────────────────────────────────────────

/** Slots recommandés dans l'ordre de priorité, par rôle. */
export function getGearPriorityOrder(role: HeroRole): GearSlot[] {
  switch (role) {
    case 'DPS':           return ['canon', 'puce', 'radar', 'armor'];
    case 'Tank défensif': return ['armor', 'radar'];
    case 'Support':       return ['radar', 'armor'];
  }
}

/** Pertinence d'un slot pour un rôle : 2=prioritaire, 1=secondaire, 0=inutile (jamais recommandé). */
export function getSlotRelevance(slot: GearSlot, role: HeroRole): 0 | 1 | 2 {
  if (role === 'DPS') {
    return slot === 'canon' || slot === 'puce' ? 2 : 1;
  }
  if (role === 'Tank défensif') {
    return slot === 'armor' || slot === 'radar' ? 2 : 0;
  }
  // Support
  return slot === 'radar' || slot === 'armor' ? 2 : 0;
}

/** Vrais pour les slots offensifs (canon, puce). */
export const OFFENSIVE_SLOTS: GearSlot[] = ['canon', 'puce'];

/** Score de progression d'un slot : level (0–40) + stars × 8 (0–40). Max = 80. */
export function gearSlotProgress(sv: GearSlotValue): number {
  return sv.level + sv.stars * 8;
}

/** Indique si un slot d'équipement est au maximum (niv. 40 + 5★). */
export function isGearSlotMaxed(sv: GearSlotValue): boolean {
  return sv.level >= 40 && sv.stars >= 5;
}

/** Indique si un slot a été investi (level > 0 ou stars > 0). */
export function isGearSlotInvested(sv: GearSlotValue): boolean {
  return sv.level > 0 || sv.stars > 0;
}

// ─── EW — milestones ─────────────────────────────────────────────────────────

/** Paliers EW : 1=Déblocage, 10=Palier 1, 20=+7.5% squad, 30=Max skills 40 */
export const EW_MILESTONES = [1, 10, 20, 30] as const;

/** Prochain palier EW à atteindre, ou null si déjà à l'objectif. */
export function getNextEWMilestone(ew: number, ewTarget: number): number | null {
  return EW_MILESTONES.find(m => m <= ewTarget && m > ew) ?? null;
}

// ─── Seuil de l'équipe prioritaire ──────────────────────────────────────────────

export type ActionCategory = 'ew' | 'stars' | 'skills' | 'gear';

export interface TeamThresholdCheck {
  label: string;
  met: boolean;
  category: ActionCategory;
}

export interface TeamThresholdResult {
  allMet: boolean;
  checks: TeamThresholdCheck[];
  metCount: number;
}

function getHero(heroes: PlayerHero[], id: string): PlayerHero {
  return heroes.find(h => h.heroId === id) ?? { heroId: id, level: 0, stars: 0, ew: 0, gear: { ...DEFAULT_GEAR }, skills: { ...DEFAULT_SKILLS } };
}

/**
 * Seuil obligatoire avant de pouvoir investir efficacement sur les autres équipes.
 * S'applique à l'équipe placée en priorité #1 par le joueur (teamOrder[0]).
 * Règle dérivée du seuil réel du jeu sur l'équipe Tank (Kimberly/Murphy/Stetmann/
 * Marshall/Williams), généralisée aux 5 héros de n'importe quelle équipe : chaque
 * DPS doit atteindre son AE cible + équipement offensif, le meilleur défenseur son
 * équipement défensif, les autres juste leur AE cible.
 */
export function computeTeamThreshold(
  heroes: HeroDefinition[],
  playerHeroes: PlayerHero[],
  team: HeroTeam
): TeamThresholdResult {
  const teamHeroes = heroes.filter(h => h.team === team).sort((a, b) => b.teamPriority - a.teamPriority);
  const checks: TeamThresholdCheck[] = [];

  for (const hero of teamHeroes) {
    const ph = getHero(playerHeroes, hero.id);
    checks.push({
      category: 'ew',
      label: `${hero.name} Arme Exclusive ${hero.ewTarget >= 30 ? '=' : '≥'} ${hero.ewTarget}`,
      met: ph.ew >= hero.ewTarget,
    });
  }

  for (const hero of teamHeroes.filter(h => h.role === 'DPS')) {
    const ph = getHero(playerHeroes, hero.id);
    checks.push({
      category: 'gear',
      label: `${hero.name} Canon niv.40 ≥ 3★ & Puce niv.40 ≥ 3★`,
      met: ph.gear.canon.level >= 40 && ph.gear.canon.stars >= 3
        && ph.gear.puce.level  >= 40 && ph.gear.puce.stars  >= 3,
    });
  }

  const topTankDef = teamHeroes.find(h => h.role === 'Tank défensif');
  if (topTankDef) {
    const ph = getHero(playerHeroes, topTankDef.id);
    checks.push({
      category: 'gear',
      label: `${topTankDef.name} Armor niv.40 ≥ 3★ & Radar niv.40 ≥ 3★`,
      met: ph.gear.armor.level >= 40 && ph.gear.armor.stars >= 3
        && ph.gear.radar.level  >= 40 && ph.gear.radar.stars  >= 3,
    });
  }

  const metCount = checks.filter(c => c.met).length;
  return { allMet: metCount === checks.length, checks, metCount };
}

// ─── Ordre des équipes (préférence joueur) ─────────────────────────────────────

/** Poids par équipe dérivé de l'ordre de priorité choisi par le joueur (1ère = poids le plus haut). */
export function getTeamWeights(teamOrder: HeroTeam[]): Record<HeroTeam, number> {
  const weights = {} as Record<HeroTeam, number>;
  teamOrder.forEach((team, i) => { weights[team] = teamOrder.length - i; });
  return weights;
}

// ─── Recommandations ─────────────────────────────────────────────────────────

export interface HeroReco {
  heroId: string;
  heroName: string;
  team: HeroTeam;
  type: 'ew' | 'gear';
  slot?: GearSlot;
  label: string;        // description affichable
  score: number;
  isPrimary: boolean;   // false = "secondaire (T1 prioritaire)"
  urgency: 'urgent' | 'recommended' | 'optional';
}

export function computeHeroRecos(
  heroes: HeroDefinition[],
  playerHeroes: PlayerHero[],
  thresholdMet: boolean,
  teamOrder: HeroTeam[] = ['T1', 'T2', 'T3']
): HeroReco[] {
  const recos: HeroReco[] = [];
  const teamScore = getTeamWeights(teamOrder);
  const priorityTeam = teamOrder[0];

  for (const hero of heroes) {
    const ph = getHero(playerHeroes, hero.id);
    const tScore = teamScore[hero.team];
    const isPriorityTeam = hero.team === priorityTeam;

    // ── EW ────────────────────────────────────────────────────────────────
    const nextEW = getNextEWMilestone(ph.ew, hero.ewTarget);
    if (nextEW !== null) {
      const distance = nextEW - ph.ew;
      const distanceFactor = 31 - distance; // plus proche = plus urgent
      const baseScore = tScore * hero.teamPriority * 2 * distanceFactor;
      const isEWUnlock = ph.ew === 0;
      // Exception Notion : débloquer EW niveau 1 sur T2/T3 est toujours autorisé (coût faible, base nécessaire)
      const isEWLevel1Exception = nextEW === 1;
      const isPrimary = isPriorityTeam || thresholdMet || isEWUnlock || isEWLevel1Exception;
      const score = isPrimary ? baseScore : baseScore * 0.2;

      recos.push({
        heroId: hero.id,
        heroName: hero.name,
        team: hero.team,
        type: 'ew',
        label: `${hero.name} — Arme Exclusive ${ph.ew} → ${nextEW}`,
        score,
        isPrimary,
        urgency: distance <= 3 ? 'urgent' : distance <= 8 ? 'recommended' : 'optional',
      });
    }

    // ── Gear ──────────────────────────────────────────────────────────────
    const slots: GearSlot[] = ['canon', 'puce', 'armor', 'radar'];
    for (const slot of slots) {
      const sv = ph.gear[slot];
      if (isGearSlotMaxed(sv)) continue;

      const relevance = getSlotRelevance(slot, hero.role);
      if (relevance === 0) continue; // jamais recommandé

      // Score basé sur la progression totale : plus on est avancé, plus c'est urgent de finir
      const progress = gearSlotProgress(sv); // 0–80
      const distanceFactor = progress + 1;   // 1–81
      const baseScore = tScore * hero.teamPriority * relevance * distanceFactor;
      const isSecondary = !isPriorityTeam && !thresholdMet;
      const score = isSecondary ? baseScore * 0.5 : baseScore;

      // Label lisible — cible le prochain palier par 10 (règle Notion : 0→10→20→30→40)
      let label: string;
      if (sv.level < 40) {
        const nextMilestone = Math.min(40, Math.ceil((sv.level + 1) / 10) * 10);
        label = `${hero.name} — ${slotLabel(slot)} niv. ${sv.level} → ${nextMilestone}`;
      } else {
        label = `${hero.name} — ${slotLabel(slot)} niv.40 ${sv.stars}★ → ${sv.stars + 1}★`;
      }

      recos.push({
        heroId: hero.id,
        heroName: hero.name,
        team: hero.team,
        type: 'gear',
        slot,
        label,
        score,
        isPrimary: !isSecondary,
        urgency: relevance === 2 && !isSecondary ? 'recommended' : 'optional',
      });
    }
  }

  return recos.sort((a, b) => b.score - a.score);
}

function slotLabel(slot: GearSlot): string {
  const labels: Record<GearSlot, string> = {
    canon: 'Canon', puce: 'Puce', armor: 'Armure', radar: 'Radar',
  };
  return labels[slot];
}

// ─── Actions unifiées ────────────────────────────────────────────────────────

export interface UnifiedAction {
  id: string;
  kind: 'threshold' | 'reco';
  category: ActionCategory;
  label: string;
  urgency: 'urgent' | 'recommended' | 'optional' | 'done';
  isPrimary: boolean;
  score: number;
  heroId?: string;
  team?: HeroTeam;
}

export function computeUnifiedActions(
  heroes: HeroDefinition[],
  playerHeroes: PlayerHero[],
  teamOrder: HeroTeam[] = ['T1', 'T2', 'T3'],
): Record<ActionCategory, UnifiedAction[]> {
  const priorityTeam = teamOrder[0];
  const thresholdResult = computeTeamThreshold(heroes, playerHeroes, priorityTeam);
  const recos = computeHeroRecos(heroes, playerHeroes, thresholdResult.allMet, teamOrder);
  const all: UnifiedAction[] = [];

  // ── Seuil de l'équipe prioritaire (EW + Gear) ───────────────────────────────
  thresholdResult.checks.forEach((check, i) => {
    all.push({
      id: `threshold_${i}`,
      kind: 'threshold',
      category: check.category,
      label: check.label,
      urgency: check.met ? 'done' : 'urgent',
      isPrimary: true,
      score: check.met ? -1 : 90000 - i * 100,
    });
  });

  // ── Recommandations EW + Gear ──────────────────────────────────────────────
  recos.forEach((reco, i) => {
    all.push({
      id: `reco_${i}`,
      kind: 'reco',
      category: reco.type === 'ew' ? 'ew' : 'gear',
      label: reco.label,
      urgency: reco.urgency,
      isPrimary: reco.isPrimary,
      score: reco.score,
      heroId: reco.heroId,
      team: reco.team,
    });
  });

  // ── Recommandations Étoiles ────────────────────────────────────────────────
  const teamScore = getTeamWeights(teamOrder);

  for (const hero of heroes) {
    const ph = getHero(playerHeroes, hero.id);
    if (ph.stars >= 5) continue;

    const tScore   = teamScore[hero.team];
    const isPriorityTeam = hero.team === priorityTeam;
    const nextStar = ph.stars + 1;
    const unlockEW = nextStar === 5; // 5★ débloque l'AE
    const starMult = unlockEW ? 8 : nextStar === 4 ? 3 : nextStar === 2 ? 2 : 1;
    const baseScore = tScore * hero.teamPriority * starMult * 10;
    const isPrimary = isPriorityTeam || thresholdResult.allMet;
    const score     = isPrimary ? baseScore : baseScore * 0.3;

    const label = ph.stars === 0
      ? `${hero.name} — Débloquer (premier recrutement)`
      : `${hero.name} — ${ph.stars}★ → ${nextStar}★${unlockEW ? ' · débloque Arme Exclusive' : ''}`;

    all.push({
      id: `stars_${hero.id}`,
      kind: 'reco',
      category: 'stars',
      label,
      urgency: unlockEW && isPriorityTeam ? 'urgent' : unlockEW ? 'recommended' : 'optional',
      isPrimary,
      score,
      heroId: hero.id,
      team: hero.team,
    });
  }

  // ── Recommandations Compétences ────────────────────────────────────────────
  const SKILL_NAMES: Record<keyof SkillLevels, string> = {
    tactics: 'Tactique', autoAttack: 'Auto Attaque', passive: 'Passif',
  };

  /** Ordre de priorité par rôle (Notion) : retourne 3 = haute, 2 = moyenne, 1 = basse */
  function skillPrioScore(key: keyof SkillLevels, role: HeroRole): number {
    if (role === 'DPS') return key === 'tactics' ? 3 : key === 'autoAttack' ? 2 : 1;
    return key === 'tactics' ? 3 : key === 'passive' ? 2 : 1;
  }

  const SKILL_MILESTONE_STEPS = [10, 20, 30];

  for (const hero of heroes) {
    const ph = getHero(playerHeroes, hero.id);
    if (ph.stars < 2) continue; // skills non débloquées

    const tScore  = teamScore[hero.team];
    const isPriorityTeam = hero.team === priorityTeam;
    const maxSkill = maxSkillLevel(ph.ew);

    const skillKeys: (keyof SkillLevels)[] = ['tactics', 'autoAttack', 'passive'];
    for (const key of skillKeys) {
      const level = ph.skills[key];
      if (level >= maxSkill) continue;

      const nextMilestone = SKILL_MILESTONE_STEPS.find(m => m > level && m <= maxSkill) ?? maxSkill;
      if (nextMilestone <= level) continue;

      const prioScore = skillPrioScore(key, hero.role);
      const distance  = nextMilestone - level;
      const baseScore = tScore * hero.teamPriority * prioScore * (31 - distance);
      const isPrimary = isPriorityTeam || thresholdResult.allMet;
      const score     = isPrimary ? baseScore : baseScore * 0.3;

      const label = `${hero.name} — ${SKILL_NAMES[key]} niv.${level} → ${nextMilestone}`;

      all.push({
        id: `skills_${hero.id}_${key}`,
        kind: 'reco',
        category: 'skills',
        label,
        urgency: distance <= 5 ? 'urgent' : prioScore === 3 ? 'recommended' : 'optional',
        isPrimary,
        score,
        heroId: hero.id,
        team: hero.team,
      });
    }
  }

  // ── Grouper par catégorie, triés par score (sans les optionnels) ─────────────
  const byCategory = (cat: ActionCategory) =>
    all.filter(a => a.category === cat && a.urgency !== 'optional').sort((a, b) => b.score - a.score);

  return {
    ew:     byCategory('ew'),
    stars:  byCategory('stars'),
    skills: byCategory('skills'),
    gear:   byCategory('gear'),
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function defaultPlayerHero(heroId: string): PlayerHero {
  return { heroId, level: 0, stars: 0, ew: 0, gear: { ...DEFAULT_GEAR }, skills: { ...DEFAULT_SKILLS } };
}

/** Niveau max de skill selon l'EW (base 30, +1 par tranche de 3 EW au-delà, max 40). */
export function maxSkillLevel(ew: number): number {
  return Math.min(40, 30 + Math.floor(ew / 3));
}

export function getGearSlotLabel(slot: GearSlot): string {
  return slotLabel(slot);
}

export function getGearSlotPriorityLabel(slot: GearSlot, role: HeroRole): string {
  const r = getSlotRelevance(slot, role);
  if (r === 2) return '#1';
  if (r === 1) return '#2';
  return '';
}
