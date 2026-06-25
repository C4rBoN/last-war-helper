import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export function AuthCallback() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Le SDK Supabase parse le hash #access_token=... présent sur CETTE
    // page (sans route HashRouter en conflit) et établit la session.
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setError(error.message);
        return;
      }
      if (session) {
        window.location.replace('/#/');
      } else {
        // Laisse le temps à onAuthStateChange de traiter le hash si getSession
        // a été appelé avant que le SDK n'ait fini de le parser.
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            subscription.unsubscribe();
            window.location.replace('/#/');
          }
        });
      }
    });
  }, []);

  if (error) {
    return <p>Erreur d'authentification : {error}</p>;
  }

  return <p>Connexion en cours…</p>;
}
