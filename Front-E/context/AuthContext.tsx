import React, { createContext, useContext, useEffect, useState } from 'react';
import { getApiBaseUrl } from '@/utils/apiBaseUrl';

export type User = {
  id?: number;
  name: string;
  email?: string;
  lastName?: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const noop = async (): Promise<void> => {};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  fetchUser: noop,
  logout: noop,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (u: User | null) => {
    setUser(u);
    if (typeof window !== 'undefined') {
      try {
        if (u) localStorage.setItem('ee_user', JSON.stringify(u));
        else localStorage.removeItem('ee_user');
      } catch {}
    }
  };

  const fetchUser = async () => {
    try {
      const axios = (await import('axios')).default;
      const apiBaseUrl = getApiBaseUrl();
      if (!apiBaseUrl) return;
      try { await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`, { withCredentials: true }); } catch {}
      const res = await axios.get(`${apiBaseUrl}/user`, {
        withCredentials: true,
        headers: { Accept: 'application/json' },
      });
      // Normalizar distintas formas de respuesta del backend
      const raw = (res as any)?.data?.user 
        || (res as any)?.data?.data?.user 
        || (res as any)?.data?.data 
        || (res as any)?.data 
        || null;

      if (raw && (raw.name || raw.email)) {
        const u: User = {
          id: raw.id,
          name: raw.name,
          email: raw.email,
          lastName: raw.last_name ?? raw.lastname ?? raw.apellido ?? raw.apellidos ?? undefined,
          phone: raw.phone ?? raw.telefono ?? raw.celular ?? raw.mobile ?? undefined,
        };
        setUser(u);
        try { localStorage.setItem('ee_user', JSON.stringify(u)); } catch {}
      }
    } catch {}
  };

  const logout = async () => {
    try {
      const axios = (await import('axios')).default;
      const apiBaseUrl = getApiBaseUrl();
      if (apiBaseUrl) {
        // Enviar bearer si existe para revocar el token en backend
        let token: string | null = null;
        try { token = localStorage.getItem('ee_token'); } catch {}
        await axios.post(
          `${apiBaseUrl}/spa-logout`,
          {},
          { withCredentials: true, headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } }
        );
      }
    } catch {}
    setUser(null);
    if (typeof window !== 'undefined') {
      try { localStorage.removeItem('ee_user'); } catch {}
      try { localStorage.removeItem('ee_token'); } catch {}
      try { window.dispatchEvent(new Event('logout')); } catch {}
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Cargar desde almacenamiento local primero para que el header reaccione al instante
    const stored = window.localStorage.getItem('ee_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    // Intentar validar contra el backend para asegurar sesión real
    fetchUser().catch(() => {});

    // Compatibilidad con eventos existentes
    const onLogin = (e: Event) => {
      const ce = e as CustomEvent<User>;
      if (ce?.detail) login(ce.detail);
    };
    const onLogout = () => login(null);
    window.addEventListener('login', onLogin as EventListener);
    window.addEventListener('logout', onLogout);
    return () => {
      window.removeEventListener('login', onLogin as EventListener);
      window.removeEventListener('logout', onLogout);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
