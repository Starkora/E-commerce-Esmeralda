import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Banner simple para mostrar confirmación de verificación de correo.
// Se activa cuando la URL trae ?verified=1 o ?verified=true
export default function VerifiedBanner() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isVerified = useMemo(() => {
    // Durante SSR router.query está vacío; en cliente usamos window como respaldo
    const q = (router.isReady ? router.query?.verified : undefined) as
      | string
      | string[]
      | undefined;
    const v = Array.isArray(q) ? q[0] : q;
    if (v) return v === '1' || v.toLowerCase() === 'true';
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const vv = sp.get('verified');
      return vv === '1' || (vv ?? '').toLowerCase() === 'true';
    }
    return false;
  }, [router.isReady, router.query]);

  useEffect(() => {
    setOpen(isVerified);
  }, [isVerified]);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center p-4">
      <div className="relative w-full max-w-2xl rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-emerald-800 shadow-lg ring-1 ring-emerald-200">
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white"
          >
            ✓
          </span>
          <div className="flex-1">
            <p className="font-semibold">¡Tu correo ha sido verificado!</p>
            <p className="text-sm opacity-90">
              Ya puedes iniciar sesión y disfrutar de Estilo Esmeralda.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Iniciar sesión
            </Link>
          </div>
          <button
            aria-label="Cerrar aviso"
            onClick={() => setOpen(false)}
            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md text-emerald-700 transition hover:bg-emerald-100"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
