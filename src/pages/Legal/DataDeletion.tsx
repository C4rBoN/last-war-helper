import styles from './Legal.module.css';

export function DataDeletion() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.icon}>⚔</span>
          <h1 className={styles.title}>Last War Helper</h1>
          <p className={styles.subtitle}>Suppression des données · Data Deletion</p>
          <p className={styles.date}>Dernière mise à jour / Last updated : 2026-05-04</p>
        </div>

        {/* ── FRANÇAIS ── */}
        <section className={styles.section}>
          <h2 className={styles.lang}>🇫🇷 Français</h2>

          <h3 className={styles.heading}>Supprimer vos données</h3>
          <p>Vous pouvez supprimer toutes vos données associées à Last War Helper à tout moment, de deux façons :</p>

          <div className={styles.card}>
            <h4 className={styles.cardTitle}>Option 1 — Depuis l'application</h4>
            <ol className={styles.list}>
              <li>Ouvrez <strong>Last War Helper</strong>.</li>
              <li>Accédez au <strong>Tableau de bord</strong>.</li>
              <li>Appuyez sur le bouton <strong>Réinitialiser</strong> (icône corbeille).</li>
              <li>Confirmez la suppression.</li>
            </ol>
            <p className={styles.note}>Cette action supprime toutes les données locales (localStorage) et les données cloud synchronisées associées à votre compte.</p>
          </div>

          <div className={styles.card}>
            <h4 className={styles.cardTitle}>Option 2 — Demande manuelle</h4>
            <p>Contactez <strong>C4rBoN</strong> sur GitHub en ouvrant une issue :</p>
            <p><a className={styles.link} href="https://github.com/C4rBoN/last-war-helper/issues" target="_blank" rel="noreferrer">github.com/C4rBoN/last-war-helper/issues</a></p>
            <p className={styles.note}>Indiquez l'adresse e-mail associée à votre compte (Facebook ou Google). La suppression sera effectuée dans un délai de 30 jours.</p>
          </div>

          <h3 className={styles.heading}>Ce qui est supprimé</h3>
          <ul className={styles.list}>
            <li>Toutes les données de progression (héros, bâtiments, recherches)</li>
            <li>Votre identifiant utilisateur dans la base de données Supabase</li>
            <li>Les données de session liées à votre connexion Facebook/Google</li>
          </ul>
        </section>

        <hr className={styles.divider} />

        {/* ── ENGLISH ── */}
        <section className={styles.section}>
          <h2 className={styles.lang}>🇬🇧 English</h2>

          <h3 className={styles.heading}>Delete your data</h3>
          <p>You can delete all your Last War Helper data at any time, in two ways:</p>

          <div className={styles.card}>
            <h4 className={styles.cardTitle}>Option 1 — From the app</h4>
            <ol className={styles.list}>
              <li>Open <strong>Last War Helper</strong>.</li>
              <li>Go to the <strong>Dashboard</strong>.</li>
              <li>Press the <strong>Reset</strong> button (trash icon).</li>
              <li>Confirm the deletion.</li>
            </ol>
            <p className={styles.note}>This action deletes all local data (localStorage) and any synced cloud data associated with your account.</p>
          </div>

          <div className={styles.card}>
            <h4 className={styles.cardTitle}>Option 2 — Manual request</h4>
            <p>Contact <strong>C4rBoN</strong> on GitHub by opening an issue:</p>
            <p><a className={styles.link} href="https://github.com/C4rBoN/last-war-helper/issues" target="_blank" rel="noreferrer">github.com/C4rBoN/last-war-helper/issues</a></p>
            <p className={styles.note}>Include the email address associated with your account (Facebook or Google). Deletion will be completed within 30 days.</p>
          </div>

          <h3 className={styles.heading}>What gets deleted</h3>
          <ul className={styles.list}>
            <li>All progression data (heroes, buildings, research)</li>
            <li>Your user identifier in the Supabase database</li>
            <li>Session data linked to your Facebook/Google login</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
