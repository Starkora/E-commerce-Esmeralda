import React, { useState } from 'react';
import { FaEnvelope, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface NewsletterProps {
  variant?: 'default' | 'compact' | 'inline';
  showIcon?: boolean;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({
  variant = 'default',
  showIcon = true,
  placeholder = 'Ingresa tu Email',
  buttonText = 'Suscribirse',
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Por favor ingresa tu email');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Por favor ingresa un email válido');
      return;
    }

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('¡Gracias por suscribirte!');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }, 1000);
  };

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={status === 'loading'}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? '...' : '→'}
          </button>
        </form>
        {message && (
          <p className={`text-sm mt-2 ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`${className}`}>
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={status === 'loading'}
            className="w-full px-4 py-3 pr-32 rounded-full bg-white border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="absolute right-1 top-1 bottom-1 px-6 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Enviando...' : buttonText}
          </button>
        </form>
        {message && (
          <p className={`text-sm mt-2 flex items-center gap-2 ${status === 'error' ? 'text-red-600' : 'text-emerald-600'}`}>
            {status === 'error' ? <FaExclamationCircle /> : <FaCheckCircle />}
            {message}
          </p>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {showIcon && (
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <FaEnvelope className="text-emerald-600 text-xl" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-gray-900">Nuevas Ofertas</h3>
          <p className="text-sm text-gray-600">Suscríbete para recibir ofertas exclusivas</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === 'loading'}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-emerald-500 text-white font-semibold py-3 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Enviando...
            </>
          ) : (
            buttonText
          )}
        </button>
      </form>

      {message && (
        <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
          status === 'error' 
            ? 'bg-red-50 text-red-700' 
            : 'bg-emerald-50 text-emerald-700'
        }`}>
          {status === 'error' ? <FaExclamationCircle /> : <FaCheckCircle />}
          <span className="text-sm font-medium">{message}</span>
        </div>
      )}
    </div>
  );
};

export default Newsletter;
