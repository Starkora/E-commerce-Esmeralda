import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getApiBaseUrl } from '@/utils/apiBaseUrl';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';
import axiosClient from '@/utils/axiosClient';

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
  subtotal: number;
  product: {
    id: number;
    name: string;
    primary_image: string;
    price: number;
  };
}

interface Cart {
  id: number;
  subtotal: number;
  tax: number;
  total: number;
  total_items: number;
  items: CartItem[];
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (productId: number, quantity?: number, size?: string, color?: string) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const apiBase = getApiBaseUrl();
  const { user } = useAuth();
  const router = useRouter();

  // Fetch cart on mount and when user changes
  useEffect(() => {
    // No cargar el carrito automáticamente al detectar usuario
    // Solo inicializar el estado
    if (!user) {
      setCart(null);
    }
    setLoading(false);
  }, [user]);

  const refreshCart = async () => {
    // Solo cargar carrito si el usuario está autenticado
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Asegurar que tenemos la cookie CSRF antes de hacer la petición
      try {
        await axiosClient.get('/sanctum/csrf-cookie');
      } catch (csrfError) {
        console.log('[CartContext] Could not get CSRF cookie, continuing anyway');
      }
      
      // Pequeña espera para asegurar que las cookies se establecieron
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const response = await axiosClient.get('/api/cart');
      const data = response.data;
      
      setCart({
        ...data.cart,
        total_items: data.total_items,
        items: data.items || [],
      });
    } catch (error: any) {
      console.error('[CartContext] Error loading cart:', error);
      
      // Si es 401, el usuario no está autenticado en el backend (sesión expirada)
      // Esto es normal si el usuario tiene datos en localStorage pero no cookies de sesión
      if (error.response?.status === 401) {
        console.log('[CartContext] Session expired or not authenticated, clearing cart silently');
        setCart(null);
        setLoading(false);
        return;
      }
      
      // Initialize empty cart on error
      setCart({
        id: 0,
        subtotal: 0,
        tax: 0,
        total: 0,
        total_items: 0,
        items: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity = 1, size?: string, color?: string) => {
    // Verificar si el usuario está autenticado
    console.log('[CartContext] addToCart - User:', user);
    
    // Guard adicional: validar que exista cookie de sesión
    // Detectar cookie de sesión (nombre depende de APP_NAME: <slug>_session)
    const hasSession = typeof document !== 'undefined' && document.cookie.split('; ').some(c => {
      return c.startsWith('laravel_session=') || /_session=/.test(c);
    });
    if (!user || !hasSession) {
      toast.error('Debes iniciar sesión para agregar productos al carrito');
      if (router.pathname !== '/login') {
        router.push('/login');
      }
      return;
    }

    try {
      console.log('[CartContext] Sending request to add item:', { productId, quantity, size, color });
      
      // Asegurar que tenemos la cookie CSRF
      try {
        await axiosClient.get('/sanctum/csrf-cookie');
      } catch (csrfError) {
        console.log('[CartContext] Could not get CSRF cookie for addToCart');
      }
      
      const response = await axiosClient.post(
        '/api/cart/items',
        {
          product_id: productId,
          quantity,
          size,
          color,
        }
      );

      console.log('[CartContext] Success response:', response.data);
      
      const data = response.data;
      
      setCart({
        ...data.cart,
        total_items: data.cart.total_items,
        items: data.cart.items || [],
      });

      toast.success('Producto agregado al carrito');
      setIsCartOpen(true); // Open cart drawer
    } catch (error: any) {
      console.error('[CartContext] Catch error:', error);
      
      // Si es 401, el usuario no está autenticado
      if (error.response?.status === 401) {
        toast.error('Tu sesión ha expirado. Por favor inicia sesión nuevamente');
        // Solo redirigir si NO estamos ya en login
        if (router.pathname !== '/login') {
          router.push('/login');
        }
        return;
      }
      
      const errorMessage = error.response?.data?.message || error.message || 'Error al agregar al carrito';
      toast.error(errorMessage);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      const response = await axiosClient.put(
        `/api/cart/items/${itemId}`,
        { quantity }
      );

      const data = response.data;
      setCart({
        ...data.cart,
        total_items: data.cart.total_items,
        items: data.cart.items || [],
      });

      toast.success('Cantidad actualizada');
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      
      if (error.response?.status === 401) {
        toast.error('Tu sesión ha expirado');
        if (router.pathname !== '/login') {
          router.push('/login');
        }
        return;
      }
      
      toast.error('Error al actualizar cantidad');
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      const response = await axiosClient.delete(
        `/api/cart/items/${itemId}`
      );

      const data = response.data;
      setCart({
        ...data.cart,
        total_items: data.cart.total_items,
        items: data.cart.items || [],
      });

      toast.success('Producto eliminado');
    } catch (error: any) {
      console.error('Error removing item:', error);
      
      if (error.response?.status === 401) {
        toast.error('Tu sesión ha expirado');
        if (router.pathname !== '/login') {
          router.push('/login');
        }
        return;
      }
      
      toast.error('Error al eliminar producto');
    }
  };

  const clearCart = async () => {
    try {
      const response = await axiosClient.delete('/api/cart/clear');

      const data = response.data;
      setCart({
        ...data.cart,
        total_items: 0,
        items: [],
      });

      toast.success('Carrito vaciado');
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      toast.error('Error al vaciar carrito');
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const value: CartContextType = {
    cart,
    loading,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
