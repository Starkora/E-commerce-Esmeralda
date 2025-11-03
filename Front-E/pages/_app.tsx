import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
          <CartDrawer />
        </CartProvider>
      </AuthProvider>
      <Toaster position="top-right" />
    </>
  );
}
