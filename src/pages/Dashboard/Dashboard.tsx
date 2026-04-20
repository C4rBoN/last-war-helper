import { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import { t } from '../../i18n';
import { useTopPriorities } from '../../hooks/usePriorities';
import { useHQConstraints } from '../../hooks/useHQConstraints';
import { HQSetup } from './HQSetup';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { PriorityLevel, PriorityCategory } from '../../types/priority.types';
import styles from './Dashboard.module.css';

function priorityHighlight(level: PriorityLevel): 'urgent' | 'accent' | undefined {
  if (level === 'urgent') return 'urgent';
  if (level === 'recommended') return 'accent';
  return undefined;
}

export function Dashboard() {
  const { state, dispatch } = useAppContext();
  const lang = state.language;
  const { hqLevel, cap } = useHQConstraints();
  const topPriorities = useTopPriorities();
  const [editingHQ, setEditingHQ] = useState(false);
  const [pendingHQ, setPendingHQ] = useState(hqLevel);

  if (!state.profile.setupComplete) return <HQSetup />;

  return (
    <div className={styles.page}>
      {/* HQ Summary */}
      <Card className={styles.hqCard} highlight="accent">
        <div className={styles.hqContent}>
          <div>
            <div className={styles.hqTitle}>{t(lang, 'dashboard.hq')} {hqLevel}</div>
            <div className={styles.hqSub}>
              {t(lang, 'dashboard.hero_cap', { star: cap.maxHeroStarLevel, tier: cap.maxHeroStarTier })}
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => { setPendingHQ(hqLevel); setEditingHQ(v => !v); }}>
            {editingHQ ? '✕' : t(lang, 'dashboard.change_hq')}
          </Button>
        </div>
        {editingHQ && (
          <div className={styles.hqEdit}>
            <input
              type="range"
              min={1}
              max={35}
              value={pendingHQ}
              onChange={e => setPendingHQ(parseInt(e.target.value))}
              className={styles.hqSlider}
            />
            <div className={styles.hqEditRow}>
              <span className={styles.hqEditValue}>{t(lang, 'dashboard.hq')} {pendingHQ}</span>
              <Button size="sm" onClick={() => { dispatch({ type: 'SET_HQ_LEVEL', payload: pendingHQ }); setEditingHQ(false); }}>
                OK
              </Button>
            </div>
          </div>
        )}
        {/* HQ Progress bar */}
        <div className={styles.hqBar}>
          <div className={styles.hqBarFill} style={{ width: `${(hqLevel / 35) * 100}%` }} />
        </div>
        <div className={styles.hqBarLabels}>
          <span>QG 1</span>
          <span>{Math.round((hqLevel / 35) * 100)}%</span>
          <span>QG 35</span>
        </div>
      </Card>

      {/* Top priorities */}
      <SectionHeader title={t(lang, 'dashboard.top_priorities')} />

      {topPriorities.length === 0 ? (
        <Card>
          <p className={styles.emptyMsg}>{t(lang, 'dashboard.no_priorities')}</p>
        </Card>
      ) : (
        <div className={styles.priorityList}>
          {topPriorities.map(item => (
            <Card key={item.id} highlight={priorityHighlight(item.priorityLevel)} className={styles.priorityCard}>
              <div className={styles.priorityTop}>
                <Badge variant={item.category as PriorityCategory} label={t(lang, `priority.category.${item.category}`)} small />
                <Badge variant={item.priorityLevel} label={t(lang, `priority.${item.priorityLevel}`)} small />
              </div>
              <div className={styles.priorityTitle}>{t(lang, item.titleKey)}</div>
              <div className={styles.priorityReason}>
                {t(lang, item.reasonKey, item.reasonParams)}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
