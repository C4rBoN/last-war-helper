import { useAppContext } from '../../store/AppContext';
import { t } from '../../i18n';
import { RESEARCH_TREES } from '../../data/research.data';
import { useResearchPriorities } from '../../hooks/usePriorities';
import { useHQConstraints } from '../../hooks/useHQConstraints';
import { getCompletedResearchIds, getInProgressResearchIds } from '../../store/selectors';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { ResearchPriorityGroup } from '../../types/research.types';
import styles from './Research.module.css';

const GROUP_ORDER: ResearchPriorityGroup[] = ['critical', 'high', 'medium', 'low', 'endgame'];

function groupColor(group: ResearchPriorityGroup): string {
  const map: Record<ResearchPriorityGroup, string> = {
    critical: 'var(--danger)',
    high:     'var(--accent)',
    medium:   'var(--info)',
    low:      'var(--text-secondary)',
    endgame:  'var(--rarity-ur)',
  };
  return map[group];
}

export function Research() {
  const { state, dispatch } = useAppContext();
  const lang = state.language;
  const { hqLevel } = useHQConstraints();
  const priorities = useResearchPriorities();
  const completed = getCompletedResearchIds(state);
  const inProgress = getInProgressResearchIds(state);

  // Sort trees: unlocked first (by priority), then locked
  const sortedTrees = [...RESEARCH_TREES].sort((a, b) => {
    const aLocked = a.hqUnlock > hqLevel;
    const bLocked = b.hqUnlock > hqLevel;
    if (aLocked !== bLocked) return aLocked ? 1 : -1;
    const groupDiff = GROUP_ORDER.indexOf(a.priorityGroup) - GROUP_ORDER.indexOf(b.priorityGroup);
    return groupDiff;
  });

  const allAvailableCompleted = RESEARCH_TREES
    .filter(tree => tree.hqUnlock <= hqLevel)
    .flatMap(tree => tree.nodes)
    .filter(n => n.hqRequired <= hqLevel)
    .every(n => completed.has(n.id));

  return (
    <div className={styles.page}>
      {/* Priority list */}
      {priorities.length > 0 && (
        <>
          <SectionHeader title={t(lang, 'research.priority_list')} />
          <div className={styles.priorityList}>
            {priorities.slice(0, 5).map((item, i) => {
              const nodeId = item.id.replace('research_', '');
              const node = RESEARCH_TREES.flatMap(t => t.nodes).find(n => n.id === nodeId);
              if (!node) return null;
              const isIP = inProgress.has(nodeId);
              return (
                <Card key={item.id} highlight={i === 0 && item.priorityLevel === 'urgent' ? 'urgent' : undefined} className={styles.priorityItem}>
                  <span className={styles.priorityRank}>#{i + 1}</span>
                  <div className={styles.priorityInfo}>
                    <span className={styles.priorityName}>{t(lang, node.nameKey)}</span>
                    <span className={styles.priorityReason}>{t(lang, item.reasonKey)}</span>
                  </div>
                  <div className={styles.priorityActions}>
                    <Badge variant={item.priorityLevel} label={t(lang, `priority.${item.priorityLevel}`)} small />
                    {isIP && (
                      <Badge variant="recommended" label={t(lang, 'research.in_progress')} small />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {allAvailableCompleted && (
        <Card highlight="success">
          <p className={styles.allDoneMsg}>{t(lang, 'research.all_done')}</p>
        </Card>
      )}

      {/* Research trees */}
      {sortedTrees.map(tree => {
        const locked = tree.hqUnlock > hqLevel;
        const treeNodes = tree.nodes.filter(n => n.hqRequired <= hqLevel || locked);
        const completedCount = treeNodes.filter(n => completed.has(n.id)).length;
        const totalCount = treeNodes.length;

        return (
          <div key={tree.id} className={`${styles.treeSection} ${locked ? styles.locked : ''}`}>
            <div className={styles.treeHeader}>
              <div className={styles.treeTitle}>
                <span style={{ color: groupColor(tree.priorityGroup) }}>●</span>
                <span>{t(lang, tree.nameKey)}</span>
                {locked && (
                  <span className={styles.lockBadge}>{t(lang, 'research.locked', { level: tree.hqUnlock })}</span>
                )}
              </div>
              {!locked && (
                <span className={styles.treeProgress}>{completedCount}/{totalCount}</span>
              )}
            </div>
            <p className={styles.treeDesc}>{t(lang, tree.descriptionKey)}</p>

            {!locked && (
              <div className={styles.nodeList}>
                {tree.nodes.map(node => {
                  const nodeHQLocked = node.hqRequired > hqLevel;
                  const isCompleted = completed.has(node.id);
                  const isIP = inProgress.has(node.id);
                  const isBlocked = !isCompleted && node.prerequisiteIds.some(pid => !completed.has(pid));

                  return (
                    <div
                      key={node.id}
                      className={`${styles.node}
                        ${isCompleted ? styles.nodeCompleted : ''}
                        ${isIP ? styles.nodeInProgress : ''}
                        ${isBlocked || nodeHQLocked ? styles.nodeBlocked : ''}
                      `}
                    >
                      <button
                        className={styles.nodeCheck}
                        onClick={() => !isBlocked && !nodeHQLocked && dispatch({ type: 'TOGGLE_RESEARCH_COMPLETE', payload: { nodeId: node.id } })}
                        disabled={isBlocked || nodeHQLocked}
                        title={isCompleted ? t(lang, 'research.completed') : t(lang, 'research.mark_complete')}
                      >
                        {isCompleted ? '✓' : isBlocked ? '🔒' : '○'}
                      </button>

                      <div className={styles.nodeInfo}>
                        <span className={styles.nodeName}>{t(lang, node.nameKey)}</span>
                        {nodeHQLocked && (
                          <span className={styles.nodeLockedTag}>{t(lang, 'research.locked', { level: node.hqRequired })}</span>
                        )}
                        {isBlocked && !nodeHQLocked && (
                          <span className={styles.nodeBlockedTag}>{t(lang, 'research.blocked')}</span>
                        )}
                      </div>

                      {!isCompleted && !isBlocked && !nodeHQLocked && (
                        <button
                          className={`${styles.ipBtn} ${isIP ? styles.ipActive : ''}`}
                          onClick={() => dispatch({ type: 'SET_RESEARCH_IN_PROGRESS', payload: { nodeId: node.id, inProgress: !isIP } })}
                          title={t(lang, 'research.mark_in_progress')}
                        >
                          {isIP ? '⏳' : '▶'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Progress bar */}
            {!locked && totalCount > 0 && (
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${(completedCount / totalCount) * 100}%` }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
