import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import React from 'react';
import toast from 'react-hot-toast';
import { getApiBaseUrl } from '@/utils/apiBaseUrl';
import useRequireAuth from '@/hooks/useRequireAuth';

type Order = {
  id: number | string;
  status?: string;
  total?: number | string;
  created_at?: string;
  [k: string]: any;
};

export default function Orders() {
  const { checking } = useRequireAuth();
  const [loading, setLoading] = React.useState(true);
  const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    (async () => {
      if (checking) return; // espera a que se verifique auth
      try {
        const axios = (await import('axios')).default;
        const apiBaseUrl = getApiBaseUrl();
        if (!apiBaseUrl) throw new Error('Falta NEXT_PUBLIC_API_URL');
        try { await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`, { withCredentials: true }); } catch {}
        const res = await axios.get(`${apiBaseUrl}/orders`, { withCredentials: true, headers: { Accept: 'application/json' } });
        const list = (res as any)?.data?.data || (res as any)?.data || [];
        setOrders(Array.isArray(list) ? list : []);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || 'No se pudieron cargar los pedidos');
      }
      setLoading(false);
    })();
  }, [checking]);

  return (
    <>
      <Head>
        <title>Mis pedidos - Estilo Esmeralda</title>
      </Head>
      <section>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-semibold mb-6">Mis pedidos</h1>
          {checking || loading ? (
            <p className="text-gray-600">Cargando pedidos...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-600">No hay pedidos.</p>
          ) : (
            <div className="overflow-auto border rounded-md bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Estado</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={String(o.id)} className="border-t">
                      <td className="px-4 py-2">{o.id}</td>
                      <td className="px-4 py-2">{o.status ?? '-'}</td>
                      <td className="px-4 py-2">{o.total ?? '-'}</td>
                      <td className="px-4 py-2">{o.created_at ? new Date(o.created_at).toLocaleString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
        <Footer />
      </section>
    </>
  );
}
