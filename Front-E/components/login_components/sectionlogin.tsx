import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
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
    // Autocompletar token y email desde la URL cuando se muestra el formulario de cambio de contraseña
    const router = useRouter();
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
            await axios.get('/api/sanctum/csrf-cookie', { withCredentials: true });
            const response = await axios.post(
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

    // Función de login usando axios
    const handleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            const axios = (await import('axios')).default;
            // 1. Obtener la cookie CSRF de Sanctum
            await axios.get('/api/sanctum/csrf-cookie', { withCredentials: true });

            // 2. Enviar credenciales al endpoint de login personalizado
            const response = await axios.post(
                '/api/spa-login',
                { email, password },
                {
                    withCredentials: true,
                    headers: { 'Accept': 'application/json' }
                }
            );

            toast.success('Inicio de sesión exitoso', { duration: 3000 });
            await router.replace('/');
            setTimeout(() => {
                try {
                    window.dispatchEvent(new Event('login'));
                } catch (e) {}
            }, 800);
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
        <section className="w-full h-screen flex items-center justify-center bg-gray-200">
            <div className="relative w-full max-w-md p-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 rounded-lg">
                <div className="relative z-10 p-6 bg-white rounded-lg overflow-hidden">
                    {/* Transición para el formulario de inicio de sesión */}
                    <Transition
                        show={!showRecovery}
                        enter="transition-opacity duration-[3000ms] ease-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-[3000ms] ease-in"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {/* Contenedor que aplica la clase */}
                        <div className={`${showRecovery ? 'hidden' : 'block'}`}>
                            <form onSubmit={validateForm} className="space-y-4">
                                <h1 className="text-2xl font-semibold text-center">Iniciar Sesión</h1>
                                <p className="text-gray-600">Por favor introduzca su email y contraseña</p>

                                <div>
                                    <label htmlFor="email" className="block text-left text-gray-700">Correo Electrónico</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        placeholder="Ingresa tu correo electrónico"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:shadow-lg transition duration-200 ease-in-out"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="password" className="text-gray-700">Contraseña</label>
                                        <button
                                            type="button"
                                            onClick={() => setShowRecovery(true)}
                                            className="text-sm text-emerald-500 hover:underline"
                                        >
                                            ¿Olvidó su contraseña?
                                        </button>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Ingresa tu contraseña"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:shadow-lg transition duration-200 ease-in-out"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>

                                {error && (
                                    <div className="p-2 bg-red-100 text-red-600 rounded-md border border-red-300 text-sm">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="relative w-full py-2 bg-white text-black rounded-md overflow-hidden transition duration-300 ease-in-out 
                                    transform hover:text-white hover:bg-white border border-emerald-500 hover:border-transparent
                                    before:absolute before:inset-0 before:bg-emerald-500 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
                                    disabled={loading}
                                >
                                    <span className="relative z-10">{loading ? 'Ingresando...' : 'Iniciar Sesión'}</span>
                                </button>
                            </form>
							  <p className="mt-4 text-gray-600">
                        ¿No tienes una cuenta? <Link href="./register" className="text-emerald-500 hover:underline">Regístrate</Link>
                    </p>
                        </div>
                    </Transition>

                    {/* Transición para el formulario de recuperación de contraseña */}
                    <Transition
                        show={showRecovery && !showReset}
                        enter="transition-opacity duration-[3000ms] ease-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-[3000ms] ease-in"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className={`${showRecovery && !showReset ? 'block' : 'hidden'}`}>
                            <div className="space-y-4 text-center">
                                {error && (
                                    <div className="p-2 bg-red-100 text-red-600 rounded-md border border-red-300 text-sm">{error}</div>
                                )}
                                {/* Mostrar solo la alerta y redirigir al login tras enviar el correo */}
                                {(!error && !showReset) && (
                                    <>
                                        <h1 className="text-2xl font-semibold">Recuperar Contraseña</h1>
                                        <p className="text-gray-600">Por favor introduzca su email:</p>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:shadow-lg transition duration-200 ease-in-out"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                        <button
                                            type="button"
                                            className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300"
                                            onClick={async () => {
                                                setError("");
                                                if (!email) {
                                                    setError("Ingresa tu correo electrónico");
                                                    return;
                                                }
                                                try {
                                                    const axios = (await import('axios')).default;
                                                    await axios.get('/api/sanctum/csrf-cookie', { withCredentials: true });
                                                    await axios.post(
                                                        '/api/spa-forgot-password',
                                                        { email },
                                                        {
                                                            withCredentials: true,
                                                            headers: { 'Accept': 'application/json' }
                                                        }
                                                    );
                                                    toast.success('Enlace de recuperación enviado a tu correo');
                                                    setShowReset(false);
                                                    setTimeout(() => {
                                                        window.location.replace('/login');
                                                    }, 2000);
                                                } catch (err: any) {
                                                    const msg = err.response?.data?.message || 'Error al enviar el correo';
                                                    setError(msg);
                                                    toast.error(msg);
                                                }
                                            }}
                                        >
                                            Recuperar
                                        </button>
                                        <p className="mt-4 text-gray-600">
                                            ¿Recordó su contraseña?{' '}
                                            <button
                                                type="button"
                                                onClick={() => { setShowRecovery(false); setShowReset(false); }}
                                                className="text-emerald-500 hover:underline"
                                            >
                                                Volver a Inicio de sesión
                                            </button>
                                        </p>
                                    </>
                                )}
                                {/* Alerta de éxito y redirección */}
                                {(!error && showReset) && (
                                    <div className="p-2 bg-emerald-50 text-emerald-700 rounded border border-emerald-300 text-sm">
                                        Enlace de recuperación enviado a tu correo. Serás redirigido al inicio de sesión.
                                    </div>
                                )}
                            </div>
                        </div>
                    </Transition>

                    {/* Transición para el formulario de cambio de contraseña */}
                    <Transition
                        show={showReset}
                        enter="transition-opacity duration-[3000ms] ease-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-[3000ms] ease-in"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className={`${showReset ? 'block' : 'hidden'}`}>
                            <div className="space-y-4 text-center">
                                <h1 className="text-2xl font-semibold">Cambiar Contraseña</h1>
                                <p className="text-gray-600">Revisa tu correo, copia el token y crea tu nueva contraseña:</p>
                                <input
                                    type="text"
                                    placeholder="Token de recuperación"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:shadow-lg transition duration-200 ease-in-out"
                                    value={resetToken}
                                    onChange={e => setResetToken(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Nueva contraseña"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:shadow-lg transition duration-200 ease-in-out"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirmar nueva contraseña"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:shadow-lg transition duration-200 ease-in-out"
                                    value={confirmNewPassword}
                                    onChange={e => setConfirmNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="w-full py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition duration-300"
                                    onClick={handleResetPassword}
                                >
                                    Cambiar contraseña
                                </button>
                                <p className="mt-4 text-gray-600">
                                    <button
                                        type="button"
                                        onClick={() => { setShowReset(false); setShowRecovery(false); }}
                                        className="text-emerald-500 hover:underline"
                                    >
                                        Volver a Inicio de sesión
                                    </button>
                                </p>
                                {error && (
                                    <div className="p-2 bg-red-100 text-red-600 rounded-md border border-red-300 text-sm">{error}</div>
                                )}
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </section>
    );
};

export default LoginSection;
