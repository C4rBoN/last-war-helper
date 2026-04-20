import styles from './StarSelector.module.css';

interface StarSelectorProps {
  starLevel: number;  // 1-5
  starTier: number;   // 1-5
  onChange: (starLevel: number, starTier: number) => void;
  maxStarLevel?: number;
  maxStarTier?: number;
  disabled?: boolean;
}

export function StarSelector({ starLevel, starTier, onChange, maxStarLevel = 5, maxStarTier = 5, disabled }: StarSelectorProps) {
  function handleChange(level: number, tier: number) {
    if (disabled) return;
    onChange(level, tier);
  }

  return (
    <div className={styles.selector}>
      {[1, 2, 3, 4, 5].map(level => (
        <div key={level} className={styles.starGroup}>
          <button
            className={`${styles.starBtn} ${starLevel === level ? styles.active : ''} ${starLevel > level ? styles.filled : ''}`}
            onClick={() => handleChange(level, starLevel === level ? starTier : 1)}
            disabled={disabled || level > maxStarLevel}
            title={`★${level}`}
          >
            ★
          </button>
          {starLevel === level && (
            <div className={styles.tierRow}>
              {[1, 2, 3, 4, 5].map(tier => (
                <button
                  key={tier}
                  className={`${styles.tierBtn} ${starTier >= tier ? styles.tierFilled : ''}`}
                  onClick={() => handleChange(level, tier)}
                  disabled={disabled || (level === maxStarLevel && tier > maxStarTier)}
                  title={`T${tier}`}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
