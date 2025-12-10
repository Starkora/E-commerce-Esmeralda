import React, { useState } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import toast from 'react-hot-toast';
import { getApiBaseUrl } from "@/utils/apiBaseUrl";
import { getRecaptchaToken } from "@/utils/recaptcha";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaShieldAlt, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';


const RegisterSection: React.FC = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [nombreError, setNombreError] = useState("");
    const [apellidoError, setApellidoError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Función para obtener el valor de una cookie por nombre
    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return '';
    }

    const router = useRouter();

    // Función de registro usando axios
    const handleRegister = async () => {
        setLoading(true);
        setError("");
        try {
            const axios = (await import('axios')).default;
            const apiBaseUrl = getApiBaseUrl();

            // 1) Asegurar sesión y obtener token CSRF desde el backend (sin leer cookies cross-site)
            await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`, { withCredentials: true });
            const csrfResp = await axios.get(`${apiBaseUrl}/csrf-token`, { withCredentials: true });
            const csrfToken: string = csrfResp?.data?.csrf_token || '';

            // Obtener token reCAPTCHA v3 si está configurado
            const recaptchaToken = await getRecaptchaToken('register');

            // Enviar datos al backend incluyendo phone, password_confirmation y recaptchaToken
            await axios.post(
                `${apiBaseUrl}/spa-register`,
                {
                    _token: csrfToken, // fallback: Laravel también acepta el token en el body
                    name: nombre,
                    last_name: apellido,
                    email,
                    phone,
                    password,
                    password_confirmation: confirmPassword,
                    recaptchaToken,
                },
                {
                    withCredentials: true,
                    headers: {
                        // Enviar token de sesión directo (evita leer cookie XSRF en dominio distinto)
                        'X-CSRF-TOKEN': csrfToken || '',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Si el registro es exitoso, mostrar toast y redirigir a verificación
            toast.success('Registro exitoso');
            // Redirigir a la página de verificación de correo
            router.push('/verify-email');

        } catch (err: any) {
            if (err.response && err.response.data) {
                const data = err.response.data;
                // Si backend retorna HTML con mensaje de verificación, redirigir
                if (typeof data === 'string' && data.includes('Su dirección de correo electrónico no está verificada')) {
                    router.push('/verify-email');
                    return;
                }
                // Si el correo ya está registrado, mostrar alerta específica
                if (data.errors && data.errors.email) {
                    // Si el error es por correo ya registrado, personaliza el mensaje
                    const emailError = data.errors.email[0];
                    if (emailError.toLowerCase().includes('taken') || emailError.toLowerCase().includes('ya ha sido registrado')) {
                        setError('El correo ya está registrado');
                        toast.error('El correo ya está registrado');
                        return;
                    }
                }
                const msg = data.message || 'Error al registrar';
                setError(msg);
                toast.error(msg);
            } else {
                setError('Error de red o servidor');
                toast.error('Error de red o servidor');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNombre(value);
        setError("");
        // Solo letras y máximo 50 caracteres
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,50}$/.test(value)) {
            setNombreError("El nombre solo permite letras y máximo 50 caracteres.");
        } else {
            setNombreError("");
        }
    };

    const handleApellidoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setApellido(value);
        setError("");
        // Solo letras y máximo 50 caracteres
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,50}$/.test(value)) {
            setApellidoError("El apellido solo permite letras y máximo 50 caracteres.");
        } else {
            setApellidoError("");
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError("");
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Solo permitir números y limitar a 9 dígitos
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 9) {
            setPhone(value);
            setError("");
            // Validar cuando tenga 9 dígitos
            if (value.length > 0 && value.length !== 9) {
                setPhoneError("El teléfono debe tener exactamente 9 dígitos.");
            } else {
                setPhoneError("");
            }
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setError("");
        // Mínimo 8 caracteres, al menos 1 número y 1 símbolo
        if (!/^.*(?=.{8,})(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:;"'|<>,.?/~`]).*$/.test(value)) {
            setPasswordError("La contraseña debe tener mínimo 8 caracteres, al menos 1 número y 1 símbolo.");
        } else {
            setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setError("");
        // Mismos requisitos que la contraseña
        if (!/^.*(?=.{8,})(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:;"'|<>,.?/~`]).*$/.test(value)) {
            setConfirmPasswordError("La confirmación debe tener mínimo 8 caracteres, al menos 1 número y 1 símbolo.");
        } else {
            setConfirmPasswordError("");
        }
    };

    const validateForm = async (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;
        setError("");

        // Validación nombre - máximo 40 caracteres
        if (!nombre.trim()) {
            setNombreError("El nombre es obligatorio.");
            valid = false;
        } else if (nombre.trim().length > 40) {
            setNombreError("El nombre no puede exceder 40 caracteres.");
            valid = false;
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre)) {
            setNombreError("El nombre solo permite letras.");
            valid = false;
        } else {
            setNombreError("");
        }

        // Validación apellido - máximo 40 caracteres
        if (!apellido.trim()) {
            setApellidoError("El apellido es obligatorio.");
            valid = false;
        } else if (apellido.trim().length > 40) {
            setApellidoError("El apellido no puede exceder 40 caracteres.");
            valid = false;
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(apellido)) {
            setApellidoError("El apellido solo permite letras.");
            valid = false;
        } else {
            setApellidoError("");
        }

        // Validación teléfono - exactamente 9 dígitos
        if (!/^\d{9}$/.test(phone)) {
            setPhoneError("El teléfono debe tener exactamente 9 dígitos.");
            valid = false;
        } else {
            setPhoneError("");
        }

        // Validación email - formato válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Por favor, introduce un correo electrónico válido.");
            valid = false;
        }

        // Validación contraseña - mínimo 8 caracteres, 1 mayúscula, 1 número, 1 carácter especial
        if (password.length < 8) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres.");
            valid = false;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError("La contraseña debe contener al menos una letra mayúscula.");
            valid = false;
        } else if (!/[0-9]/.test(password)) {
            setPasswordError("La contraseña debe contener al menos un número.");
            valid = false;
        } else if (!/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/'`~;]/.test(password)) {
            setPasswordError("La contraseña debe contener al menos un carácter especial.");
            valid = false;
        } else {
            setPasswordError("");
        }

        // Validación confirmación de contraseña con los mismos requisitos
        if (confirmPassword.length < 8) {
            setConfirmPasswordError("La confirmación debe tener al menos 8 caracteres.");
            valid = false;
        } else if (!/[A-Z]/.test(confirmPassword)) {
            setConfirmPasswordError("La confirmación debe contener al menos una letra mayúscula.");
            valid = false;
        } else if (!/[0-9]/.test(confirmPassword)) {
            setConfirmPasswordError("La confirmación debe contener al menos un número.");
            valid = false;
        } else if (!/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/'`~;]/.test(confirmPassword)) {
            setConfirmPasswordError("La confirmación debe contener al menos un carácter especial.");
            valid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Las contraseñas no coinciden.");
            valid = false;
        } else {
            setConfirmPasswordError("");
        }

        if (!valid) return;
        setError("");
        await handleRegister();
    };

    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-6">
                {/* Logo y título */}
                <div className="text-center">
                    <div className="mx-auto h-14 w-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
                        <FaShieldAlt className="h-7 w-7 text-white" />
                    </div>
                    <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                        Crear Cuenta
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Únete a Estilo Esmeralda
                    </p>
                </div>

                {/* Card principal */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="px-6 py-8 sm:px-8 sm:py-10">
                        <form onSubmit={validateForm} className="space-y-5">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Información Personal</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Completa el formulario para crear tu cuenta
                                </p>
                            </div>

                            {/* Grid para Nombre y Apellido */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Nombre */}
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Nombres <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative rounded-lg shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            id="nombre"
                                            name="nombre"
                                            type="text"
                                            required
                                            maxLength={40}
                                            placeholder="Tu nombre"
                                            className={`block w-full pl-10 pr-3 py-2.5 border ${nombreError ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-gray-900`}
                                            value={nombre}
                                            onChange={handleNombreChange}
                                        />
                                    </div>
                                    {nombreError && (
                                        <p className="mt-1 text-xs text-red-600">{nombreError}</p>
                                    )}
                                </div>

                                {/* Apellido */}
                                <div>
                                    <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Apellidos <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative rounded-lg shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            id="apellido"
                                            name="apellido"
                                            type="text"
                                            required
                                            maxLength={40}
                                            placeholder="Tus apellidos"
                                            className={`block w-full pl-10 pr-3 py-2.5 border ${apellidoError ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-gray-900`}
                                            value={apellido}
                                            onChange={handleApellidoChange}
                                        />
                                    </div>
                                    {apellidoError && (
                                        <p className="mt-1 text-xs text-red-600">{apellidoError}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Correo Electrónico <span className="text-red-500">*</span>
                                </label>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="tu@email.com"
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-gray-900"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Teléfono <span className="text-red-500">*</span>
                                </label>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaPhone className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        maxLength={9}
                                        placeholder="987654321"
                                        className={`block w-full pl-10 pr-3 py-2.5 border ${phoneError ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-gray-900`}
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    />
                                </div>
                                {phoneError && (
                                    <p className="mt-1 text-xs text-red-600">{phoneError}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">Debe tener 9 dígitos</p>
                            </div>

                            {/* Contraseña */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Contraseña <span className="text-red-500">*</span>
                                </label>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        placeholder="••••••••"
                                        className={`block w-full pl-10 pr-12 py-2.5 border ${passwordError ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-gray-900`}
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {passwordError && (
                                    <p className="mt-1 text-xs text-red-600">{passwordError}</p>
                                )}
                                <div className="mt-2 space-y-0.5">
                                    <p className="text-xs text-gray-600 flex items-center">
                                        <FaCheckCircle className={`h-3 w-3 mr-1 ${password.length >= 8 ? 'text-emerald-500' : 'text-gray-400'}`} />
                                        Mínimo 8 caracteres
                                    </p>
                                    <p className="text-xs text-gray-600 flex items-center">
                                        <FaCheckCircle className={`h-3 w-3 mr-1 ${/[A-Z]/.test(password) ? 'text-emerald-500' : 'text-gray-400'}`} />
                                        Una letra mayúscula
                                    </p>
                                    <p className="text-xs text-gray-600 flex items-center">
                                        <FaCheckCircle className={`h-3 w-3 mr-1 ${/[0-9]/.test(password) ? 'text-emerald-500' : 'text-gray-400'}`} />
                                        Un número
                                    </p>
                                    <p className="text-xs text-gray-600 flex items-center">
                                        <FaCheckCircle className={`h-3 w-3 mr-1 ${/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/'`~;]/.test(password) ? 'text-emerald-500' : 'text-gray-400'}`} />
                                        Un carácter especial
                                    </p>
                                </div>
                            </div>

                            {/* Confirmar Contraseña */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Confirmar Contraseña <span className="text-red-500">*</span>
                                </label>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        placeholder="••••••••"
                                        className={`block w-full pl-10 pr-12 py-2.5 border ${confirmPasswordError ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-gray-900`}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                        aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {confirmPasswordError && (
                                    <p className="mt-1 text-xs text-red-600">{confirmPasswordError}</p>
                                )}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registrando...
                                    </>
                                ) : (
                                    'Crear Cuenta'
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="mt-5">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">¿Ya tienes cuenta?</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Link
                                    href="/login"
                                    className="w-full flex justify-center py-2.5 px-4 border-2 border-emerald-500 rounded-lg text-sm font-medium text-emerald-600 bg-white hover:bg-emerald-50 transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    Iniciar Sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterSection;
