import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import toast from 'react-hot-toast';
import { getApiBaseUrl } from '@/utils/apiBaseUrl';
import useRequireAuth from '@/hooks/useRequireAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
  const [passVerifying, setPassVerifying] = React.useState(false);
  const [passCode, setPassCode] = React.useState('');
  const [passRequestId, setPassRequestId] = React.useState<string | null>(null);
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

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
    requestPasswordChange: '/spa-password-change-request',
    confirmPasswordChange: '/spa-password-change-confirm',
  } as const;

  const getCsrf = async () => {
    const axios = (await import('axios')).default;
    const apiBaseUrl = getApiBaseUrl();
    if (!apiBaseUrl) throw new Error('Falta NEXT_PUBLIC_API_URL');
    await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`, { withCredentials: true });
    const csrfResp = await axios.get(`${apiBaseUrl}/csrf-token`, { withCredentials: true });
    const csrfToken: string = (csrfResp as any)?.data?.csrf_token || '';
    // Leer token Bearer si existe (fallback a cookies en caso contrario)
    let token: string | null = null;
    try { token = localStorage.getItem('ee_token'); } catch {}
    return { axios, apiBaseUrl, csrfToken, token } as const;
  };

  const onRequestProfileChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar nombre obligatorio
    if (!name.trim()) return toast.error('El nombre no puede estar vacío');
    
    // Validar nombre máximo 40 caracteres
    if (name.trim().length > 40) {
      return toast.error('El nombre no puede exceder 40 caracteres');
    }

    // Validar apellido máximo 40 caracteres
    if (lastName && lastName.trim().length > 40) {
      return toast.error('El apellido no puede exceder 40 caracteres');
    }

    // Validar formato de correo electrónico
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return toast.error('Por favor ingresa un correo electrónico válido');
    }

    // Validar teléfono exactamente 9 dígitos
    if (phone && phone.trim()) {
      const phoneDigits = phone.trim().replace(/\D/g, '');
      if (phoneDigits.length !== 9) {
        return toast.error('El teléfono debe tener exactamente 9 dígitos');
      }
    }

    const changes: Record<string, any> = {};
    if (name.trim() !== (user?.name || '')) changes.name = name.trim();
    if ((lastName || '').trim() !== (user?.lastName || '')) changes.last_name = (lastName || '').trim();
    if ((email || '').trim() !== (user?.email || '')) changes.email = (email || '').trim();
    if ((phone || '').trim() !== (user?.phone || '')) {
      // Guardar solo dígitos
      changes.phone = phone.trim().replace(/\D/g, '');
    }

    if (Object.keys(changes).length === 0) {
      toast('No hay cambios por guardar');
      return;
    }
    try {
      const { axios, apiBaseUrl, csrfToken, token } = await getCsrf();
      const res = await axios.post(
        `${apiBaseUrl}${API.requestProfileChange}`,
        { _token: csrfToken, ...changes },
        { withCredentials: true, headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': csrfToken, 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } }
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

  const onConfirmProfileChange = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (!verifyCode.trim()) return toast.error('Ingresa el código de verificación');
    const payload: Record<string, any> = { code: verifyCode.trim() };
    if (requestId) payload.request_id = requestId;
    payload.name = name.trim();
    payload.last_name = (lastName || '').trim();
    payload.email = (email || '').trim();
    payload.phone = (phone || '').trim();
    try {
      const { axios, apiBaseUrl, csrfToken, token } = await getCsrf();
      const res = await axios.post(
        `${apiBaseUrl}${API.confirmProfileChange}`,
        { _token: csrfToken, ...payload },
        { withCredentials: true, headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': csrfToken, 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } }
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

  const onRequestPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obligatorios
    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error('Completa todos los campos');
    }

    // Validar contraseña nueva: mínimo 8 caracteres
    if (newPassword.length < 8) {
      return toast.error('La contraseña nueva debe tener al menos 8 caracteres');
    }

    // Validar al menos una letra mayúscula
    if (!/[A-Z]/.test(newPassword)) {
      return toast.error('La contraseña nueva debe contener al menos una letra mayúscula');
    }

    // Validar al menos un número
    if (!/[0-9]/.test(newPassword)) {
      return toast.error('La contraseña nueva debe contener al menos un número');
    }

    // Validar al menos un carácter especial
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/'`~;]/.test(newPassword)) {
      return toast.error('La contraseña nueva debe contener al menos un carácter especial');
    }

    // Validar confirmación de contraseña con los mismos requisitos
    if (confirmPassword.length < 8) {
      return toast.error('La confirmación de contraseña debe tener al menos 8 caracteres');
    }

    if (!/[A-Z]/.test(confirmPassword)) {
      return toast.error('La confirmación de contraseña debe contener al menos una letra mayúscula');
    }

    if (!/[0-9]/.test(confirmPassword)) {
      return toast.error('La confirmación de contraseña debe contener al menos un número');
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/'`~;]/.test(confirmPassword)) {
      return toast.error('La confirmación de contraseña debe contener al menos un carácter especial');
    }

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      return toast.error('Las contraseñas no coinciden');
    }

    try {
      const { axios, apiBaseUrl, csrfToken, token } = await getCsrf();
      const res = await axios.post(
        `${apiBaseUrl}${API.requestPasswordChange}`,
        { _token: csrfToken, current_password: currentPassword, password: newPassword, password_confirmation: confirmPassword },
        { withCredentials: true, headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': csrfToken, 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } }
      );
      const reqId = (res as any)?.data?.request_id || null;
      setPassRequestId(reqId);
      setPassVerifying(true);
      toast.success('Código enviado a tu correo');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'No se pudo iniciar el cambio de contraseña';
      toast.error(msg);
    }
  };

  const onConfirmPasswordChange = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (!passCode.trim()) return toast.error('Ingresa el código de verificación');
    try {
      const { axios, apiBaseUrl, csrfToken, token } = await getCsrf();
      await axios.post(
        `${apiBaseUrl}${API.confirmPasswordChange}`,
        {
          _token: csrfToken,
          code: passCode.trim(),
          request_id: passRequestId || undefined,
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: confirmPassword,
        },
        { withCredentials: true, headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': csrfToken, 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } }
      );
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); setPassCode(''); setPassRequestId(null); setPassVerifying(false);
      toast.success('Contraseña cambiada');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Código inválido o expirado';
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
              <label className="block text-sm text-gray-700 mb-1">Nombre (máx. 40 caracteres)</label>
              <input 
                value={name} 
                onChange={e=>setName(e.target.value)} 
                maxLength={40}
                className="w-full border rounded px-3 py-2 mb-3" 
                placeholder="Nombre"
              />
              <label className="block text-sm text-gray-700 mb-1">Apellido (máx. 40 caracteres)</label>
              <input 
                value={lastName} 
                onChange={e=>setLastName(e.target.value)} 
                maxLength={40}
                className="w-full border rounded px-3 py-2 mb-3" 
                placeholder="Apellido"
              />
              <label className="block text-sm text-gray-700 mb-1">Correo electrónico</label>
              <input 
                type="email"
                value={email} 
                onChange={e=>setEmail(e.target.value)} 
                className="w-full border rounded px-3 py-2 mb-3" 
                placeholder="correo@ejemplo.com"
              />
              <label className="block text-sm text-gray-700 mb-1">Teléfono (9 dígitos)</label>
              <input 
                type="tel"
                value={phone} 
                onChange={(e) => {
                  // Solo permitir números y limitar a 9 dígitos
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 9) {
                    setPhone(value);
                  }
                }}
                maxLength={9}
                className="w-full border rounded px-3 py-2 mb-3" 
                placeholder="987654321"
              />
              {!verifying ? (
                <button type="submit" className="px-4 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600">Enviar código y guardar</button>
              ) : (
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-2">Hemos enviado un código a tu correo. Ingrésalo para confirmar los cambios.</p>
                  <div className="flex gap-2 items-center">
                    <input value={verifyCode} onChange={e=>setVerifyCode(e.target.value)} placeholder="Código" className="flex-1 border rounded px-3 py-2" />
                    <button type="button" onClick={onConfirmProfileChange} className="px-4 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600">Confirmar</button>
                  </div>
                </div>
              )}
            </form>

            {/* Formulario cambiar contraseña con verificación por código */}
            <form onSubmit={onRequestPasswordChange} className="bg-white rounded-md border p-4">
              <h2 className="font-semibold mb-3">Cambiar contraseña</h2>
              <p className="text-xs text-gray-600 mb-3">La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.</p>
              <label className="block text-sm text-gray-700 mb-1">Contraseña actual</label>
              <div className="relative mb-3">
                <input 
                  type={showCurrent ? 'text' : 'password'} 
                  value={currentPassword} 
                  onChange={e=>setCurrentPassword(e.target.value)} 
                  className="w-full border rounded px-3 py-2 pr-10" 
                  placeholder="Contraseña actual"
                />
                <button type="button" aria-label={showCurrent ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={()=>setShowCurrent(s=>!s)} className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700">{showCurrent ? <FaEyeSlash/> : <FaEye/>}</button>
              </div>
              <label className="block text-sm text-gray-700 mb-1">Nueva contraseña</label>
              <div className="relative mb-3">
                <input 
                  type={showNew ? 'text' : 'password'} 
                  value={newPassword} 
                  onChange={e=>setNewPassword(e.target.value)} 
                  className="w-full border rounded px-3 py-2 pr-10" 
                  placeholder="Mínimo 8 caracteres"
                />
                <button type="button" aria-label={showNew ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={()=>setShowNew(s=>!s)} className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700">{showNew ? <FaEyeSlash/> : <FaEye/>}</button>
              </div>
              <label className="block text-sm text-gray-700 mb-1">Confirmar nueva contraseña</label>
              <div className="relative mb-3">
                <input 
                  type={showConfirm ? 'text' : 'password'} 
                  value={confirmPassword} 
                  onChange={e=>setConfirmPassword(e.target.value)} 
                  className="w-full border rounded px-3 py-2 pr-10" 
                  placeholder="Repite la contraseña"
                />
                <button type="button" aria-label={showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={()=>setShowConfirm(s=>!s)} className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700">{showConfirm ? <FaEyeSlash/> : <FaEye/>}</button>
              </div>
              {!passVerifying ? (
                <button type="submit" className="px-4 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600">Enviar código</button>
              ) : (
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-2">Hemos enviado un código a tu correo. Ingrésalo para confirmar el cambio.</p>
                  <div className="flex gap-2 items-center">
                    <input value={passCode} onChange={e=>setPassCode(e.target.value)} placeholder="Código" className="flex-1 border rounded px-3 py-2" />
                    <button type="button" onClick={onConfirmPasswordChange} className="px-4 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600">Confirmar</button>
                  </div>
                </div>
              )}
            </form>
          </>
          )}
        </main>
        <Footer />
      </section>
    </>
  );
}
