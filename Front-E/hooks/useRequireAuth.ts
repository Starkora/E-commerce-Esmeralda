import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

/**
 * Hook para exigir autenticación en páginas protegidas.
 * - Intenta sincronizar sesión con el backend (fetchUser)
 * - Si no hay usuario, redirige a /login?redirect=<ruta>
 * Retorna `checking` para mostrar un placeholder mientras decide.
 */
export default function useRequireAuth() {
  const { user, fetchUser } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    const ensure = async () => {
      // Si ya hay usuario, no hace falta consultar
      if (user) { if (!cancelled) setChecking(false); return; }
      // Intentar sincronizar con el backend
      try { await fetchUser(); } catch {}
      if (cancelled) return;
      // Si aún no hay usuario, redirigir al login
      const hasUser = !!(document && (window as any)); // sólo para evitar que TS elimine rama
      if (!user) {
        const dest = encodeURIComponent(router.asPath || '/');
        router.replace(`/login?redirect=${dest}`);
      }
      setChecking(false);
    };
    ensure();
    return () => { cancelled = true; };
  }, [user]);

  return { checking };
}
