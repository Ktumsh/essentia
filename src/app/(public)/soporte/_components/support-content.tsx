"use client";

import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  HelpCircle,
  CreditCard,
  Settings,
  CheckCircle2,
  Users,
  ShieldCheck,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/kit/accordion";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";

const SupportContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeTab, setActiveTab] = useState("general");

  // Preguntas frecuentes por categoría
  const faqCategories = {
    general: [
      {
        question: "¿Qué es Essentia y cómo funciona?",
        answer:
          "Essentia es una plataforma integral de salud y bienestar que te ayuda a gestionar tu historial médico, recibir recomendaciones personalizadas y mejorar tu bienestar general. Nuestra plataforma combina tecnología avanzada con conocimientos médicos para ofrecerte una experiencia personalizada según tus necesidades específicas.",
      },
      {
        question: "¿Cómo puedo crear una cuenta en Essentia?",
        answer:
          "Puedes registrarte fácilmente haciendo clic en el botón 'Comenzar gratis' en nuestra página de inicio. Solo necesitarás proporcionar tu correo electrónico y crear una contraseña. También puedes registrarte usando tu cuenta de Google o Apple para mayor comodidad.",
      },
      {
        question: "¿Es segura mi información médica en Essentia?",
        answer:
          "Absolutamente. La seguridad de tus datos es nuestra prioridad. Utilizamos encriptación de extremo a extremo, cumplimos con todas las regulaciones de protección de datos aplicables y nunca compartimos tu información con terceros sin tu consentimiento explícito. Todos nuestros sistemas están protegidos con las más avanzadas medidas de seguridad.",
      },
      {
        question: "¿Puedo acceder a Essentia desde cualquier dispositivo?",
        answer:
          "Sí, Essentia está disponible en múltiples plataformas. Puedes acceder a través de nuestro sitio web desde cualquier navegador, o descargar nuestras aplicaciones móviles para iOS y Android. Tu información se sincroniza automáticamente entre todos tus dispositivos.",
      },
    ],
    planes: [
      {
        question: "¿Cuáles son las diferencias entre los planes disponibles?",
        answer:
          "Ofrecemos tres planes: Básico (gratuito), Premium y Premium Plus. El plan Básico te da acceso a funciones esenciales como perfil de usuario y recursos educativos básicos. El plan Premium incluye IA personalizada, planes de salud a medida y hasta 24 archivos médicos. El Premium Plus ofrece todo lo anterior más soporte prioritario, hasta 60 archivos médicos y un 20% de descuento con pago anual.",
      },
      {
        question: "¿Puedo cambiar de plan en cualquier momento?",
        answer:
          "Sí, puedes actualizar o cambiar tu plan cuando lo desees. Si actualizas a un plan superior, el cambio se aplicará inmediatamente. Si cambias a un plan inferior, el cambio se aplicará al final de tu ciclo de facturación actual.",
      },
      {
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Aceptamos tarjetas de crédito y débito principales (Visa, Mastercard, American Express), así como PayPal. Todos los pagos se procesan de forma segura a través de nuestro proveedor de pagos certificado.",
      },
      {
        question: "¿Ofrecen período de prueba para los planes premium?",
        answer:
          "Sí, ofrecemos un período de prueba gratuito de 14 días para el plan Premium. Durante este período, tendrás acceso completo a todas las funciones premium sin cargo. Puedes cancelar en cualquier momento durante el período de prueba sin que se te cobre.",
      },
    ],
    tecnico: [
      {
        question: "¿Qué hago si olvidé mi contraseña?",
        answer:
          "Si olvidaste tu contraseña, simplemente haz clic en 'Olvidé mi contraseña' en la página de inicio de sesión. Te enviaremos un enlace a tu correo electrónico para que puedas crear una nueva contraseña de forma segura.",
      },
      {
        question: "La aplicación no carga correctamente, ¿qué puedo hacer?",
        answer:
          "Primero, intenta actualizar la página o reiniciar la aplicación. Si el problema persiste, borra la caché de tu navegador o reinstala la aplicación. Si aún tienes problemas, contacta a nuestro equipo de soporte técnico con detalles sobre tu dispositivo y el problema específico.",
      },
      {
        question:
          "¿Cómo puedo sincronizar mis dispositivos wearables con Essentia?",
        answer:
          "Para sincronizar tus dispositivos wearables, ve a 'Configuración' > 'Conexiones' > 'Dispositivos wearables' en tu cuenta. Selecciona tu dispositivo (Apple Watch, Fitbit, Garmin, etc.) y sigue las instrucciones para completar la sincronización. Necesitarás autorizar a Essentia en la aplicación de tu dispositivo.",
      },
      {
        question: "¿Por qué no puedo subir mis archivos médicos?",
        answer:
          "Si tienes problemas para subir archivos médicos, verifica que el formato sea compatible (PDF, JPG, PNG) y que el tamaño no exceda los 10MB. También asegúrate de tener una conexión estable a internet. Si el problema continúa, podría estar relacionado con el límite de archivos de tu plan actual.",
      },
    ],
  };

  return (
    <div className="mt-14 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero Section */}
        <div className="mx-auto mb-16 max-w-3xl text-center" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-indigo-100 px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-200">
              SOPORTE
            </Badge>
            <h1 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
              Estamos aquí para{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent">
                ayudarte
              </span>
            </h1>
            <p className="text-base text-gray-600 md:text-lg">
              Nuestro equipo de soporte está listo para resolver tus dudas y
              brindarte la asistencia que necesitas para aprovechar al máximo tu
              experiencia con Essentia.
            </p>
          </motion.div>
        </div>

        {/* Support Categories */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
              <HelpCircle className="text-indigo-600" size={24} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Ayuda General</h3>
            <p className="mb-4 text-gray-600">
              Información sobre la plataforma, funcionalidades y preguntas
              frecuentes.
            </p>
            <Button
              variant="outline"
              className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              onClick={() => setActiveTab("general")}
            >
              Ver ayuda general
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
              <CreditCard className="text-rose-600" size={24} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Planes y Facturación</h3>
            <p className="mb-4 text-gray-600">
              Información sobre suscripciones, pagos y gestión de tu cuenta
              premium.
            </p>
            <Button
              variant="outline"
              className="w-full border-rose-200 text-rose-700 hover:bg-rose-50"
              onClick={() => setActiveTab("planes")}
            >
              Ver planes y facturación
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Settings className="text-blue-600" size={24} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Soporte Técnico</h3>
            <p className="mb-4 text-gray-600">
              Ayuda con problemas técnicos, configuración y uso de la
              plataforma.
            </p>
            <Button
              variant="outline"
              className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => setActiveTab("tecnico")}
            >
              Ver soporte técnico
            </Button>
          </motion.div>
        </div>

        {/* FAQ Tabs */}
        <div className="mb-16">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold">Preguntas frecuentes</h2>

            <Tabs
              defaultValue="general"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-8 grid w-full grid-cols-3">
                <TabsTrigger value="general" className="text-sm">
                  Ayuda General
                </TabsTrigger>
                <TabsTrigger value="planes" className="text-sm">
                  Planes y Facturación
                </TabsTrigger>
                <TabsTrigger value="tecnico" className="text-sm">
                  Soporte Técnico
                </TabsTrigger>
              </TabsList>

              {Object.entries(faqCategories).map(([category, questions]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <Accordion type="single" collapsible className="w-full">
                    {questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${category}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold">Contáctanos</h2>
              <p className="mb-6 text-gray-600">
                ¿No encontraste lo que buscabas? Nuestro equipo de soporte está
                listo para ayudarte. Completa el formulario y te responderemos a
                la brevedad.
              </p>
              <form>
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-lg border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-lg border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Tipo de consulta
                  </label>
                  <select
                    id="subject"
                    className="w-full rounded-lg border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="general">Consulta general</option>
                    <option value="planes">Planes y facturación</option>
                    <option value="tecnico">Problema técnico</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-lg border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Describe tu consulta en detalle..."
                  ></textarea>
                </div>
                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                  Enviar mensaje
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-8">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                    <Mail className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">
                      Email de soporte
                    </h3>
                    <p className="mb-2 text-gray-600">
                      Respuesta garantizada en menos de 24 horas.
                    </p>
                    <a
                      href="mailto:essentia.app.cl@gmail.com"
                      className="font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      essentia.app.cl@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-100">
                    <Phone className="text-rose-600" size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">
                      Soporte telefónico
                    </h3>
                    <p className="mb-2 text-gray-600">
                      Disponible de lunes a viernes, 9:00 - 18:00.
                    </p>
                    <a
                      href="tel:+56912345678"
                      className="font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      +56 9 1234 5678
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <MessageSquare className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Chat en vivo</h3>
                    <p className="mb-2 text-gray-600">
                      Soporte instantáneo con nuestros especialistas.
                    </p>
                    <Button
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50"
                    >
                      Iniciar chat
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-rose-500 p-6 text-white shadow-md">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <Clock size={20} />
                  Horario de atención
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Lunes - Viernes:</span>
                    <span>9:00 - 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sábado:</span>
                    <span>10:00 - 14:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Domingo:</span>
                    <span>Cerrado</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support Features */}
        <div className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold">
            ¿Por qué elegir nuestro soporte?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl bg-white p-6 shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <CheckCircle2 className="text-indigo-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Respuesta rápida</h3>
              <p className="text-gray-600">
                Nuestro equipo de soporte está comprometido a responder todas
                tus consultas en menos de 24 horas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl bg-white p-6 shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                <Users className="text-rose-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Equipo especializado</h3>
              <p className="text-gray-600">
                Contamos con especialistas en salud, tecnología y atención al
                cliente para resolver cualquier tipo de consulta.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl bg-white p-6 shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <ShieldCheck className="text-green-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Soporte seguro</h3>
              <p className="text-gray-600">
                Todas tus comunicaciones con nuestro equipo de soporte están
                protegidas con los más altos estándares de seguridad.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportContent;
