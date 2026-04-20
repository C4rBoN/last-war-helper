import { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import { t } from '../../i18n';
import { Button } from '../../components/ui/Button';
import styles from './HQSetup.module.css';

export function HQSetup() {
  const { state, dispatch } = useAppContext();
  const lang = state.language;
  const [level, setLevel] = useState(state.profile.hqLevel || 1);

  function handleConfirm() {
    dispatch({ type: 'SET_HQ_LEVEL', payload: level });
    dispatch({ type: 'COMPLETE_SETUP' });
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>⚔</div>
        <h1 className={styles.title}>{t(lang, 'setup.title')}</h1>
        <p className={styles.subtitle}>{t(lang, 'setup.subtitle')}</p>

        <label className={styles.label}>{t(lang, 'setup.hq_label')}</label>

        <div className={styles.levelPicker}>
          <button className={styles.stepBtn} onClick={() => setLevel(l => Math.max(1, l - 1))}>−</button>
          <div className={styles.levelDisplay}>{level}</div>
          <button className={styles.stepBtn} onClick={() => setLevel(l => Math.min(35, l + 1))}>+</button>
        </div>

        <input
          type="range"
          min={1}
          max={35}
          value={level}
          onChange={e => setLevel(parseInt(e.target.value))}
          className={styles.slider}
        />
        <div className={styles.sliderLabels}>
          <span>1</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>35</span>
        </div>

        <Button onClick={handleConfirm} size="lg" fullWidth>
          {t(lang, 'setup.confirm')}
        </Button>
      </div>
    </div>
  );
}
