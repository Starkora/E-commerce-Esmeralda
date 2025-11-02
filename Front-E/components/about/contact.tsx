import React, { useMemo, useState } from "react";
import { getApiBaseUrl } from "@/utils/apiBaseUrl";
import { getRecaptchaToken } from "@/utils/recaptcha";

const Contact: React.FC = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        acceptPolicy: false,
        website: "", // honeypot
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    // Unificar con el resto del proyecto usando la misma utilidad
    const apiBase = useMemo(() => (getApiBaseUrl() || '').replace(/\/$/, ''), []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as any;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResult(null);
        if (!apiBase) {
            setResult("No hay API configurada. Define NEXT_PUBLIC_API_URL en Vercel.");
            return;
        }
        if (!form.acceptPolicy) {
            setResult("Debes aceptar la política de protección de datos.");
            return;
        }
        if (!form.name || !form.email || !form.subject || !form.message) {
            setResult("Completa los campos obligatorios.");
            return;
        }
        try {
            setLoading(true);
            // Obtener token reCAPTCHA v3 si está configurado
            const recaptchaToken = await getRecaptchaToken('contact');

            // Usar GET con query parameters (funciona, a diferencia de POST)
            const params = new URLSearchParams({
                name: form.name,
                email: form.email,
                phone: form.phone || '',
                subject: form.subject,
                message: form.message
            });
            
            const res = await fetch(`${apiBase}/contact-send?${params}`, {
                method: "GET"
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data?.message || "Error al enviar");
            setResult("¡Mensaje enviado! Te responderemos pronto.");
            setForm({ name: "", email: "", phone: "", subject: "", message: "", acceptPolicy: false, website: "" });
        } catch (err: any) {
            setResult(err.message || "No se pudo enviar tu mensaje.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100">
            {/* Sección de Encabezado con Imagen */}
            <div className="relative">
                <img src="/assets/contact/contact.webp" alt="contact" className="w-full h-64 object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
                    Contáctanos
                </h2>
            </div>

            {/* Contenedor Principal para la Sección de Contacto */}
            <div className="max-w-6xl mx-auto mt-10 mb-10 bg-white shadow-lg rounded-lg p-8 flex gap-10">
                {/* Columna de Información */}
                <div className="w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Aquí estamos para poder ayudarte</h3>
                    <p className="text-gray-600 mb-6">
                        Aquí encontrarás nuestros canales de atención para poder ayudarte.
                    </p>
                    <div className="flex items-center mb-6">
                        <span className="text-red-500 text-2xl mr-2">📍</span>
                        <p className="text-gray-700">Antigua Panamericana Sur, Lurín 15823</p>
                    </div>
                    <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d974.6412385940343!2d-76.86996263047658!3d-12.27769268881659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105bd1f0a9943c7%3A0xd04be0750756a0bc!2sAntigua%20Panamericana%20Sur%2C%20Lima%2015823!5e0!3m2!1ses!2spe!4v1744411640839!5m2!1ses!2spe"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Columna de Formulario de Contacto */}
                <div className="w-1/2">
                    <p className="mb-4 text-gray-700">Si tienes alguna consulta déjanos tu mensaje y en breve te contestaremos.</p>
                    <form className="bg-gray-50 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Nombre y apellidos</label>
                            <input name="name" value={form.name} onChange={handleChange} type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Nombre y apellidos" required />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Correo electrónico</label>
                            <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full px-3 py-2 border rounded-lg" placeholder="Correo electrónico" required />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Teléfono</label>
                            <input name="phone" value={form.phone} onChange={handleChange} type="tel" className="w-full px-3 py-2 border rounded-lg" placeholder="Teléfono" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Asunto</label>
                            <input name="subject" value={form.subject} onChange={handleChange} type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Asunto" required />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Mensaje</label>
                            <textarea name="message" value={form.message} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Escribe tu mensaje aquí..." rows={4} required></textarea>
                        </div>

                        <div className="flex items-center mb-4">
                            <input name="acceptPolicy" checked={form.acceptPolicy} onChange={handleChange} type="checkbox" id="privacyPolicy" className="mr-2" />
                            <label htmlFor="privacyPolicy" className="text-gray-600">
                                He leído y acepto la <a href="#" className="text-blue-500 underline">política de protección de datos personales</a>.
                            </label>
                        </div>

                        {/* Honeypot (oculto para personas, visible para bots) */}
                        <div className="hidden" aria-hidden>
                            <label>Tu sitio web</label>
                            <input name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                        </div>

                        {result && (
                            <div className={`mb-3 text-sm ${result.includes('¡Mensaje enviado!') ? 'text-green-600' : 'text-red-600'}`}>
                                {result}
                            </div>
                        )}
                        <button type="submit" disabled={loading} className="w-full bg-black text-white py-2 rounded-lg hover:bg-emerald-400 disabled:opacity-60">
                            {loading ? 'Enviando...' : 'Enviar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
