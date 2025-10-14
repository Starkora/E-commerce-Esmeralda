import React, { useState } from 'react';
import toast from 'react-hot-toast';

const VerifyEmailPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const resendVerification = async () => {
    setLoading(true);
    setMessage('');
    try {
      const axios = (await import('axios')).default;
  await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
      // Intentar endpoint autenticado primero
      let res;
      try {
  res = await axios.post('/email/verification-notification', {}, { withCredentials: true });
      } catch (e) {
        // Si no está autenticado, usar endpoint público que recibe email
  res = await axios.post('/email/verification-notification-public', { email }, { withCredentials: true });
      }
      const msg = res.data?.message || 'Se ha enviado el enlace de verificación.';
      setMessage(msg);
      toast.success(msg);
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || 'Error al reenviar el correo de verificación';
      setMessage(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-2">Verifica tu correo</h1>
        <p className="text-gray-700 mb-4">Hemos enviado un correo electrónico con un enlace de verificación. Por favor revisa tu bandeja de entrada y sigue el enlace para activar tu cuenta.</p>

        <div className="mb-4">
          <label htmlFor="verify-email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            id="verify-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo registrado"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {message && (
          <div className="mb-4 p-2 bg-emerald-50 text-emerald-700 rounded">{message}</div>
        )}

        <button
          onClick={resendVerification}
          disabled={loading || !email}
          className="w-full py-2 px-4 bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-60"
        >
          {loading ? 'Enviando...' : 'Reenviar correo de verificación'}
        </button>

        <p className="mt-4 text-sm text-gray-600">Si no recibes el correo, revisa la carpeta de spam o espera unos minutos.</p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
