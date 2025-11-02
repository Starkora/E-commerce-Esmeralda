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
  const [lastName, setLastName] = React.useState<string>(user?.lastName || '');
  const [email, setEmail] = React.useState<string>(user?.email || '');
  const [phone, setPhone] = React.useState<string>(user?.phone || '');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [verifying, setVerifying] = React.useState(false);
  const [verifyCode, setVerifyCode] = React.useState('');
  const [requestId, setRequestId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setName(user?.name || '');
    setLastName(user?.lastName || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
  }, [user?.name, user?.lastName, user?.email, user?.phone]);

  // Endpoints configurables; ajusta según tu backend si difieren
  const API = {
    requestProfileChange: '/spa-profile-change-request', // paso 1: enviar código al correo
    confirmProfileChange: '/spa-profile-change-confirm', // paso 2: confirmar con código
    changePassword: '/spa-change-password',
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

  const onRequestProfileChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('El nombre no puede estar vacío');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Correo inválido');
    if (phone && !/^\+?[0-9\s-]{7,15}$/.test(phone)) return toast.error('Teléfono inválido');

    const changes: Record<string, any> = {};
    if (name.trim() !== (user?.name || '')) changes.name = name.trim();
    if ((lastName || '').trim() !== (user?.lastName || '')) changes.last_name = (lastName || '').trim();
    if ((email || '').trim() !== (user?.email || '')) changes.email = (email || '').trim();
    if ((phone || '').trim() !== (user?.phone || '')) changes.phone = (phone || '').trim();

    if (Object.keys(changes).length === 0) {
      toast('No hay cambios por guardar');
      return;
    }
    try {
      const { axios, apiBaseUrl, csrfToken } = await getCsrf();
      const res = await axios.post(
        `${apiBaseUrl}${API.requestProfileChange}`,
        { _token: csrfToken, ...changes },
        { withCredentials: true, headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': csrfToken, 'Content-Type': 'application/json' } }
      );
      const reqId = (res as any)?.data?.request_id || null;
      setRequestId(reqId);
      setVerifying(true);
      toast.success('Código enviado a tu correo');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'No se pudo iniciar la verificación';
      toast.error(msg);
    }
  };

  const onConfirmProfileChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCode.trim()) return toast.error('Ingresa el código de verificación');
    const payload: Record<string, any> = { code: verifyCode.trim() };
    if (requestId) payload.request_id = requestId;
    payload.name = name.trim();
    payload.last_name = (lastName || '').trim();
    payload.email = (email || '').trim();
    payload.phone = (phone || '').trim();
    try {
      const { axios, apiBaseUrl, csrfToken } = await getCsrf();
      const res = await axios.post(
        `${apiBaseUrl}${API.confirmProfileChange}`,
        { _token: csrfToken, ...payload },
        { withCredentials: true, headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': csrfToken, 'Content-Type': 'application/json' } }
      );
      const updatedUser = (res as any)?.data?.user || {
        ...user,
        name: name.trim(),
        lastName: (lastName || '').trim(),
        email: (email || '').trim(),
        phone: (phone || '').trim(),
      };
      login(updatedUser);
      setVerifying(false);
      setVerifyCode('');
      setRequestId(null);
      toast.success('Datos actualizados');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Código inválido o expirado';
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

            {/* Formulario editar datos con verificación */}
            <form onSubmit={onRequestProfileChange} className="bg-white rounded-md border p-4 mb-8">
              <h2 className="font-semibold mb-3">Información básica</h2>
              <label className="block text-sm text-gray-700 mb-1">Nombre</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
              <label className="block text-sm text-gray-700 mb-1">Apellido</label>
              <input value={lastName} onChange={e=>setLastName(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
              <label className="block text-sm text-gray-700 mb-1">Correo electrónico</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
              <label className="block text-sm text-gray-700 mb-1">Teléfono</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
              {!verifying ? (
                <button type="submit" className="px-4 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600">Enviar código y guardar</button>
              ) : (
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-2">Hemos enviado un código a tu correo. Ingrésalo para confirmar los cambios.</p>
                  <div className="flex gap-2 items-center">
                    <input value={verifyCode} onChange={e=>setVerifyCode(e.target.value)} placeholder="Código" className="flex-1 border rounded px-3 py-2" />
                    <button onClick={onConfirmProfileChange} className="px-4 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600">Confirmar</button>
                  </div>
                </div>
              )}
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
