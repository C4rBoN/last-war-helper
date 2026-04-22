# CLAUDE.md — Last War Helper

## What this app does
Companion web app for the mobile strategy game **Last War: Survival**. Tracks player progression (heroes, buildings, research) and generates smart upgrade priorities based on HQ level.

## Tech stack
- React 18 + TypeScript 5 + Vite 5
- React Router DOM 6 with **HashRouter** (no server-side routing)
- CSS Modules (zero UI library)
- Context API + useReducer for state
- localStorage persistence (key: `lastwar_helper_v1`, schema v6)
- Bilingual: French / English via `src/i18n/`

## Routes
| Path | Page | Purpose |
|------|------|---------|
| `/` | Dashboard | HQ setup modal, top 3 cross-category priorities |
| `/heroes` | Heroes | 15 heroes across 3 teams |
| `/buildings` | Buildings | 17 buildings, gap detection |
| `/research` | Research | 9 tech trees with dependency graph |

## Data layer (`src/data/`)
- **`heroes.data.ts`** — 15 `HeroDefinition[]` with `ewTarget`, `teamPriority`, bilingual `skillNames`/`skillNamesFr`
- **`buildings.data.ts`** — 17 `BuildingDefinition[]` with `hqRequired`, `priorityRank` (0-12), `category`
- **`research.data.ts`** — 9 `ResearchTree[]` with `nodes[]`, each node has `prerequisiteIds[]` and `priorityGroup`
- **`hqCaps.data.ts`** — 35-row table mapping HQ level → `{maxBuildingLevel, maxHeroStarLevel, maxHeroStarTier, unlocksResearchTrees[]}`

## State (`src/store/`)
- **`AppContext.tsx`** — Provider with `useReducer`, auto-saves to localStorage, runs migration on load
- **`appReducer.ts`** — Handles: `SET_HQ_LEVEL`, `UPDATE_HERO`, `SET_HERO_STARS`, `SET_HERO_EW`, `SET_HERO_GEAR`, `SET_HERO_SKILLS`, `UPDATE_BUILDING_LEVEL`, `TOGGLE_RESEARCH_COMPLETE`, `SET_RESEARCH_IN_PROGRESS`, `SET_LANGUAGE`, `RESET_ALL`
- **`selectors.ts`** — `getPlayerHero()`, `getPlayerBuilding()`, `getCompletedResearchIds()`, `getBuildingsBehindHQ()`

## Key business logic (`src/utils/`)

### `hero.utils.ts`
- `getGearPriorityOrder(role)` — slot order by role (DPS: canon→puce→radar→armor; Tank: armor→radar→canon→puce)
- `gearSlotProgress(slot)` — score 0-80 (level contributes 0-40, stars ×8 when at level 40)
- `EW_MILESTONES = [1, 10, 20, 30]`
- `checkT1Thresholds(heroes)` — validates 8 hard requirements for 5 specific T1 heroes; returns `{allMet, checks[], metCount}`
- `computeHeroRecos()` — scoring considers team priority, distance to next EW milestone, gear relevance, T1 gate
- `computeUnifiedActions()` — merges threshold checks + recommendations into categorized action lists

### `priority.utils.ts`
- Building score: `gap × 10 + (13 - priorityRank) × 15 + contextBonus`
  - Tech Center: +10,000 | Gear Factory (both ≥20): +8,000 | Hospital: +2,000
- Research score: group base (critical=500, high=400, medium=300, low=200, endgame=100) − `priorityOrder × 5` + in-progress bonus 50
- Dashboard top priorities: one hero + one building + one research item

### `hq.utils.ts`
- `getHQCapForLevel(level)` — lookup into `hqCaps.data.ts`
- `formatStars(starLevel, starTier)` — renders `"★X TX"`

## Custom hooks (`src/hooks/`)
- **`usePriorities.ts`** — `useHeroPriorities()`, `useBuildingPriorities()`, `useResearchPriorities()`, `useTopPriorities()`, `useHeroData()`
- **`useHQConstraints.ts`** — returns `{hqLevel, cap}` for gating features

## UI components (`src/components/ui/`)
| Component | Key props |
|-----------|-----------|
| `LevelInput` | `value`, `min`, `max`, `onChange` — slider + number field |
| `EWInput` | `value`, `ewTarget`, `locked` — 0-30 with milestone markers at 1/10/20/30 |
| `GearStarInput` | `slot`, `role`, `value: {level, stars}` — level 0-40, stars 0-5 (only at level 40) |
| `SkillsInput` | `skills`, `heroRole`, `ewLevel`, `heroStars` — 3 skills, locked until 2★ |
| `StarSelector` | `value` (1-5), `onChange` |
| `Badge` | `variant`: priority/category/tier/rarity/unitType |
| `Card` | `highlight`: urgent/accent/success |

## Game mechanics summary

### Heroes
- 3 teams: T1 (Tank, 5 heroes), T2 (Aircraft, 5 heroes), T3 (Missile, 5 heroes)
- Stars 1-5: 2★ unlocks skills, 4★ = Super Sensing +20%, 5★ = EW prerequisite
- EW 0-30 milestones: 1 / 10 / 20 / 30
- Skills: Tactics + AutoAttack + Passive, max = 30 + floor((EW-30)/3) if EW>30 (not used here since EW max is 30)
- Gear: canon (offense), puce/chip (offense), armor (defense), radar (defense) — level 0-40 + stars 0-5 at cap

### T1 Threshold (hard gate before T2/T3)
| Hero | EW req | Gear req |
|------|--------|---------|
| Kimberly | 30 | canon + puce: level 40, ≥3★ |
| Murphy | ≥20 | armor + radar: level 40, ≥3★ |
| Stetmann | ≥20 | canon + puce: level 40, ≥3★ |
| Marshall | ≥20 | — |
| Williams | ≥20 | — |

### Buildings
- 17 buildings, HQ is the cap for all others (max level = HQ level)
- Gap ≥3 = urgent; gap ≥1 = recommended
- Special: Tech Center (#1 bottleneck), Gear Factory (stars at level 20+), Hospital (always upgrade)

### Research
- 9 trees: Development, Economy, Hero, Units, Alliance Duel, Special Forces, Intercity Truck, Garage, Age of Oil
- Each node has: `hqRequired`, `prerequisiteIds[]`, `priorityGroup`, `priorityOrder`
- Priority groups: critical → high → medium → low → endgame

## i18n
```ts
import { t } from '../i18n';
t(lang, 'some.key')           // simple
t(lang, 'key.with.param', { count: 3 })  // uses {{count}} placeholders
```
Lang is `'fr' | 'en'` from context.

## Conventions
- CSS Modules only — no inline styles, no Tailwind
- All text through `t()` — no hardcoded strings in JSX
- Data definitions in `src/data/`, never inline in components
- Selectors never mutate — always return derived values
- Schema migration in `AppContext.tsx` when adding new persisted fields
