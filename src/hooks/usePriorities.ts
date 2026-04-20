import { useMemo } from 'react';
import { useAppContext } from '../store/AppContext';
import {
  computeHeroPriorities,
  computeBuildingPriorities,
  computeResearchPriorities,
  computeTopPriorities,
} from '../utils/priority.utils';
import { computeUnifiedActions } from '../utils/hero.utils';
import { HEROES } from '../data/heroes.data';

export function useHeroPriorities() {
  const { state } = useAppContext();
  return useMemo(() => computeHeroPriorities(state), [state]);
}

export function useBuildingPriorities() {
  const { state } = useAppContext();
  return useMemo(() => computeBuildingPriorities(state), [state]);
}

export function useResearchPriorities() {
  const { state } = useAppContext();
  return useMemo(() => computeResearchPriorities(state), [state]);
}

export function useTopPriorities() {
  const { state } = useAppContext();
  return useMemo(() => computeTopPriorities(state), [state]);
}

export function useHeroData() {
  const { state } = useAppContext();
  return useMemo(() => computeUnifiedActions(HEROES, state.heroes), [state.heroes]);
}
