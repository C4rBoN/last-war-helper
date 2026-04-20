import { useAppContext } from '../store/AppContext';
import { getHQCapForLevel } from '../utils/hq.utils';

export function useHQConstraints() {
  const { state } = useAppContext();
  const hqLevel = state.profile.hqLevel;
  const cap = getHQCapForLevel(hqLevel);
  return { hqLevel, cap };
}
