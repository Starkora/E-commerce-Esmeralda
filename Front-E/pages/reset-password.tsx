import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Autocompletar email y token desde la URL
  useEffect(() => {
    if (router.query.reset_token && typeof router.query.reset_token === 'string') {
      setResetToken(router.query.reset_token);
    }
    if (router.query.email && typeof router.query.email === 'string') {
      setEmail(router.query.email);
    }
  }, [router.query]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !resetToken || !newPassword || !confirmNewPassword) {
      setError('Completa todos los campos.');
      return;
    }
    if (newPassword.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setError('La contraseña debe tener al menos un símbolo.');
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setError('La contraseña debe tener al menos un número.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      const axios = (await import('axios')).default;
      await axios.get('/api/sanctum/csrf-cookie', { withCredentials: true });
      await axios.post(
        '/api/spa-reset-password',
        {
          email,
          token: resetToken,
          password: newPassword,
          password_confirmation: confirmNewPassword,
        },
        {
          withCredentials: true,
          headers: { 'Accept': 'application/json' }
        }
      );
      setSuccess('Contraseña cambiada correctamente. Ahora puedes iniciar sesión.');
      toast.success('Contraseña cambiada correctamente');
      setEmail('');
      setResetToken('');
      setNewPassword('');
      setConfirmNewPassword('');
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        router.replace('/login');
      }, 2000);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Error al cambiar la contraseña';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-2">Cambiar Contraseña</h1>
        <p className="text-gray-700 mb-4">Ingresa tu nueva contraseña.</p>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirmar nueva contraseña</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
              placeholder="Confirmar nueva contraseña"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          {error && (
            <div className="mb-2 p-2 bg-red-100 text-red-600 rounded border border-red-300 text-sm">{error}</div>
          )}
          {success && (
            <div className="mb-2 p-2 bg-emerald-50 text-emerald-700 rounded border border-emerald-300 text-sm">{success}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-60"
          >
            {loading ? 'Cambiando...' : 'Cambiar contraseña'}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">Si tienes problemas, revisa el token y tu correo o solicita uno nuevo.</p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
