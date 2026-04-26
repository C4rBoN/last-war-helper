import { useState, useEffect } from 'react';
import { useAppContext } from '../../store/AppContext';
import { t } from '../../i18n';
import { BUILDINGS } from '../../data/buildings.data';
import { getMissingPrereqs } from '../../data/hqPrerequisites.data';
import { useBuildingPriorities } from '../../hooks/usePriorities';
import { useHQConstraints } from '../../hooks/useHQConstraints';
import { getPlayerBuilding } from '../../store/selectors';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { LevelInput } from '../../components/ui/LevelInput';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { BuildingCategory, BuildingDefinition } from '../../types/building.types';
import styles from './Buildings.module.css';

const CATEGORY_ORDER: BuildingCategory[] = ['core', 'military', 'defense', 'economy', 'support'];

// ─── Building Card with draft state ──────────────────────────────────────────

function BuildingCardItem({ building, savedLevel, hqLevel, prereq }: {
  building: BuildingDefinition;
  savedLevel: number;
  hqLevel: number;
  prereq?: { requiredLevel: number; nextHQ: number };
}) {
  const { state, dispatch } = useAppContext();
  const lang = state.language;
  const [draft, setDraft] = useState(savedLevel);
  const isDirty = draft !== savedLevel;

  useEffect(() => { setDraft(savedLevel); }, [savedLevel]);
  const isHQ = building.id === 'hq';
  const locked = building.hqRequired > hqLevel;
  const gap = savedLevel > 0 ? hqLevel - savedLevel : 0;
  const atCap = savedLevel >= hqLevel && savedLevel > 0;
  const isPrereqMissing = !locked && prereq !== undefined && savedLevel < prereq.requiredLevel;

  function handleSave() {
    if (isHQ) dispatch({ type: 'SET_HQ_LEVEL', payload: draft });
    dispatch({ type: 'UPDATE_BUILDING_LEVEL', payload: { buildingId: building.id, level: draft } });
  }

  function handleCancel() {
    setDraft(savedLevel);
  }

  return (
    <Card
      className={`${styles.buildingCard} ${locked ? styles.locked : ''}`}
      highlight={isPrereqMissing || (gap >= 3 && !locked) ? 'urgent' : gap >= 1 && !locked ? 'accent' : undefined}
    >
      <div className={styles.buildingTop}>
        {building.imageUrl
          ? <img src={building.imageUrl} alt={building.id} className={styles.buildingIcon} loading="lazy" />
          : <span className={styles.buildingIconFallback} />
        }
        <div className={styles.buildingInfo}>
          <span className={styles.buildingName}>{t(lang, building.nameKey)}</span>
          {locked ? (
            <span className={styles.lockedTag}>{t(lang, 'buildings.locked', { level: building.hqRequired })}</span>
          ) : atCap ? (
            <span className={styles.capTag}>{t(lang, 'buildings.at_cap')}</span>
          ) : savedLevel > 0 && gap > 0 ? (
            <span className={styles.behindTag}>{t(lang, 'buildings.behind', { gap })}</span>
          ) : null}
          {isPrereqMissing && (
            <span className={styles.prereqTag}>
              {t(lang, 'buildings.hq_prereq_tag', { level: prereq!.requiredLevel, next: prereq!.nextHQ })}
            </span>
          )}
          {isDirty && <span className={styles.dirtyDot} title={t(lang, 'buildings.unsaved')}>●</span>}
        </div>
        {!locked && (
          <LevelInput
            value={draft}
            min={0}
            max={isHQ ? 35 : hqLevel}
            onChange={setDraft}
          />
        )}
      </div>


      {isDirty && (
        <div className={styles.draftBar}>
          <span className={styles.draftHint}>{t(lang, 'buildings.unsaved')}</span>
          <button className={styles.cancelBtn} onClick={handleCancel}>{t(lang, 'buildings.cancel')}</button>
          <button className={styles.saveBtn} onClick={handleSave}>{t(lang, 'buildings.save')}</button>
        </div>
      )}
    </Card>
  );
}

export function Buildings() {
  const { state } = useAppContext();
  const lang = state.language;
  const { hqLevel } = useHQConstraints();
  const priorities = useBuildingPriorities();

  const nextHQ = hqLevel + 1;
  const getLevel = (id: string) => getPlayerBuilding(state, id).currentLevel;
  const missingPrereqMap = getMissingPrereqs(hqLevel, getLevel);

  const behindCount = BUILDINGS.filter(b => {
    if (b.id === 'hq' || b.hqRequired > hqLevel) return false;
    const pb = getPlayerBuilding(state, b.id);
    return pb.currentLevel > 0 && pb.currentLevel < hqLevel;
  }).length;

  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    acc[cat] = BUILDINGS.filter(b => b.category === cat);
    return acc;
  }, {} as Record<BuildingCategory, typeof BUILDINGS>);

  return (
    <div className={styles.page}>
      {/* Alert */}
      {behindCount > 0 && (
        <Card highlight="urgent" className={styles.alert}>
          <span className={styles.alertIcon}>⚠</span>
          <span>{t(lang, 'buildings.behind_alert', { count: behindCount })}</span>
        </Card>
      )}

      {/* Priority list */}
      {priorities.length > 0 && (
        <>
          <SectionHeader title={t(lang, 'buildings.priority_list')} />
          <div className={styles.priorityList}>
            {priorities.slice(0, 5).map((item, i) => {
              const buildingId = item.id.replace('building_', '');
              const isAnyCombat = buildingId === 'any_combat_center';
              const building = isAnyCombat ? null : BUILDINGS.find(b => b.id === buildingId);
              if (!isAnyCombat && !building) return null;
              const pb = building ? getPlayerBuilding(state, buildingId) : null;
              const gap = pb ? hqLevel - pb.currentLevel : (item.reasonParams?.gap ?? 0);
              return (
                <Card key={item.id} highlight={item.priorityLevel === 'urgent' ? 'urgent' : undefined} className={styles.priorityItem}>
                  <span className={styles.priorityRank}>#{i + 1}</span>
                  <div className={styles.priorityInfo}>
                    <span className={styles.priorityName}>{t(lang, item.titleKey)}</span>
                    <span className={styles.priorityReason}>
                      {t(lang, item.reasonKey, { ...(item.reasonParams ?? {}), name: building ? t(lang, building.nameKey) : '', gap })}
                    </span>
                  </div>
                  <Badge variant={item.priorityLevel} label={t(lang, `priority.${item.priorityLevel}`)} small />
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* Buildings by category */}
      {CATEGORY_ORDER.map(cat => {
        const catBuildings = grouped[cat];
        if (!catBuildings?.length) return null;

        return (
          <div key={cat}>
            <SectionHeader title={t(lang, `buildings.category.${cat}`)} />
            <div className={styles.buildingList}>
              {catBuildings.map(building => {
                const pb = getPlayerBuilding(state, building.id);
                const reqLevel = missingPrereqMap.get(building.id);
                return (
                  <BuildingCardItem
                    key={building.id}
                    building={building}
                    savedLevel={pb.currentLevel}
                    hqLevel={hqLevel}
                    prereq={reqLevel !== undefined ? { requiredLevel: reqLevel, nextHQ } : undefined}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
