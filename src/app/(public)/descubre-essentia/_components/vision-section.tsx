"use client";

import { Target, BarChart3, Lightbulb } from "lucide-react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/kit/badge";

const VisionSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <section
      id="vision-proposito"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-1/3 w-1/3 rounded-full bg-rose-100 opacity-30 mix-blend-multiply blur-3xl filter"></div>
        <div className="absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full bg-indigo-100 opacity-30 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-4 bg-indigo-100 px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-200">
              VISIÓN Y PROPÓSITO
            </Badge>
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
              Imagina cómo Essentia transformará tu bienestar
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-600 md:text-lg">
              Essentia te acompaña en el camino hacia una salud plena,
              ayudándote a definir metas reales, seguir tu progreso y tomar
              decisiones respaldadas por evidencia. Todo lo que necesitas para
              avanzar, en un solo lugar.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                  <Target className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-semibold">
                    Objetivos que realmente importan
                  </h4>
                  <p className="text-base text-gray-600">
                    Essentia te impulsa a avanzar hacia un bienestar real,
                    ayudándote a definir metas de salud que se adapten a ti y
                    que puedas alcanzar paso a paso.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-100">
                  <BarChart3 className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-semibold">
                    Progreso que puedes entender y sostener
                  </h4>
                  <p className="text-base text-gray-600">
                    Visualizar tu evolución te permite tomar decisiones con
                    claridad. Con Essentia, cada pequeño avance cobra sentido en
                    el camino hacia una vida más equilibrada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <Lightbulb className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-semibold">
                    Recomendaciones que hacen sentido
                  </h4>
                  <p className="text-base text-gray-600">
                    Toda recomendación nace de evidencia confiable y de tus
                    propias necesidades. Así, puedes avanzar con seguridad hacia
                    lo que verdaderamente necesitas para estar mejor.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rotate-3 transform rounded-3xl bg-linear-to-br/shorter from-indigo-200 to-rose-200"></div>
              <div className="absolute inset-0 -rotate-3 transform overflow-hidden rounded-3xl bg-white shadow-lg">
                <div className="relative h-full">
                  {!videoError ? (
                    <video
                      ref={videoRef}
                      preload="metadata"
                      poster="/screenshots/screenshot-05.png"
                      src="https://res.cloudinary.com/dcub4itgg/video/upload/f_auto:video,q_auto/v1/essentia/section-05-essentia"
                      autoPlay
                      loop
                      muted
                      onError={() => setVideoError(true)}
                      className="aspect-square size-full rounded-3xl object-cover"
                    ></video>
                  ) : (
                    <Image
                      src="/screenshots/screenshot-05.png"
                      width={471}
                      height={471}
                      alt="Visión de bienestar integral"
                      className="aspect-square size-full rounded-3xl object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-blue-950/80 to-transparent to-40%">
                    <div className="p-6 text-white">
                      <h3 className="mb-2 text-2xl font-bold">
                        El futuro del bienestar
                      </h3>
                      <p>
                        Estamos creando una nueva forma de gestionar tu salud y
                        bienestar con tecnología inteligente y personalizada.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
