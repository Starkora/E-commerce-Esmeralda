import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import toast from 'react-hot-toast';
import { getApiBaseUrl } from '@/utils/apiBaseUrl';
import useRequireAuth from '@/hooks/useRequireAuth';

export default function AccountHome() {
  const { user, login } = useAuth();
  const { checking } = useRequireAuth();
  const [name, setName] = React.useState<string>(user?.name || '');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  React.useEffect(() => { setName(user?.name || ''); }, [user?.name]);

  // Endpoints configurables; ajusta según tu backend si difieren
  const API = {
    updateProfile: '/spa-update-profile', // { name }
    changePassword: '/spa-change-password', // { current_password, password, password_confirmation }
  } as const;

  const getCsrf = async () => {
    const axios = (await import('axios')).default;
    const apiBaseUrl = getApiBaseUrl();
    if (!apiBaseUrl) throw new Error('Falta NEXT_PUBLIC_API_URL');
    await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`, { withCredentials: true });
    const csrfResp = await axios.get(`${apiBaseUrl}/csrf-token`, { withCredentials: true });
    const csrfToken: string = (csrfResp as any)?.data?.csrf_token || '';
    return { axios, apiBaseUrl, csrfToken };
  };

  const onSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('El nombre no puede estar vacío');
    try {
      const { axios, apiBaseUrl, csrfToken } = await getCsrf();
      const res = await axios.post(
        `${apiBaseUrl}${API.updateProfile}`,
        { _token: csrfToken, name: name.trim() },
        { withCredentials: true, headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': csrfToken, 'Content-Type': 'application/json' } }
      );
      // Si el backend responde con el usuario actualizado, refrescamos el contexto
      const updatedUser = (res as any)?.data?.user || { ...user, name: name.trim() };
      login(updatedUser);
      toast.success('Nombre actualizado');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'No se pudo actualizar el nombre';
      toast.error(msg);
    }
  };

  const onChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) return toast.error('Completa todos los campos');
    if (newPassword.length < 8) return toast.error('La nueva contraseña debe tener al menos 8 caracteres');
    if (newPassword !== confirmPassword) return toast.error('Las contraseñas no coinciden');
    try {
      const { axios, apiBaseUrl, csrfToken } = await getCsrf();
      await axios.post(
        `${apiBaseUrl}${API.changePassword}`,
        { _token: csrfToken, current_password: currentPassword, password: newPassword, password_confirmation: confirmPassword },
        { withCredentials: true, headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': csrfToken, 'Content-Type': 'application/json' } }
      );
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
      toast.success('Contraseña cambiada');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'No se pudo cambiar la contraseña';
      toast.error(msg);
    }
  };

  return (
    <>
      <Head>
        <title>Mi cuenta - Estilo Esmeralda</title>
      </Head>
      <section>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          {checking ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
          <>
            <h1 className="text-2xl font-semibold mb-6">Mi cuenta</h1>

            {/* Formulario editar nombre */}
            <form onSubmit={onSaveName} className="bg-white rounded-md border p-4 mb-8">
              <h2 className="font-semibold mb-3">Información básica</h2>
              <label className="block text-sm text-gray-700 mb-1">Nombre</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
              <button type="submit" className="px-4 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600">Guardar</button>
            </form>

            {/* Formulario cambiar contraseña */}
            <form onSubmit={onChangePassword} className="bg-white rounded-md border p-4">
              <h2 className="font-semibold mb-3">Cambiar contraseña</h2>
              <label className="block text-sm text-gray-700 mb-1">Contraseña actual</label>
              <input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
              <label className="block text-sm text-gray-700 mb-1">Nueva contraseña</label>
              <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
              <label className="block text-sm text-gray-700 mb-1">Confirmar nueva contraseña</label>
              <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
              <button type="submit" className="px-4 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600">Cambiar contraseña</button>
            </form>
          </>
          )}
        </main>
        <Footer />
      </section>
    </>
  );
}
