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
        if (u) {
          localStorage.setItem('ee_user', JSON.stringify(u));
          // Limpiar bandera de logout al hacer login exitoso
          localStorage.removeItem('ee_logout');
        } else {
          localStorage.removeItem('ee_user');
        }
      } catch {}
    }
  };

  const fetchUser = async () => {
    try {
      const axios = (await import('axios')).default;
      const apiBaseUrl = getApiBaseUrl();
      if (!apiBaseUrl) {
        // Si no hay URL configurada, limpiar todo
        setUser(null);
        try { 
          localStorage.removeItem('ee_user'); 
          localStorage.removeItem('ee_token');
        } catch {}
        return;
      }
      
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
      } else {
        // Si no vino usuario válido, limpiar todo
        setUser(null);
        try { 
          localStorage.removeItem('ee_user'); 
          localStorage.removeItem('ee_token');
        } catch {}
      }
    } catch (err: any) {
      // Si el backend responde con error de autenticación, limpiar TODO
      const status = err?.response?.status;
      if (status === 401 || status === 403 || status === 419 || !status) {
        setUser(null);
        try { 
          localStorage.removeItem('ee_user'); 
          localStorage.removeItem('ee_token');
        } catch {}
      }
    }
  };

  const logout = async () => {
    // 1. Marcar que el usuario hizo logout explícito
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('ee_logout', 'true'); } catch {}
    }

    // 2. Limpiar estado y storage PRIMERO para que la UI responda inmediato
    setUser(null);
    if (typeof window !== 'undefined') {
      try { localStorage.removeItem('ee_user'); } catch {}
      try { localStorage.removeItem('ee_token'); } catch {}
      try { window.dispatchEvent(new Event('logout')); } catch {}
    }

    // 3. Llamar al backend para revocar token y destruir sesión (en segundo plano)
    try {
      const axios = (await import('axios')).default;
      const apiBaseUrl = getApiBaseUrl();
      if (!apiBaseUrl) return;
      
      // Leer token antes de borrarlo
      let token: string | null = null;
      try { token = localStorage.getItem('ee_token'); } catch {}
      
      // Llamar al endpoint de logout con Bearer (si existe) y cookies
      await axios.post(
        `${apiBaseUrl}/spa-logout`,
        {},
        { 
          withCredentials: true, 
          headers: { 
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          timeout: 5000 // timeout de 5s para no bloquear UI si el backend está lento
        }
      );
    } catch (err) {
      // Si falla el backend, no importa: ya limpiamos el frontend
      console.warn('Logout backend falló, pero sesión local limpiada:', err);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Verificar si el usuario hizo logout explícito
    let hasLoggedOut = false;
    try { 
      hasLoggedOut = localStorage.getItem('ee_logout') === 'true';
    } catch {}
    
    // Si hay logout explícito, NO intentar recuperar sesión
    if (hasLoggedOut) {
      setUser(null);
      try { 
        localStorage.removeItem('ee_user'); 
        localStorage.removeItem('ee_token');
      } catch {}
      return;
    }
    
    // Si NO hay logout explícito, validar contra el backend para asegurar sesión real
    fetchUser().catch(() => {
      // Si falla, asegurar que no haya residuos en storage
      try { 
        localStorage.removeItem('ee_user'); 
        localStorage.removeItem('ee_token');
      } catch {}
    });

    // Compatibilidad con eventos existentes
    const onLogin = (e: Event) => {
      const ce = e as CustomEvent<User>;
      if (ce?.detail) {
        // Al hacer login, limpiar la bandera de logout
        try { localStorage.removeItem('ee_logout'); } catch {}
        login(ce.detail);
      }
    };
    const onLogout = () => {
      login(null);
      // Forzar recarga de la página para limpiar cualquier estado residual
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
    };
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
