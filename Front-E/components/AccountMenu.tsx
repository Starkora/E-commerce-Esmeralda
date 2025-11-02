import React from 'react';
import Link from 'next/link';

type Props = {
  userName?: string;
  onLogout: () => void | Promise<void>;
};

const AccountMenu: React.FC<Props> = ({ userName, onLogout }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="px-3 py-1 rounded-full bg-white text-black text-sm hover:opacity-90"
        onClick={() => setOpen((v) => !v)}
      >
        Mi cuenta
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-20">
          <div className="px-4 py-2 text-sm text-gray-700 border-b">Hola, <span className="font-semibold">{userName || 'Usuario'}</span></div>
          <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-100">Perfil</Link>
          <Link href="/account/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">Pedidos</Link>
          <button onClick={() => onLogout()} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
