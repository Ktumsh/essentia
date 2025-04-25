"use client";

import { Sparkles, Shield, Heart, ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/kit/button";

const CtaSection = () => {
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

      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            Comienza tu viaje hacia una{" "}
            <span className="bg-gradient-to-r from-rose-500 to-indigo-500 bg-clip-text text-transparent">
              vida más saludable
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-gray-600">
            Únete a miles de personas que ya están transformando su bienestar
            con Essentia. Nuestra plataforma integral te ofrece todo lo que
            necesitas para cuidar tu salud física y mental.
          </p>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="transform rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <Shield className="text-indigo-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Seguridad garantizada</h3>
              <p className="text-gray-600">
                Tu información médica está protegida con los más altos
                estándares de seguridad y encriptación.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="transform rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                <Heart className="text-rose-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Bienestar integral</h3>
              <p className="text-gray-600">
                Cuida todos los aspectos de tu salud: física, mental, emocional
                y nutricional en una sola plataforma.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="transform rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Sparkles className="text-blue-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">IA personalizada</h3>
              <p className="text-gray-600">
                Recibe recomendaciones adaptadas a tu perfil médico y objetivos
                de salud con nuestra avanzada IA.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="group transform rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 px-8 py-6 text-lg text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-indigo-700 hover:to-pink-700 hover:shadow-xl">
              Comenzar gratis
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Link href="/planes">
              <Button
                variant="outline"
                className="group rounded-full border-2 border-indigo-200 px-8 py-6 text-lg text-indigo-700 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md"
                size="lg"
              >
                Ver planes premium
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-pink-500/20 blur-md"></div>
                  <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-pink-500">
                    <span className="text-4xl font-bold text-white">E</span>
                  </div>
                </div>
              </div>
              <div className="text-left md:w-2/3">
                <h3 className="mb-2 text-2xl font-bold">¿Ya eres usuario?</h3>
                <p className="mb-4 text-gray-600">
                  Inicia sesión para continuar tu viaje hacia una vida más
                  saludable y acceder a todas tus herramientas personalizadas.
                </p>
                <Button
                  variant="outline"
                  className="group border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  Iniciar sesión
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
