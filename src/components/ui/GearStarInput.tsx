import { GearSlot, GearSlotValue, HeroRole } from '../../types/hero.types';
import { getSlotRelevance } from '../../utils/hero.utils';
import styles from './GearStarInput.module.css';

interface GearStarInputProps {
  slot: GearSlot;
  label: string;
  value: GearSlotValue;
  role: HeroRole;
  onChange: (value: GearSlotValue) => void;
  showAlert?: boolean;
}

const SLOT_ICONS: Record<GearSlot, string> = {
  canon: '🔫',
  puce:  '💾',
  armor: '🛡',
  radar: '📡',
};

const GEAR_MILESTONES = [10, 20, 30, 40];

export function GearStarInput({ slot, label, value, role, onChange, showAlert }: GearStarInputProps) {
  const relevance = getSlotRelevance(slot, role);
  const isUseless = relevance === 0;
  const isPriority = relevance === 2;
  const at40 = value.level >= 40;
  const isMaxed = at40 && value.stars >= 5;
  const fillPct = `${(value.level / 40) * 100}%`;

  function handleLevelChange(newLevel: number) {
    onChange({ level: newLevel, stars: newLevel < 40 ? 0 : value.stars });
  }

  function handleStarClick(star: number) {
    onChange({ level: 40, stars: value.stars === star ? star - 1 : star });
  }

  return (
    <div className={`${styles.wrapper} ${showAlert ? styles.alert : ''}`}>

      {/* ── En-tête ── */}
      <div className={styles.header}>
        <span className={styles.icon}>{SLOT_ICONS[slot]}</span>
        <span className={styles.label}>{label}</span>
        {isPriority && <span className={styles.priorityTag}>priorité</span>}
        {showAlert && <span className={styles.alertIcon} title="Pièce offensive inutile sur ce rôle">⚠</span>}
        {isMaxed && <span className={styles.maxTag}>MAX</span>}
      </div>

      {/* ── Niveau 0–40 : slider ── */}
      <div className={styles.sliderSection}>
        <div className={styles.sliderRow}>
          <input
            type="range"
            min={0}
            max={40}
            step={1}
            value={value.level}
            onChange={e => handleLevelChange(parseInt(e.target.value))}
            className={styles.slider}
            style={{ '--fill-pct': fillPct } as React.CSSProperties}
          />
          <span className={styles.levelValue}>
            {value.level}<span className={styles.levelMax}>/40</span>
          </span>
        </div>

        {/* Marqueurs de paliers */}
        <div className={styles.milestoneRow}>
          {GEAR_MILESTONES.map(m => (
            <span
              key={m}
              className={`${styles.milestoneTick} ${value.level >= m ? styles.milestoneTickReached : ''}`}
              style={{ left: `${(m / 40) * 100}%` }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* ── Étoiles (actives uniquement à niv. 40) ── */}
      <div className={`${styles.starsRow} ${!at40 ? styles.starsLocked : ''}`}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            className={`${styles.star} ${star <= value.stars ? styles.starFilled : ''}`}
            onClick={() => at40 && handleStarClick(star)}
            disabled={!at40}
            title={at40 ? `${star}★` : "Atteins le niveau 40 d'abord"}
          >★</button>
        ))}
        {at40
          ? <span className={styles.starsValue}>{value.stars}/5</span>
          : <span className={styles.starsHint}>niv. 40 requis</span>
        }
      </div>

    </div>
  );
}
