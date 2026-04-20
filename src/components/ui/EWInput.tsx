import { EW_MILESTONES } from '../../utils/hero.utils';
import styles from './EWInput.module.css';

interface EWInputProps {
  value: number;      // 0–30
  target: number;     // ewTarget du héros (1, 10, 20 ou 30)
  heroStars: number;  // 0–5 — l'AE nécessite 5★
  onChange: (value: number) => void;
}

const EW_MILESTONE_LABELS: Record<number, string> = {
  1:  'Déblocage',
  10: 'Palier 1',
  20: '+7.5%',
  30: 'Max',
};

export function EWInput({ value, target, heroStars, onChange }: EWInputProps) {
  const locked = heroStars < 5;
  const fillPct = `${(value / 30) * 100}%`;

  return (
    <div className={`${styles.wrapper} ${locked ? styles.locked : ''}`}>
      <div className={styles.header}>
        <span className={styles.label}>⚔ Arme Exclusive</span>
        {locked
          ? <span className={styles.lockHint}>5★ requis</span>
          : <span className={styles.value}>{value}/30</span>
        }
      </div>

      <div className={styles.sliderSection}>
        <input
          type="range"
          min={0}
          max={30}
          step={1}
          value={value}
          disabled={locked}
          onChange={e => onChange(parseInt(e.target.value))}
          className={styles.slider}
          style={{ '--fill-pct': fillPct } as React.CSSProperties}
        />

        {/* Marqueurs de paliers */}
        <div className={styles.milestoneRow}>
          {EW_MILESTONES.map(m => (
            <span
              key={m}
              className={`
                ${styles.milestoneTick}
                ${value >= m ? styles.milestoneReached : ''}
                ${m > target ? styles.milestoneOutOfScope : ''}
              `}
              style={{ left: `${(m / 30) * 100}%` }}
              title={EW_MILESTONE_LABELS[m]}
            >
              {EW_MILESTONE_LABELS[m]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
