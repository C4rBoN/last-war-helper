import { SkillLevels, SkillNames } from '../../types/hero.types';
import { HeroRole } from '../../types/hero.types';
import { maxSkillLevel } from '../../utils/hero.utils';
import styles from './SkillsInput.module.css';

interface SkillsInputProps {
  value: SkillLevels;
  heroStars: number;
  ew: number;
  role: HeroRole;
  skillNames?: SkillNames;
  onChange: (skills: SkillLevels) => void;
}

const SKILL_MILESTONES = [10, 20, 30];

/** Ordre de priorité par rôle (Notion). */
function skillPriority(key: keyof SkillLevels, role: HeroRole): 'high' | 'mid' | 'low' {
  if (role === 'DPS') {
    return key === 'tactics' ? 'high' : key === 'autoAttack' ? 'mid' : 'low';
  }
  return key === 'tactics' ? 'high' : key === 'passive' ? 'mid' : 'low';
}

const DEFAULT_LABELS: Record<keyof SkillLevels, string> = {
  tactics:    'Tactique',
  autoAttack: 'Auto Attaque',
  passive:    'Passif',
};

const PRIORITY_LABEL: Record<string, string> = {
  high: 'priorité',
  mid:  '',
  low:  'dernier',
};

export function SkillsInput({ value, heroStars, ew, role, skillNames, onChange }: SkillsInputProps) {
  const locked = heroStars < 2;
  const max = locked ? 0 : maxSkillLevel(ew);

  function handleChange(key: keyof SkillLevels, newVal: number) {
    onChange({ ...value, [key]: Math.max(0, Math.min(max, newVal)) });
  }

  const skills: (keyof SkillLevels)[] = ['tactics', 'autoAttack', 'passive'];

  return (
    <div className={`${styles.wrapper} ${locked ? styles.locked : ''}`}>
      <div className={styles.header}>
        <span className={styles.title}>⚡ Compétences</span>
        {locked
          ? <span className={styles.lockHint}>2★ requis</span>
          : <span className={styles.maxHint}>max {max}</span>
        }
      </div>

      <div className={styles.skillList}>
        {skills.map(key => {
          const level = value[key];
          const fillPct = max > 0 ? `${(level / max) * 100}%` : '0%';
          const prio = skillPriority(key, role);
          return (
            <div key={key} className={styles.skillRow}>
              <div className={styles.skillHeader}>
                <span className={styles.skillName}>
                  {skillNames?.[key] ?? DEFAULT_LABELS[key]}
                  {skillNames?.[key] && (
                    <span className={styles.skillType}> — {DEFAULT_LABELS[key]}</span>
                  )}
                </span>
                {PRIORITY_LABEL[prio] && (
                  <span className={`${styles.prioTag} ${styles[`prio_${prio}`]}`}>
                    {PRIORITY_LABEL[prio]}
                  </span>
                )}
                <span className={styles.skillValue}>{level}<span className={styles.skillMax}>/{max}</span></span>
              </div>

              <div className={styles.sliderRow}>
                <input
                  type="range"
                  min={0}
                  max={max}
                  step={1}
                  value={level}
                  disabled={locked}
                  onChange={e => handleChange(key, parseInt(e.target.value))}
                  className={styles.slider}
                  style={{ '--fill-pct': fillPct } as React.CSSProperties}
                />
              </div>

              {/* Marqueurs de paliers */}
              <div className={styles.milestoneRow}>
                {SKILL_MILESTONES.map(m => m <= max && (
                  <span
                    key={m}
                    className={`${styles.milestoneTick} ${level >= m ? styles.milestoneReached : ''}`}
                    style={{ left: `${(m / max) * 100}%` }}
                  >
                    {m}
                  </span>
                ))}
                {max > 30 && (
                  <span
                    className={`${styles.milestoneTick} ${styles.milestoneEW} ${level >= max ? styles.milestoneReached : ''}`}
                    style={{ left: '100%' }}
                  >
                    {max}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
