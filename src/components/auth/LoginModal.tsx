import { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { useAppContext } from '../../store/AppContext';
import styles from './LoginModal.module.css';

interface Props {
  onClose: () => void;
}

export function LoginModal({ onClose }: Props) {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const { state } = useAppContext();
  const lang = state.language as 'fr' | 'en';

  const [email,   setEmail]   = useState('');
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await signInWithEmail(email);
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  async function handleGoogle() {
    setLoading(true);
    setError('');
    const { error } = await signInWithGoogle();
    if (error) {
      setLoading(false);
      setError(error.message);
    }
    // Google redirige la page, pas besoin de setLoading(false)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Fermer">✕</button>

        <div className={styles.header}>
          <div className={styles.icon}>☁️</div>
          <h2 className={styles.title}>
            {lang === 'fr' ? 'Synchroniser mes données' : 'Sync my data'}
          </h2>
          <p className={styles.subtitle}>
            {lang === 'fr'
              ? 'Retrouve ta progression sur tous tes appareils.'
              : 'Access your progress on all your devices.'}
          </p>
        </div>

        {sent ? (
          <div className={styles.sent}>
            <div className={styles.sentIcon}>📬</div>
            <p className={styles.sentText}>
              {lang === 'fr'
                ? 'Lien envoyé ! Vérifie ta boîte mail puis reviens ici.'
                : 'Link sent! Check your inbox then come back here.'}
            </p>
            <button className={styles.primaryBtn} onClick={onClose}>OK</button>
          </div>
        ) : (
          <>
            {/* Google */}
            <button className={styles.googleBtn} onClick={handleGoogle} disabled={loading}>
              <svg className={styles.googleIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {lang === 'fr' ? 'Continuer avec Google' : 'Continue with Google'}
            </button>

            <div className={styles.divider}>
              <span>{lang === 'fr' ? 'ou par e-mail' : 'or by email'}</span>
            </div>

            {/* Magic link */}
            <form onSubmit={handleEmail} className={styles.form}>
              <input
                type="email"
                className={styles.input}
                placeholder={lang === 'fr' ? 'ton@email.com' : 'your@email.com'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
              <button type="submit" className={styles.primaryBtn} disabled={loading || !email}>
                {loading
                  ? (lang === 'fr' ? 'Envoi…' : 'Sending…')
                  : (lang === 'fr' ? 'Recevoir un lien de connexion' : 'Receive a login link')}
              </button>
            </form>

            {error && <p className={styles.error}>{error}</p>}

            <p className={styles.note}>
              {lang === 'fr'
                ? 'Sans compte, tes données restent sauvegardées localement sur cet appareil.'
                : 'Without an account, your data is saved locally on this device only.'}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
