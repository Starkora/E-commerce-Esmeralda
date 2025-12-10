import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { getApiBaseUrl } from "@/utils/apiBaseUrl";
import { getRecaptchaToken } from "@/utils/recaptcha";
import { useAuth } from "@/context/AuthContext";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
const LoginSection: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showRecovery, setShowRecovery] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resetToken, setResetToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // Autocompletar token y email desde la URL cuando se muestra el formulario de cambio de contraseña
    const router = useRouter();
    const redirectTarget = React.useMemo(() => {
        const raw = Array.isArray(router.query.redirect) ? router.query.redirect[0] : router.query.redirect;
        return (typeof raw === 'string' && raw.startsWith('/') && !raw.startsWith('//')) ? raw : null;
    }, [router.query.redirect]);
    // Redirigir automáticamente si la URL contiene reset_token y email
    React.useEffect(() => {
        if (router.query.reset_token && router.query.email) {
            router.replace({
                pathname: '/reset-password',
                query: {
                    reset_token: router.query.reset_token,
                    email: router.query.email
                }
            });
        }
    }, [router.query]);
    // Función para cambiar la contraseña
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email || !resetToken || !newPassword || !confirmNewPassword) {
            setError("Completa todos los campos.");
            return;
        }
        if (newPassword.length < 8) {
            setError("La nueva contraseña debe tener al menos 8 caracteres.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        try {
            const axios = (await import('axios')).default;
            const apiBaseUrl = getApiBaseUrl();
            if (!apiBaseUrl) throw new Error('Falta configurar NEXT_PUBLIC_API_URL con la URL del backend');

            // 1) Obtener cookies y token CSRF desde el backend
            await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`, { withCredentials: true });
            const csrfResp = await axios.get(`${apiBaseUrl}/csrf-token`, { withCredentials: true });
            const csrfToken: string = csrfResp?.data?.csrf_token || '';

            const response = await axios.post(
                `${apiBaseUrl}/spa-reset-password`,
                {
                    _token: csrfToken,
                    email,
                    token: resetToken,
                    password: newPassword,
                    password_confirmation: confirmNewPassword,
                },
                {
                    withCredentials: true,
                    headers: { 
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': csrfToken || '',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/json',
                    }
                }
            );
            toast.success('Contraseña cambiada correctamente');
            setShowReset(false);
            setShowRecovery(false);
            setEmail("");
            setResetToken("");
            setNewPassword("");
            setConfirmNewPassword("");
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Error al cambiar la contraseña';
            setError(msg);
            toast.error(msg);
        }
    };

    // ...existing code...

    const { login: setAuthUser } = useAuth();

    // Función de login usando axios
    const handleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            const axios = (await import('axios')).default;
            const apiBaseUrl = getApiBaseUrl();
            if (!apiBaseUrl) throw new Error('Falta configurar NEXT_PUBLIC_API_URL con la URL del backend');

            // Obtener token reCAPTCHA v3 si está configurado
            const recaptchaToken = await getRecaptchaToken('login');

            // 1. Obtener la cookie CSRF de Sanctum y token explícito
            await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`, { withCredentials: true });
            const csrfResp = await axios.get(`${apiBaseUrl}/csrf-token`, { withCredentials: true });
            const csrfToken: string = csrfResp?.data?.csrf_token || '';

            // 2. Enviar credenciales al endpoint de login personalizado
            const response = await axios.post(
                `${apiBaseUrl}/spa-login`,
                { email, password, recaptchaToken },
                {
                    withCredentials: true,
                    headers: { 
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': csrfToken || '',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/json',
                    }
                }
            );

            toast.success('Inicio de sesión exitoso', { duration: 3000 });
            const data: any = (response && (response as any).data) || {};
            const raw = data.user || null;
            const user = raw ? {
                id: raw.id,
                name: raw.name,
                email: raw.email,
                lastName: raw.last_name ?? raw.lastname ?? raw.apellido ?? raw.apellidos ?? undefined,
                phone: raw.phone ?? raw.telefono ?? raw.celular ?? raw.mobile ?? undefined,
            } : null;
            // Limpiar bandera de logout al hacer login exitoso
            try { localStorage.removeItem('ee_logout'); } catch {}
            // Guardar token para llamadas autenticadas (fallback a cookies)
            try { if (data.token) localStorage.setItem('ee_token', data.token); } catch {}
            // Guardar usuario en el contexto (y localStorage) para persistencia inmediata
            try { setAuthUser(user as any); } catch {}
            // Mantener compatibilidad con el evento existente (normalizado)
            try { window.dispatchEvent(new CustomEvent('login', { detail: user })); } catch {}
            // Redirección segura: si viene ?redirect=/algo, ir allí; de lo contrario, al home
            const rawRedirect = Array.isArray(router.query.redirect) ? router.query.redirect[0] : router.query.redirect;
            const safeRedirect = (typeof rawRedirect === 'string' && rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')) ? rawRedirect : '/';
            await router.replace(safeRedirect);
        } catch (err: any) {
            if (err.response && err.response.data) {
                const message = err.response.data.message || 'Credenciales incorrectas';
                // Si el error es por correo no verificado
                if (err.response.status === 403 && message.toLowerCase().includes('no está verificado')) {
                    setError('Tu correo no está verificado');
                    toast.error('Tu correo no está verificado');
                    return;
                }
                setError(message);
                toast.error(message);
            } else {
                setError('Error de red o servidor');
                toast.error('Error de red o servidor');
            }
        }
        setLoading(false);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError("");
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError("");
    };

    const validateForm = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Por favor, introduce un correo electrónico válido.");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setError("");
        await handleLogin();
    };

    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Logo y título */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
                        <FaShieldAlt className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
                        Estilo Esmeralda
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Tu tienda de moda favorita
                    </p>
                </div>

                {/* Card principal */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="px-8 py-10">
                        {/* Transición para el formulario de inicio de sesión */}
                        <Transition
                            show={!showRecovery}
                            enter="transition-opacity duration-300 ease-out"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-300 ease-in"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className={`${showRecovery ? 'hidden' : 'block'}`}>
                                <form onSubmit={validateForm} className="space-y-6">
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Ingresa a tu cuenta para continuar
                                        </p>
                                    </div>

                                    {redirectTarget && (
                                        <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <FaShieldAlt className="h-5 w-5 text-amber-400" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm text-amber-700">
                                                        Necesitas iniciar sesión para continuar a <span className="font-semibold">{redirectTarget}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Email Input */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Correo Electrónico
                                        </label>
                                        <div className="relative rounded-lg shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaEnvelope className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                placeholder="tu@email.com"
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-gray-900"
                                                value={email}
                                                onChange={handleEmailChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Password Input */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                            Contraseña
                                        </label>
                                        <div className="relative rounded-lg shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                autoComplete="current-password"
                                                required
                                                placeholder="••••••••"
                                                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-gray-900"
                                                value={password}
                                                onChange={handlePasswordChange}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Forgot Password Link */}
                                    <div className="flex items-center justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setShowRecovery(true)}
                                            className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </button>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Ingresando...
                                            </>
                                        ) : (
                                            'Iniciar Sesión'
                                        )}
                                    </button>
                                </form>

                                {/* Register Link */}
                                <div className="mt-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">¿Eres nuevo?</span>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <Link
                                            href="/register"
                                            className="w-full flex justify-center py-3 px-4 border-2 border-emerald-500 rounded-lg text-sm font-medium text-emerald-600 bg-white hover:bg-emerald-50 transition-all duration-200 shadow-sm hover:shadow-md"
                                        >
                                            Crear una cuenta nueva
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Transition>

                        {/* Transición para el formulario de recuperación de contraseña */}
                        <Transition
                            show={showRecovery && !showReset}
                            enter="transition-opacity duration-300 ease-out"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-300 ease-in"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className={`${showRecovery && !showReset ? 'block' : 'hidden'}`}>
                                <div className="space-y-6">
                                    {/* Back Button */}
                                    <button
                                        type="button"
                                        onClick={() => { setShowRecovery(false); setShowReset(false); setError(""); }}
                                        className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        <FaArrowLeft className="h-4 w-4 mr-2" />
                                        Volver al inicio de sesión
                                    </button>

                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-gray-900">Recuperar Contraseña</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Te enviaremos un enlace para restablecer tu contraseña
                                        </p>
                                    </div>

                                    {/* Email Input */}
                                    <div>
                                        <label htmlFor="recovery-email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Correo Electrónico
                                        </label>
                                        <div className="relative rounded-lg shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaEnvelope className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="recovery-email"
                                                type="email"
                                                placeholder="tu@email.com"
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-gray-900"
                                                value={email}
                                                onChange={handleEmailChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="button"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        onClick={async () => {
                                            setError("");
                                            if (!email) {
                                                setError("Ingresa tu correo electrónico");
                                                return;
                                            }
                                            try {
                                                const axios = (await import('axios')).default;
                                                const apiBaseUrl = getApiBaseUrl();
                                                if (!apiBaseUrl) throw new Error('Falta configurar NEXT_PUBLIC_API_URL con la URL del backend');

                                                await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`, { withCredentials: true });
                                                const csrfResp = await axios.get(`${apiBaseUrl}/csrf-token`, { withCredentials: true });
                                                const csrfToken: string = csrfResp?.data?.csrf_token || '';

                                                await axios.post(
                                                    `${apiBaseUrl}/spa-forgot-password`,
                                                    { _token: csrfToken, email },
                                                    {
                                                        withCredentials: true,
                                                        headers: { 
                                                            'Accept': 'application/json',
                                                            'X-CSRF-TOKEN': csrfToken || '',
                                                            'X-Requested-With': 'XMLHttpRequest',
                                                            'Content-Type': 'application/json',
                                                        }
                                                    }
                                                );
                                                toast.success('Enlace de recuperación enviado a tu correo');
                                                setTimeout(() => {
                                                    setShowRecovery(false);
                                                    setShowReset(false);
                                                }, 2000);
                                            } catch (err: any) {
                                                const msg = err.response?.data?.message || 'Error al enviar el correo';
                                                setError(msg);
                                                toast.error(msg);
                                            }
                                        }}
                                    >
                                        Enviar enlace de recuperación
                                    </button>
                                </div>
                            </div>
                        </Transition>

                        {/* Transición para el formulario de cambio de contraseña */}
                        <Transition
                            show={showReset}
                            enter="transition-opacity duration-300 ease-out"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-300 ease-in"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className={`${showReset ? 'block' : 'hidden'}`}>
                                <div className="space-y-6">
                                    {/* Back Button */}
                                    <button
                                        type="button"
                                        onClick={() => { setShowReset(false); setShowRecovery(false); setError(""); }}
                                        className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        <FaArrowLeft className="h-4 w-4 mr-2" />
                                        Volver al inicio de sesión
                                    </button>

                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-gray-900">Cambiar Contraseña</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Revisa tu correo y completa los siguientes campos
                                        </p>
                                    </div>

                                    {/* Token Input */}
                                    <div>
                                        <label htmlFor="reset-token" className="block text-sm font-medium text-gray-700 mb-2">
                                            Token de Recuperación
                                        </label>
                                        <input
                                            id="reset-token"
                                            type="text"
                                            placeholder="Ingresa el token recibido por correo"
                                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-gray-900"
                                            value={resetToken}
                                            onChange={e => setResetToken(e.target.value)}
                                        />
                                    </div>

                                    {/* New Password Input */}
                                    <div>
                                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nueva Contraseña
                                        </label>
                                        <div className="relative rounded-lg shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="new-password"
                                                type="password"
                                                placeholder="Mínimo 8 caracteres"
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-gray-900"
                                                value={newPassword}
                                                onChange={e => setNewPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Confirm Password Input */}
                                    <div>
                                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirmar Nueva Contraseña
                                        </label>
                                        <div className="relative rounded-lg shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="confirm-password"
                                                type="password"
                                                placeholder="Confirma tu contraseña"
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-gray-900"
                                                value={confirmNewPassword}
                                                onChange={e => setConfirmNewPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="button"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        onClick={handleResetPassword}
                                    >
                                        Cambiar Contraseña
                                    </button>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginSection;
