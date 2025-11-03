import React, { useState } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import toast from 'react-hot-toast';
import { getApiBaseUrl } from "@/utils/apiBaseUrl";
import { getRecaptchaToken } from "@/utils/recaptcha";


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
        <section className="w-full h-screen flex items-center justify-center bg-gray-200">
            <div
                className="relative w-full max-w-md p-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 rounded-lg"
            >
                <div className="relative z-10 p-6 bg-white rounded-lg">
                    <form onSubmit={validateForm} className="space-y-4">
                        <h1 className="text-2xl font-semibold text-center">Registrar Cuenta</h1>
                        <p className="text-gray-600">Por favor complete la siguiente información:</p>
                        <div>
                            <label htmlFor="nombre" className="block text-left text-gray-700">Nombres (máx. 40 caracteres)</label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                placeholder="Ingresa tu Nombre"
                                maxLength={40}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:shadow-lg transition duration-200 ease-in-out"
                                value={nombre}
                                onChange={handleNombreChange}
                            />
                            {nombreError && (
                                <div className="p-1 text-xs text-red-600">{nombreError}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="apellido" className="block text-left text-gray-700">Apellidos (máx. 40 caracteres)</label>
                            <input
                                id="apellido"
                                name="apellido"
                                type="text"
                                placeholder="Ingresa tu Apellido"
                                maxLength={40}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:shadow-lg transition duration-200 ease-in-out"
                                value={apellido}
                                onChange={handleApellidoChange}
                            />
                            {apellidoError && (
                                <div className="p-1 text-xs text-red-600">{apellidoError}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-left text-gray-700">Teléfono (9 dígitos)</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="987654321"
                                maxLength={9}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:shadow-lg transition duration-200 ease-in-out"
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                            {phoneError && (
                                <div className="p-1 text-xs text-red-600">{phoneError}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-left text-gray-700">Correo Electrónico</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:shadow-lg transition duration-200 ease-in-out"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-gray-700">Contraseña (mín. 8 caracteres)</label>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">Debe contener una mayúscula, un número y un carácter especial.</p>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:shadow-lg transition duration-200 ease-in-out"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {passwordError && (
                                <div className="p-1 text-xs text-red-600">{passwordError}</div>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="confirmPassword" className="text-gray-700">Confirmar Contraseña</label>
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Repite tu contraseña"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:shadow-lg transition duration-200 ease-in-out"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            {confirmPasswordError && (
                                <div className="p-1 text-xs text-red-600">{confirmPasswordError}</div>
                            )}
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
                                before:absolute before:inset-0 before:bg-emerald-500 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 before:pointer-events-none cursor-pointer"
                            disabled={loading}
                            onClick={() => { console.log('Click en botón registrar'); }}
                        >
                            <span className="relative z-10 cursor-pointer">{loading ? 'Registrando...' : 'Registrar Cuenta'}</span>
                        </button>
                    </form>

                    <p className="mt-4 text-gray-600">
                        ¿Ya tienes una cuenta? <Link href="/login" className="text-emerald-500 hover:underline">Inicia Sesión</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RegisterSection;
