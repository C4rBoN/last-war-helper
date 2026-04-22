# Last War Helper

Companion app for the mobile strategy game **Last War: Survival**, helping players optimize their hero development, building upgrades, and research progression.

**Live:** https://c4rbon.github.io/last-war-helper/

---

## Features

- **Dashboard** — Top cross-category priorities based on your HQ level
- **Heroes** — Track stars, Exclusive Weapon (EW), gear slots, and skills for 15 heroes across 3 teams (T1 Tank / T2 Aircraft / T3 Missile)
- **Buildings** — Monitor 17 buildings, detect gaps vs. your HQ level, prioritize Tech Center and Gear Factory
- **Research** — Track 9 tech trees with dependency graphs and priority tiers
- **Smart priorities** — Context-aware recommendations (T1 threshold gate, Tech Center bottleneck, Hospital urgency)
- **Bilingual** — French / English
- **Offline-first** — All data persisted in localStorage, no account needed

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript 5 |
| Routing | React Router DOM 6 (HashRouter) |
| Build | Vite 5 |
| Styling | CSS Modules (no UI library) |
| State | Context API + useReducer |
| Persistence | localStorage (schema v6, auto-migration) |

---

## Project Structure

```
src/
├── App.tsx                  # Routes: / /heroes /buildings /research
├── pages/
│   ├── Dashboard/           # HQ setup, top priorities
│   ├── Heroes/              # 15 heroes, stars/EW/gear/skills
│   ├── Buildings/           # 17 buildings, gap detection
│   └── Research/            # 9 trees, dependency graph
├── components/
│   ├── layout/              # AppShell, TopBar, BottomNav
│   └── ui/                  # Card, Badge, Button, LevelInput, EWInput, GearStarInput, SkillsInput
├── data/
│   ├── heroes.data.ts       # 15 HeroDefinitions (ewTarget, teamPriority, skillNames)
│   ├── buildings.data.ts    # 17 BuildingDefinitions (hqRequired, priorityRank)
│   ├── research.data.ts     # 9 trees with nodes and dependency graphs
│   └── hqCaps.data.ts       # HQ 1-35 caps (building/hero/research unlock table)
├── store/
│   ├── AppContext.tsx        # useReducer + localStorage, schema migration
│   ├── appReducer.ts        # Action handlers
│   ├── actions.ts           # Action type union
│   └── selectors.ts         # Query helpers
├── hooks/
│   ├── usePriorities.ts     # Memoized hero/building/research priority computation
│   └── useHQConstraints.ts  # HQ-derived constraint helpers
├── utils/
│   ├── hero.utils.ts        # Gear scoring, EW milestones, T1 threshold checks, recommendations
│   ├── priority.utils.ts    # Cross-domain scoring and sorting
│   └── hq.utils.ts          # HQ cap lookups, star formatting
├── i18n/
│   ├── index.ts             # t(lang, key, params) with {{placeholder}} interpolation
│   ├── en.ts                # English translations
│   └── fr.ts                # French translations
└── types/                   # player, hero, building, research, priority types
```

---

## Game Mechanics Modeled

### Hero System
- **15 heroes** in 3 teams of 5 (T1 Tank priority team, T2 Aircraft, T3 Missile)
- **Stars** (1-5): unlock skills at 2★, +20% at 4★, EW prerequisite at 5★
- **EW** (0-30): milestones at 1/10/20/30 — major power spikes
- **Skills**: Tactics / AutoAttack / Passive, max level 30 + bonus from EW
- **Gear**: 4 slots (canon, puce, armor, radar), level 0-40 + stars 0-5 at level 40

### T1 Threshold Gate
Hard requirements before investing in T2/T3:
- Kimberly: EW 30, canon/puce level 40 ≥3★
- Murphy: EW ≥20, armor/radar level 40 ≥3★
- Stetmann: EW ≥20, canon/puce level 40 ≥3★
- Marshall, Williams: EW ≥20

### Building System
- HQ level (1-35) gates all other buildings
- Buildings lagging ≥3 behind HQ = urgent; ≥1 = recommended
- **Tech Center** = research bottleneck (#1 priority bonus)
- **Gear Factory** = unlock gear stars when both at level 20+
- **Hospital** = always upgrade (permanent troop loss if full)

### Research System
- 9 trees unlocked at specific HQ levels
- Priority tiers: critical > high > medium > low > endgame
- Nodes have prerequisite dependencies (must complete parent first)

---

## Local Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
npm run preview    # preview production build
```

---

## Data Import / Export

Use the export/import buttons in the TopBar to save or restore your progress as a JSON file.
