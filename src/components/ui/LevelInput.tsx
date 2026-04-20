import styles from './LevelInput.module.css';

interface LevelInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function LevelInput({ value, min = 0, max = 35, onChange, disabled }: LevelInputProps) {
  const fillPct = `${((value - min) / (max - min)) * 100}%`;

  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(parseInt(e.target.value));
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v) && v >= min && v <= max) onChange(v);
  }

  return (
    <div className={styles.wrapper}>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        disabled={disabled}
        onChange={handleSlider}
        className={styles.slider}
        style={{ '--fill-pct': fillPct } as React.CSSProperties}
      />
      <input
        type="number"
        className={styles.input}
        value={value}
        min={min}
        max={max}
        onChange={handleInput}
        disabled={disabled}
      />
    </div>
  );
}
