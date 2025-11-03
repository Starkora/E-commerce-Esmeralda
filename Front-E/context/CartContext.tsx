import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getApiBaseUrl } from '@/utils/apiBaseUrl';
import toast from 'react-hot-toast';

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
  const [cartSessionId, setCartSessionId] = useState<string | null>(null);
  const apiBase = getApiBaseUrl();

  // Load cart session ID from localStorage on mount
  useEffect(() => {
    const sessionId = localStorage.getItem('cart_session_id');
    if (sessionId) {
      setCartSessionId(sessionId);
    }
  }, []);

  // Fetch cart on mount
  useEffect(() => {
    refreshCart();
  }, []);

  const getHeaders = () => {
    const headers: HeadersInit = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    
    if (cartSessionId) {
      headers['X-Cart-Session'] = cartSessionId;
    }
    
    return headers;
  };

  const refreshCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBase}/api/cart`, {
        credentials: 'include',
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error('Error al cargar el carrito');

      const data = await response.json();
      
      // Save session_id to localStorage if returned
      if (data.session_id && !cartSessionId) {
        localStorage.setItem('cart_session_id', data.session_id);
        setCartSessionId(data.session_id);
      }
      
      setCart({
        ...data.cart,
        total_items: data.total_items,
        items: data.items || [],
      });
    } catch (error) {
      console.error('Error loading cart:', error);
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
    try {
      const response = await fetch(`${apiBase}/api/cart/items`, {
        method: 'POST',
        credentials: 'include',
        headers: getHeaders(),
        body: JSON.stringify({
          product_id: productId,
          quantity,
          size,
          color,
        }),
      });

      if (!response.ok) throw new Error('Error al agregar al carrito');

      const data = await response.json();
      
      // Save session_id if returned
      if (data.cart.session_id && !cartSessionId) {
        localStorage.setItem('cart_session_id', data.cart.session_id);
        setCartSessionId(data.cart.session_id);
      }
      
      setCart({
        ...data.cart,
        total_items: data.cart.total_items,
        items: data.cart.items || [],
      });

      toast.success('Producto agregado al carrito');
      setIsCartOpen(true); // Open cart drawer
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al agregar al carrito');
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      const response = await fetch(`${apiBase}/api/cart/items/${itemId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: getHeaders(),
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) throw new Error('Error al actualizar cantidad');

      const data = await response.json();
      setCart({
        ...data.cart,
        total_items: data.cart.total_items,
        items: data.cart.items || [],
      });

      toast.success('Cantidad actualizada');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Error al actualizar cantidad');
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      const response = await fetch(`${apiBase}/api/cart/items/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error('Error al eliminar producto');

      const data = await response.json();
      setCart({
        ...data.cart,
        total_items: data.cart.total_items,
        items: data.cart.items || [],
      });

      toast.success('Producto eliminado');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Error al eliminar producto');
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${apiBase}/api/cart/clear`, {
        method: 'DELETE',
        credentials: 'include',
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error('Error al vaciar carrito');

      const data = await response.json();
      setCart({
        ...data.cart,
        total_items: 0,
        items: [],
      });

      toast.success('Carrito vaciado');
    } catch (error) {
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
