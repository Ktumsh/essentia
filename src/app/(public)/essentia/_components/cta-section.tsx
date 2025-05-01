"use client";

import { Sparkles, HeartPulse, ShieldCheck } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { LoginButton } from "@/components/button-kit/login-button";
import { Button } from "@/components/kit/button";
import Logo from "@/components/ui/layout/logo";

const CtaSection = () => {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-rose-50 to-indigo-50 py-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-br from-indigo-300/20 to-rose-300/20 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            Comienza tu viaje hacia una{" "}
            <span className="bg-linear-to-r/shorter from-rose-500 to-indigo-500 bg-clip-text text-transparent">
              vida más saludable
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-base text-gray-600 md:text-lg">
            Da el primer paso hacia una vida más saludable. Essentia ha sido
            creada para acompañarte en tu bienestar físico y mental con
            herramientas claras, orientación confiable y un enfoque realmente
            personalizado.
          </p>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="transform rounded-2xl bg-white p-6 text-start shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <ShieldCheck className="text-indigo-600" size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Seguridad garantizada
              </h3>
              <p className="text-base text-gray-600">
                Tu información médica se protege con encriptación avanzada y
                altos estándares de seguridad para garantizar tu privacidad.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="transform rounded-2xl bg-white p-6 text-start shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                <HeartPulse className="text-rose-600" size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Bienestar integral</h3>
              <p className="text-base text-gray-600">
                Aborda tu salud física, mental, emocional y nutricional desde un
                solo lugar con un enfoque completo y equilibrado.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="transform rounded-2xl bg-white p-6 text-start shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Sparkles className="text-blue-600" size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">IA personalizada</h3>
              <p className="text-base text-gray-600">
                Recibe recomendaciones ajustadas a tu perfil médico y objetivos
                de salud mediante nuestra inteligencia artificial especializada.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="gradient"
              className="group h-12 transform flex-row-reverse rounded-full px-8 text-base text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl [&_svg]:size-5!"
              onClick={() => router.push("/signup")}
            >
              Comenzar gratis
            </Button>
            <ArrowLeftButton
              size="lg"
              variant="outline"
              className="group h-12 flex-row-reverse rounded-full border-2 border-indigo-200 px-8 text-base text-indigo-700 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md [&_svg]:size-5! [&_svg]:rotate-180"
              onClick={() => router.push("/planes")}
            >
              Ver planes premium
            </ArrowLeftButton>
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-pink-500/20 blur-md"></div>
                  <Logo height={96} width={96} className="mx-auto h-24" />
                </div>
              </div>
              <div className="text-left md:w-2/3">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">
                  ¿Ya eres usuario?
                </h3>
                <p className="mb-4 text-base text-gray-600">
                  Inicia sesión para continuar tu viaje hacia una vida más
                  saludable y acceder a todas tus herramientas personalizadas.
                </p>
                <LoginButton
                  variant="outline"
                  className="border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  Iniciar sesión
                </LoginButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
