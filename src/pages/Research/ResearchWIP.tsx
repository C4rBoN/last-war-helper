import { useAppContext } from '../../store/AppContext';
import styles from './ResearchWIP.module.css';

export function ResearchWIP() {
  const { state } = useAppContext();
  const lang = state.language as 'fr' | 'en';

  return (
    <div className={styles.container}>
      <span className={styles.icon}>🔬</span>
      <h2 className={styles.title}>
        {lang === 'fr' ? 'En construction' : 'Under Construction'}
      </h2>
      <p className={styles.subtitle}>
        {lang === 'fr'
          ? 'La section Recherche arrive bientôt.'
          : 'The Research section is coming soon.'}
      </p>
    </div>
  );
}
