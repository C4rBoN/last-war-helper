import styles from './Legal.module.css';

export function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.icon}>⚔</span>
          <h1 className={styles.title}>Last War Helper</h1>
          <p className={styles.subtitle}>Politique de Confidentialité · Privacy Policy</p>
          <p className={styles.date}>Dernière mise à jour / Last updated : 2026-05-04</p>
        </div>

        {/* ── FRANÇAIS ── */}
        <section className={styles.section}>
          <h2 className={styles.lang}>🇫🇷 Français</h2>

          <h3 className={styles.heading}>1. Présentation</h3>
          <p>Last War Helper est une application web non officielle créée et maintenue par <strong>C4rBoN</strong>, à titre personnel. Elle est destinée à aider les joueurs du jeu mobile <em>Last War: Survival</em> à suivre leur progression (héros, bâtiments, recherches).</p>

          <h3 className={styles.heading}>2. Données collectées</h3>
          <p>L'application peut collecter et stocker les données suivantes :</p>
          <ul className={styles.list}>
            <li><strong>Données de progression en jeu</strong> : niveaux de héros, bâtiments et recherches que vous saisissez manuellement.</li>
            <li><strong>Préférences</strong> : langue sélectionnée (FR/EN), niveau de QG.</li>
            <li><strong>Identité de connexion</strong> : si vous utilisez la synchronisation cloud, votre adresse e-mail ou identifiant Facebook/Google fourni par le service d'authentification (Supabase).</li>
          </ul>
          <p>Aucune donnée du jeu <em>Last War: Survival</em> n'est lue automatiquement. Toutes les données sont saisies manuellement par l'utilisateur.</p>

          <h3 className={styles.heading}>3. Stockage des données</h3>
          <ul className={styles.list}>
            <li><strong>Localement</strong> : les données sont sauvegardées dans le <code>localStorage</code> de votre navigateur.</li>
            <li><strong>Cloud (optionnel)</strong> : si vous choisissez de synchroniser vos données, elles sont stockées sur <a href="https://supabase.com" target="_blank" rel="noreferrer">Supabase</a>, associées à votre identifiant utilisateur.</li>
          </ul>

          <h3 className={styles.heading}>4. Authentification tierce</h3>
          <p>L'application propose une connexion via <strong>Google</strong> et <strong>Facebook</strong>. Lors de la connexion :</p>
          <ul className={styles.list}>
            <li>Seul l'identifiant unique et l'adresse e-mail fournis par le fournisseur sont utilisés.</li>
            <li>Aucun accès à vos contacts, publications, messages ou autres données de votre compte n'est demandé.</li>
            <li>La connexion est gérée par Supabase et les politiques de confidentialité de Google/Facebook s'appliquent.</li>
          </ul>

          <h3 className={styles.heading}>5. Partage des données</h3>
          <p>Aucune donnée personnelle n'est vendue, louée ou transmise à des tiers. Les données sont uniquement utilisées pour faire fonctionner l'application.</p>

          <h3 className={styles.heading}>6. Suppression des données</h3>
          <p>Vous pouvez supprimer vos données à tout moment. Consultez la <a href="/#/data-deletion">page de suppression des données</a> pour les instructions détaillées.</p>

          <h3 className={styles.heading}>7. Contact</h3>
          <p>Pour toute question : <strong>C4rBoN</strong> — via GitHub : <a href="https://github.com/C4rBoN" target="_blank" rel="noreferrer">github.com/C4rBoN</a></p>
        </section>

        <hr className={styles.divider} />

        {/* ── ENGLISH ── */}
        <section className={styles.section}>
          <h2 className={styles.lang}>🇬🇧 English</h2>

          <h3 className={styles.heading}>1. Overview</h3>
          <p>Last War Helper is an unofficial web application created and maintained by <strong>C4rBoN</strong> as a personal project. It helps players of the mobile game <em>Last War: Survival</em> track their progression (heroes, buildings, research).</p>

          <h3 className={styles.heading}>2. Data collected</h3>
          <p>The application may collect and store the following data:</p>
          <ul className={styles.list}>
            <li><strong>In-game progression data</strong>: hero, building and research levels that you enter manually.</li>
            <li><strong>Preferences</strong>: selected language (FR/EN), HQ level.</li>
            <li><strong>Authentication identity</strong>: if you use cloud sync, your email address or Facebook/Google identifier provided by the authentication service (Supabase).</li>
          </ul>
          <p>No data is read automatically from the <em>Last War: Survival</em> game. All data is manually entered by the user.</p>

          <h3 className={styles.heading}>3. Data storage</h3>
          <ul className={styles.list}>
            <li><strong>Locally</strong>: data is saved in your browser's <code>localStorage</code>.</li>
            <li><strong>Cloud (optional)</strong>: if you choose to sync your data, it is stored on <a href="https://supabase.com" target="_blank" rel="noreferrer">Supabase</a>, linked to your user identifier.</li>
          </ul>

          <h3 className={styles.heading}>4. Third-party authentication</h3>
          <p>The app offers sign-in via <strong>Google</strong> and <strong>Facebook</strong>. During sign-in:</p>
          <ul className={styles.list}>
            <li>Only the unique identifier and email address provided by the provider are used.</li>
            <li>No access to your contacts, posts, messages or other account data is requested.</li>
            <li>Authentication is handled by Supabase; Google's and Facebook's own privacy policies apply.</li>
          </ul>

          <h3 className={styles.heading}>5. Data sharing</h3>
          <p>No personal data is sold, rented or shared with third parties. Data is used solely to operate the application.</p>

          <h3 className={styles.heading}>6. Data deletion</h3>
          <p>You may delete your data at any time. See the <a href="/#/data-deletion">data deletion page</a> for detailed instructions.</p>

          <h3 className={styles.heading}>7. Contact</h3>
          <p>For any questions: <strong>C4rBoN</strong> — via GitHub: <a href="https://github.com/C4rBoN" target="_blank" rel="noreferrer">github.com/C4rBoN</a></p>
        </section>
      </div>
    </div>
  );
}
