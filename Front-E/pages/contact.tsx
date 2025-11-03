import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ContactCard, StatCard, InfoCard } from "@/components/shared";
import { getApiBaseUrl } from "@/utils/apiBaseUrl";
import { getRecaptchaToken } from "@/utils/recaptcha";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaCheckCircle,
  FaHeadset,
  FaComments,
  FaUserCheck
} from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
    acceptPolicy: false,
    website: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [checkingUser, setCheckingUser] = useState(true);

  const apiBase = useMemo(() => (getApiBaseUrl() || "").replace(/\/$/, ""), []);

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      if (!apiBase) {
        setCheckingUser(false);
        return;
      }
      try {
        const res = await fetch(`${apiBase}/user`, {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setForm((f) => ({ ...f, name: f.name || data?.name || "" }));
        } else {
          setUser(null);
        }
      } catch (err) {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setCheckingUser(false);
        }
      }
    };

    const handleLogin = (ev: Event) => {
      const custom = ev as CustomEvent<{ name?: string; email?: string }>;
      if (custom?.detail) {
        setUser(custom.detail);
        setForm((f) => ({ ...f, name: f.name || custom.detail.name || "" }));
      } else {
        fetchUser();
      }
    };

    window.addEventListener("login", handleLogin as EventListener);
    fetchUser();

    return () => {
      mounted = false;
      window.removeEventListener("login", handleLogin as EventListener);
    };
  }, [apiBase]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as any;
    const checked = (e.target as HTMLInputElement).checked;
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
    if (!user) {
      setResult("Debes iniciar sesión para enviar un mensaje de contacto.");
      return;
    }
    if (!form.name || !form.subject || !form.message) {
      setResult("Completa los campos obligatorios.");
      return;
    }
    try {
      setLoading(true);
      const recaptchaToken = await getRecaptchaToken("contact");

      const params = new URLSearchParams({
        name: form.name,
        phone: form.phone || "",
        subject: form.subject,
        message: form.message,
      });

      const res = await fetch(`${apiBase}/contact-send?${params}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Error al enviar");
      setResult("¡Mensaje enviado! Te responderemos pronto.");
      setForm({
        name: user.name || "",
        phone: "",
        subject: "",
        message: "",
        acceptPolicy: false,
        website: "",
      });
    } catch (err: any) {
      setResult(err.message || "No se pudo enviar tu mensaje.");
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      value: "+51 987 654 321",
      description: "Respuesta en 5-10 min",
      href: "https://wa.me/51987654321",
      color: "emerald" as const,
    },
    {
      icon: <FaPhone />,
      title: "Teléfono",
      value: "(01) 987-6543",
      description: "Lun-Sáb 9:00-18:00",
      href: "tel:+51987654321",
      color: "blue" as const,
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "soporte@estiloesmeralda.com",
      description: "Respuesta en 24-48 hrs",
      href: "mailto:soporte@estiloesmeralda.com",
      color: "purple" as const,
    },
  ];

  const statistics = [
    {
      icon: <FaHeadset />,
      number: "10,000+",
      label: "Clientes atendidos",
      color: "emerald" as const,
      variant: "default" as const,
    },
    {
      icon: <FaComments />,
      number: "< 2 hrs",
      label: "Tiempo de respuesta promedio",
      color: "blue" as const,
      variant: "default" as const,
    },
    {
      icon: <FaUserCheck />,
      number: "98%",
      label: "Satisfacción del cliente",
      color: "purple" as const,
      variant: "default" as const,
    },
  ];

  return (
    <>
      <Head>
        <title>Contacto - Estilo Esmeralda</title>
        <meta
          name="description"
          content="Contáctanos por WhatsApp, teléfono o email. Estamos aquí para ayudarte con todas tus consultas."
        />
      </Head>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-4">
              <FaEnvelope className="text-emerald-600 text-4xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Contáctanos
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Estamos aquí para ayudarte. Elige el canal de comunicación que
              prefieras o envíanos un mensaje directamente.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {statistics.map((stat, idx) => (
              <StatCard
                key={idx}
                icon={stat.icon}
                number={stat.number}
                label={stat.label}
                color={stat.color}
                variant={stat.variant}
              />
            ))}
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, idx) => (
              <ContactCard
                key={idx}
                icon={method.icon}
                title={method.title}
                value={method.value}
                description={method.description}
                href={method.href}
                color={method.color}
                variant="featured"
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Envíanos un Mensaje
              </h2>
              <p className="text-gray-600 mb-6">
                Si tienes alguna consulta, déjanos tu mensaje y en breve te
                contestaremos.
              </p>

              {!checkingUser && !user && (
                <div className="mb-6 rounded-lg border border-yellow-400 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
                  Necesitas iniciar sesión para usar el formulario de contacto.{" "}
                  <a href="/login" className="underline font-medium">
                    Inicia sesión aquí
                  </a>
                  .
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre y apellidos *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Tu número de teléfono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Asunto *
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Motivo de tu consulta"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    required
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    name="acceptPolicy"
                    checked={form.acceptPolicy}
                    onChange={handleChange}
                    type="checkbox"
                    id="privacyPolicy"
                    className="mt-1 mr-3 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="privacyPolicy" className="text-sm text-gray-600">
                    He leído y acepto la{" "}
                    <a href="/privacy-policy" className="text-emerald-600 underline">
                      política de protección de datos personales
                    </a>
                    .
                  </label>
                </div>

                {/* Honeypot */}
                <div className="hidden" aria-hidden>
                  <label>Tu sitio web</label>
                  <input
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {result && (
                  <div
                    className={`p-4 rounded-lg text-sm ${
                      result.includes("¡Mensaje enviado!")
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {result}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || checkingUser || !user}
                  className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>
            </div>

            {/* Location & Info */}
            <div className="space-y-6">
              {/* Location Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <FaMapMarkerAlt className="text-emerald-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Nuestra Ubicación
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Antigua Panamericana Sur, Lurín 15823
                </p>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d974.6412385940343!2d-76.86996263047658!3d-12.27769268881659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105bd1f0a9943c7%3A0xd04be0750756a0bc!2sAntigua%20Panamericana%20Sur%2C%20Lima%2015823!5e0!3m2!1ses!2spe!4v1744411640839!5m2!1ses!2spe"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <FaClock className="text-emerald-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Horarios de Atención
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Lunes - Viernes</span>
                    <span className="text-gray-900 font-semibold">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Sábado</span>
                    <span className="text-gray-900 font-semibold">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">Domingo</span>
                    <span className="text-red-600 font-semibold">Cerrado</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-4">¿Necesitas Ayuda Rápida?</h3>
                <p className="text-emerald-100 mb-6">
                  Visita nuestro centro de ayuda o chatea con nosotros por WhatsApp
                </p>
                <div className="space-y-3">
                  <a
                    href="/whatsapp-support"
                    className="block w-full bg-white text-emerald-600 font-bold py-3 px-6 rounded-lg hover:bg-emerald-50 transition-colors text-center"
                  >
                    <FaWhatsapp className="inline mr-2" />
                    Soporte por WhatsApp
                  </a>
                  <a
                    href="/help-center"
                    className="block w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors text-center border-2 border-white"
                  >
                    <FaCheckCircle className="inline mr-2" />
                    Centro de Ayuda
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
