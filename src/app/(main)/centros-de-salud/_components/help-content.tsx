"use client";

import {
  Search,
  MapPin,
  Clock,
  Phone,
  Navigation,
  Info,
  ChevronRight,
  Car,
  ArrowRight,
  CornerDownRight,
  CornerUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";

import { HospitalIcon, PharmacyIcon } from "@/components/icons/miscellaneus";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils";

const HelpContent = () => {
  const [activeTab, setActiveTab] = useState("buscar");
  const [animationStep, setAnimationStep] = useState(0);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Controla la secuencia de animación automática dentro del tab activo
  useEffect(() => {
    // Reiniciar el paso de animación cuando cambia el tab
    setAnimationStep(0);

    // Limpiar el temporizador anterior si existe
    if (animationTimerRef.current) {
      clearInterval(animationTimerRef.current);
    }

    // Función para avanzar al siguiente paso dentro del tab actual
    const advanceStep = () => {
      setAnimationStep((prev) => (prev + 1) % 4);
    };

    // Iniciar la animación automática para el tab activo
    animationTimerRef.current = setInterval(advanceStep, 3000);

    // Limpiar el temporizador al desmontar o cambiar de tab
    return () => {
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
      }
    };
  }, [activeTab]); // Se ejecuta cuando cambia el tab activo

  return (
    <div className="from-background to-accent overflow-y-auto bg-linear-to-br/shorter">
      <p className="text-foreground/80 p-4 pb-0 text-sm md:hidden">
        Un buscador de centros de salud y farmacias cercanas a tu ubicación 🔎🌎
      </p>
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-3 rounded-full p-1 md:w-fit">
            <TabsTrigger value="buscar" className="rounded-full">
              Buscar
            </TabsTrigger>
            <TabsTrigger value="alternar" className="rounded-full">
              Alternar
            </TabsTrigger>
            <TabsTrigger value="detalles" className="rounded-full">
              Detalles
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {activeTab === "buscar" && (
              <TabsContent value="buscar" className="mt-2 space-y-6">
                <motion.div
                  key="buscar-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-background relative overflow-hidden rounded-2xl shadow-sm"
                >
                  {/* Indicador de paso */}
                  <div className="absolute top-4 right-1/2 z-10 flex translate-x-1/2 gap-1 md:right-4 md:translate-x-0">
                    {[0, 1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={cn(
                          "size-2 rounded-full",
                          animationStep === step
                            ? "bg-primary"
                            : "bg-alternative",
                        )}
                      />
                    ))}
                  </div>

                  <div className="p-6">
                    <div className="mx-auto mt-3 max-w-md md:mt-0">
                      {/* Título animado */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-4 text-center md:text-left"
                      >
                        <h3 className="text-foreground font-merriweather text-base font-semibold md:text-lg">
                          Búsqueda de centros y farmacias
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Encuentra lo que necesitas fácilmente
                        </p>
                      </motion.div>

                      {/* Barra de búsqueda animada */}
                      <div className="relative mb-6">
                        <motion.div
                          className="bg-background relative flex items-center gap-3 rounded-full border p-3 shadow-md"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Search className="text-muted-foreground ml-2 size-5" />
                          <motion.div
                            className="flex h-5 flex-1 items-center"
                            initial={{ width: "30%" }}
                          >
                            <motion.div
                              className="bg-accent h-4 rounded-full"
                              animate={{
                                width:
                                  animationStep === 0
                                    ? ["30%", "60%", "80%"]
                                    : "30%",
                                opacity: animationStep === 0 ? [1, 1, 0] : 1,
                              }}
                              transition={{ duration: 2, times: [0, 0.7, 1] }}
                            />
                            {animationStep === 0 && (
                              <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2 }}
                                className="text-foreground/80 absolute top-3 left-11 ml-2 text-sm"
                              >
                                Centro de salud cercano
                              </motion.div>
                            )}
                          </motion.div>
                        </motion.div>

                        {/* Sugerencias de búsqueda */}
                        <AnimatePresence>
                          {animationStep === 1 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="bg-background absolute top-full right-0 left-0 z-10 mt-2 rounded-lg border p-2 shadow-lg"
                            >
                              {[
                                "Centro Médico Central",
                                "Hospital General",
                                "Centro de Especialidades",
                              ].map((item, i) => (
                                <motion.div
                                  key={item}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className={cn(
                                    "flex items-center gap-2 rounded-md p-2",
                                    i === 0 && "dark:bg-accent/50 bg-slate-50",
                                  )}
                                >
                                  <Search className="text-muted-foreground size-4" />
                                  <span className="text-sm">{item}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Mapa simulado con resultados */}
                      <div className="bg-accent relative h-64 overflow-hidden rounded-xl">
                        {/* Fondo del mapa */}
                        <div className="dark:bg-accent/50 absolute top-0 left-0 h-full w-full bg-slate-50"></div>

                        {/* Cuadrícula del mapa */}
                        <div
                          className={cn(
                            "absolute top-0 left-0 h-full w-full",
                            "bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]",
                            "dark:bg-[linear-gradient(to_right,#123a6e_1px,transparent_1px),linear-gradient(to_bottom,#123a6e_1px,transparent_1px)]",
                            "bg-[size:33.33%_33.33%]",
                          )}
                        ></div>

                        {/* Calles simuladas */}
                        <motion.div
                          className="bg-alternative absolute top-1/4 left-0 h-1 w-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: animationStep >= 2 ? 1 : 0 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div
                          className="bg-alternative absolute top-0 left-1/3 h-full w-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: animationStep >= 2 ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        />
                        <motion.div
                          className="bg-alternative absolute top-2/3 left-0 h-1 w-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: animationStep >= 2 ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                        <motion.div
                          className="bg-alternative absolute top-0 left-2/3 h-full w-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: animationStep >= 2 ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        />

                        {/* Marcadores que aparecen después de la búsqueda */}
                        <AnimatePresence>
                          {animationStep >= 2 && (
                            <>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", delay: 0.5 }}
                                className="absolute top-1/4 left-1/4"
                              >
                                <div className="flex size-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                                  <HospitalIcon className="size-4" />
                                </div>
                                <motion.div
                                  animate={{ scale: [1, 1.3, 1] }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                  }}
                                  className="absolute top-0 left-0 size-8 rounded-full bg-red-500 opacity-30"
                                />
                              </motion.div>

                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", delay: 0.9 }}
                                className="absolute top-2/3 right-1/3"
                              >
                                <div className="flex size-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
                                  <PharmacyIcon className="size-3" />
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>

                        {/* Ubicación actual */}
                        <AnimatePresence>
                          {animationStep >= 2 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ type: "spring", delay: 1.1 }}
                              className="absolute top-1/2 left-1/3"
                            >
                              <div className="size-6 rounded-full border-2 border-white bg-green-500 shadow-md"></div>
                              <motion.div
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                }}
                                className="absolute top-0 left-0 size-6 rounded-full bg-green-500 opacity-30"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Ruta animada */}
                        <AnimatePresence>
                          {animationStep === 3 && (
                            <motion.div
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                              className="absolute top-0 left-0 h-full w-full"
                            >
                              <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <motion.path
                                  d="M33 50 L33 25 L60 25"
                                  stroke="#f97316"
                                  strokeWidth="2"
                                  strokeDasharray="1"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 1.5 }}
                                />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Instrucciones animadas */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-background rounded-full p-2 text-indigo-500 shadow-sm">
                            <motion.div
                              animate={{ rotate: [0, 10, 0] }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            >
                              <Info className="size-4 md:size-5" />
                            </motion.div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-200">
                              Cómo buscar
                            </h4>
                            <motion.ol
                              className="mt-1 ml-4 list-decimal space-y-1 text-xs text-indigo-600 dark:text-indigo-300"
                              initial="hidden"
                              animate="visible"
                              variants={{
                                visible: {
                                  transition: { staggerChildren: 0.3 },
                                },
                                hidden: {},
                              }}
                            >
                              <motion.li
                                variants={{
                                  visible: { opacity: 1, x: 0 },
                                  hidden: { opacity: 0, x: -20 },
                                }}
                              >
                                Escribe el nombre o dirección en la barra de
                                búsqueda
                              </motion.li>
                              <motion.li
                                variants={{
                                  visible: { opacity: 1, x: 0 },
                                  hidden: { opacity: 0, x: -20 },
                                }}
                              >
                                Selecciona una sugerencia o presiona Enter
                              </motion.li>
                              <motion.li
                                variants={{
                                  visible: { opacity: 1, x: 0 },
                                  hidden: { opacity: 0, x: -20 },
                                }}
                              >
                                Los resultados aparecerán en el mapa
                                automáticamente
                              </motion.li>
                            </motion.ol>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            )}

            {activeTab === "alternar" && (
              <TabsContent value="alternar" className="mt-2 space-y-6">
                <motion.div
                  key="alternar-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-background relative overflow-hidden rounded-2xl shadow-sm"
                >
                  {/* Indicador de paso */}
                  <div className="absolute top-4 right-1/2 z-10 flex translate-x-1/2 gap-1 md:right-4 md:translate-x-0">
                    {[0, 1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={cn(
                          "size-2 rounded-full",
                          animationStep === step
                            ? "bg-primary"
                            : "bg-alternative",
                        )}
                      />
                    ))}
                  </div>

                  <div className="p-6">
                    <div className="mx-auto mt-3 max-w-md md:mt-0">
                      {/* Título animado */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-4 text-center md:text-left"
                      >
                        <h3 className="text-foreground font-merriweather text-base font-semibold md:text-lg">
                          Alternar entre vistas
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Cambia entre centros de salud y farmacias
                        </p>
                      </motion.div>

                      {/* Toggle animado */}
                      <div className="mb-6 flex justify-center">
                        <motion.div
                          className="bg-background flex items-center gap-2 rounded-full border p-2 shadow-md"
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span
                            className={cn(
                              "text-sm font-medium",
                              animationStep < 2
                                ? "text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            Centros de salud
                          </span>
                          <motion.div
                            className="relative h-6 w-12 rounded-full"
                            animate={{
                              backgroundColor:
                                animationStep < 2 ? "#ef4444" : "#3b82f6",
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              className="bg-background absolute top-1 size-4 rounded-full shadow-sm"
                              animate={{
                                left:
                                  animationStep < 2
                                    ? "2px"
                                    : "calc(100% - 18px)",
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            />
                          </motion.div>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              animationStep >= 2
                                ? "text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            Farmacias
                          </span>
                        </motion.div>
                      </div>

                      {/* Mapa simulado con marcadores según toggle */}
                      <div className="bg-accent relative h-64 overflow-hidden rounded-xl">
                        {/* Fondo del mapa */}
                        <div className="dark:bg-accent/50 absolute top-0 left-0 h-full w-full bg-slate-50"></div>

                        {/* Cuadrícula del mapa */}
                        <div
                          className={cn(
                            "absolute top-0 left-0 h-full w-full",
                            "bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]",
                            "dark:bg-[linear-gradient(to_right,#123a6e_1px,transparent_1px),linear-gradient(to_bottom,#123a6e_1px,transparent_1px)]",
                            "bg-[size:33.33%_33.33%]",
                          )}
                        ></div>

                        {/* Calles simuladas */}
                        <div className="bg-alternative absolute top-1/4 left-0 h-1 w-full" />
                        <div className="bg-alternative absolute top-0 left-1/3 h-full w-1" />
                        <div className="bg-alternative absolute top-2/3 left-0 h-1 w-full" />
                        <div className="bg-alternative absolute top-0 left-2/3 h-full w-1" />

                        {/* Marcadores de centros de salud */}
                        <AnimatePresence>
                          {animationStep < 2 && (
                            <>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring" }}
                                className="absolute top-1/4 left-1/4"
                              >
                                <div className="flex size-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                                  <HospitalIcon className="size-4" />
                                </div>
                                <motion.div
                                  animate={{ scale: [1, 1.3, 1] }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                  }}
                                  className="absolute top-0 left-0 size-8 rounded-full bg-red-500 opacity-30"
                                />
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>

                        {/* Marcadores de farmacias */}
                        <AnimatePresence>
                          {animationStep >= 2 && (
                            <>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring" }}
                                className="absolute top-2/3 right-1/3"
                              >
                                <div className="flex size-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                                  <PharmacyIcon className="size-4" />
                                </div>
                                <motion.div
                                  animate={{ scale: [1, 1.3, 1] }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                  }}
                                  className="absolute top-0 left-0 size-8 rounded-full bg-blue-500 opacity-30"
                                />
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>

                        {/* Ubicación actual */}
                        <div className="absolute top-1/2 left-1/3">
                          <div className="size-6 rounded-full border-2 border-white bg-green-500 shadow-md"></div>
                          <motion.div
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                            className="absolute top-0 left-0 size-6 rounded-full bg-green-500 opacity-30"
                          />
                        </div>

                        {/* Etiqueta flotante */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: animationStep === 3 ? 1 : 0,
                            y: animationStep === 3 ? 0 : 20,
                          }}
                          transition={{ duration: 0.3 }}
                          className="bg-background absolute top-20 left-1/2 -translate-x-1/2 transform rounded-full border px-3 py-1 shadow-md"
                        >
                          <div className="flex items-center gap-2">
                            <div className="size-3 rounded-full bg-blue-500"></div>
                            <span className="text-xxs font-medium text-nowrap md:text-xs">
                              3 farmacias cercanas
                            </span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Leyenda animada */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-background rounded-full p-2 text-indigo-500 shadow-sm">
                            <motion.div
                              animate={{ rotate: [0, 10, 0] }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            >
                              <Info className="size-4 md:size-5" />
                            </motion.div>
                          </div>
                          <div>
                            <h4 className="font-mediumdium text-sm text-indigo-700 dark:text-indigo-200">
                              Cómo alternar vistas
                            </h4>
                            <motion.ol
                              className="mt-1 ml-4 list-decimal space-y-1 text-xs text-indigo-600 dark:text-indigo-300"
                              initial="hidden"
                              animate="visible"
                              variants={{
                                visible: {
                                  transition: { staggerChildren: 0.3 },
                                },
                                hidden: {},
                              }}
                            >
                              <motion.li
                                variants={{
                                  visible: { opacity: 1, x: 0 },
                                  hidden: { opacity: 0, x: -20 },
                                }}
                              >
                                Utiliza el toggle en la parte superior derecha
                              </motion.li>
                              <motion.li
                                variants={{
                                  visible: { opacity: 1, x: 0 },
                                  hidden: { opacity: 0, x: -20 },
                                }}
                              >
                                Alterna entre centros de salud (rojo) y
                                farmacias (azul)
                              </motion.li>
                              <motion.li
                                variants={{
                                  visible: { opacity: 1, x: 0 },
                                  hidden: { opacity: 0, x: -20 },
                                }}
                              >
                                Los marcadores se actualizarán automáticamente
                              </motion.li>
                            </motion.ol>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            )}

            {activeTab === "detalles" && (
              <TabsContent value="detalles" className="mt-2 space-y-6">
                <motion.div
                  key="detalles-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-background relative overflow-hidden rounded-2xl shadow-sm"
                >
                  {/* Indicador de paso */}
                  <div className="absolute top-4 right-1/2 z-10 flex translate-x-1/2 gap-1 md:right-4 md:translate-x-0">
                    {[0, 1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={cn(
                          "size-2 rounded-full",
                          animationStep === step
                            ? "bg-primary"
                            : "bg-alternative",
                        )}
                      />
                    ))}
                  </div>

                  <div className="p-6">
                    <div className="mx-auto mt-3 max-w-md md:mt-0">
                      {/* Título animado */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-4 text-center md:text-left"
                      >
                        <h3 className="text-foreground font-merriweather text-base font-semibold md:text-lg">
                          Ver detalles y obtener indicaciones
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Toda la información que necesitas
                        </p>
                      </motion.div>

                      {/* Mapa simulado con marcador seleccionado e indicaciones integradas */}
                      <div className="bg-accent relative h-[320px] overflow-hidden rounded-xl">
                        {/* Fondo del mapa */}
                        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#123a6e_1px,transparent_1px)]"></div>

                        {/* Calles simuladas */}
                        <div className="bg-alternative absolute top-1/4 left-0 h-1 w-full" />
                        <div className="bg-alternative absolute top-0 left-1/3 h-full w-1" />
                        <div className="bg-alternative absolute top-2/3 left-0 h-1 w-full" />
                        <div className="bg-alternative absolute top-0 left-2/3 h-full w-1" />

                        {/* Marcador de centro de salud */}
                        <motion.div
                          className="absolute top-1/4 left-1/4 z-10"
                          animate={{
                            scale: animationStep === 0 ? [1, 1.2, 1] : 1,
                            y: animationStep === 0 ? [0, -5, 0] : 0,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex size-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                            <HospitalIcon className="size-4" />
                          </div>
                          {animationStep === 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring" }}
                              className="absolute top-0 left-0 size-8 rounded-full bg-red-500 opacity-30"
                            />
                          )}
                        </motion.div>

                        {/* Marcador de farmacia */}
                        <div className="absolute top-2/3 left-1/2">
                          <div className="flex size-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
                            <PharmacyIcon className="size-3" />
                          </div>
                        </div>

                        {/* Ubicación actual */}
                        <div className="absolute top-1/2 left-1/3">
                          <div className="size-6 rounded-full border-2 border-white bg-green-500 shadow-md"></div>
                          <motion.div
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                            className="absolute top-0 left-0 size-6 rounded-full bg-green-500 opacity-30"
                          />
                        </div>

                        {/* Ruta animada cuando se muestran indicaciones */}
                        <AnimatePresence>
                          {animationStep === 3 && (
                            <motion.div
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1.5 }}
                              className="absolute top-0 left-0 h-full w-full"
                            >
                              <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <motion.path
                                  d="M33 50 L33 25 L25 25 L60 25 L60 30"
                                  stroke="#f97316"
                                  strokeWidth="2"
                                  strokeDasharray="1"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 1.5 }}
                                />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Tarjeta de información */}
                        <AnimatePresence>
                          {animationStep >= 1 && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              transition={{ duration: 0.3 }}
                              className="bg-background absolute bottom-2 left-1/2 w-[90%] -translate-x-1/2 transform rounded-lg border p-3 shadow-lg"
                            >
                              <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                  visible: {
                                    transition: { staggerChildren: 0.1 },
                                  },
                                  hidden: {},
                                }}
                              >
                                <motion.div
                                  variants={{
                                    visible: { opacity: 1, y: 0 },
                                    hidden: { opacity: 0, y: 10 },
                                  }}
                                  className="text-sm font-medium"
                                >
                                  Centro Médico Central
                                </motion.div>
                                <motion.div
                                  variants={{
                                    visible: { opacity: 1, y: 0 },
                                    hidden: { opacity: 0, y: 10 },
                                  }}
                                  className="text-muted-foreground mt-1 flex items-center gap-1 text-xs"
                                >
                                  <MapPin className="size-3" />
                                  <span className="truncate">
                                    Av. Principal 123, Ciudad
                                  </span>
                                </motion.div>

                                <AnimatePresence>
                                  {animationStep >= 2 && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="mt-2 border-t pt-2"
                                    >
                                      <div className="text-muted-foreground flex items-center gap-1 text-xs">
                                        <Clock className="size-3" />
                                        <span>
                                          Lun-Vie: 8:30 a.m. - 8:30 p.m.
                                        </span>
                                      </div>
                                      <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                                        <Phone className="size-3" />
                                        <span>600 600 2247</span>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                <AnimatePresence>
                                  {animationStep >= 3 && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 10 }}
                                      className="mt-3 flex justify-between"
                                    >
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 px-2 text-xs"
                                      >
                                        <Phone className="mr-1 size-3" /> Llamar
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="h-8 bg-orange-500 px-2 text-xs hover:bg-orange-600"
                                      >
                                        <Navigation className="mr-1 size-3" />{" "}
                                        Indicaciones
                                      </Button>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Indicaciones integradas en el mapa (aparecen en el paso 3) */}
                        <AnimatePresence>
                          {animationStep === 3 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="bg-background/80 absolute top-0 left-0 z-10 h-full w-full rounded-2xl backdrop-blur-sm"
                            >
                              <div className="flex h-full flex-col p-3">
                                <div className="mb-2 rounded-lg border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-950">
                                  <div className="flex items-center gap-2">
                                    <div className="flex size-6 items-center justify-center rounded-full bg-amber-500 text-white">
                                      <Navigation className="size-3" />
                                    </div>
                                    <div>
                                      <h4 className="text-foreground text-sm font-medium">
                                        Indicaciones
                                      </h4>
                                      <p className="text-muted-foreground text-xs">
                                        1.1 km · Aprox. 4 min
                                      </p>
                                    </div>
                                    <div className="ml-auto flex gap-1">
                                      <div className="flex size-6 items-center justify-center rounded-full bg-amber-500 text-white">
                                        <Car className="size-3" />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex-1 overflow-hidden">
                                  <div className="space-y-2">
                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.1 }}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="text-muted-foreground bg-accent flex size-6 items-center justify-center rounded-full">
                                        <ArrowRight className="size-3" />
                                      </div>
                                      <div>
                                        <p className="text-xs font-medium">
                                          Dirígete al oeste
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                          31 m
                                        </p>
                                      </div>
                                    </motion.div>

                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.2 }}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="text-muted-foreground bg-accent flex size-6 items-center justify-center rounded-full">
                                        <CornerDownRight className="size-3" />
                                      </div>
                                      <div>
                                        <p className="text-xs font-medium">
                                          Gira a la izquierda
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                          0.3 km
                                        </p>
                                      </div>
                                    </motion.div>

                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.3 }}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="text-muted-foreground bg-accent flex size-6 items-center justify-center rounded-full">
                                        <CornerUpRight className="size-3" />
                                      </div>
                                      <div>
                                        <p className="text-xs font-medium">
                                          Gira a la derecha
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                          0.2 km
                                        </p>
                                      </div>
                                    </motion.div>

                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.4 }}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="flex size-6 items-center justify-center rounded-full bg-amber-500 text-white">
                                        <MapPin className="size-3" />
                                      </div>
                                      <div>
                                        <p className="text-xs font-medium">
                                          Llegada: Centro Médico Central
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                          Av. Principal 123, Ciudad
                                        </p>
                                      </div>
                                    </motion.div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Instrucciones animadas */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-background rounded-full p-2 text-indigo-500 shadow-sm">
                            <motion.div
                              animate={{ rotate: [0, 10, 0] }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            >
                              <Info className="size-4 md:size-5" />
                            </motion.div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-200">
                              Cómo ver detalles
                            </h4>
                            <motion.ol
                              className="mt-1 ml-4 list-decimal space-y-1 text-xs text-indigo-600 dark:text-indigo-300"
                              initial="hidden"
                              animate="visible"
                              variants={{
                                visible: {
                                  transition: { staggerChildren: 0.3 },
                                },
                                hidden: {},
                              }}
                            >
                              <motion.li
                                variants={{
                                  visible: { opacity: 1, x: 0 },
                                  hidden: { opacity: 0, x: -20 },
                                }}
                              >
                                Toca un marcador en el mapa para seleccionarlo
                              </motion.li>
                              <motion.li
                                variants={{
                                  visible: { opacity: 1, x: 0 },
                                  hidden: { opacity: 0, x: -20 },
                                }}
                              >
                                La información del lugar aparecerá en la parte
                                inferior
                              </motion.li>
                              <motion.li
                                variants={{
                                  visible: { opacity: 1, x: 0 },
                                  hidden: { opacity: 0, x: -20 },
                                }}
                              >
                                Toca el botón de indicaciones para ver la ruta
                              </motion.li>
                            </motion.ol>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
        <div className="mt-8 border-t pt-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-medium">
            <span className="text-indigo-500">Leyenda del mapa</span>
            <ChevronRight className="size-4 text-indigo-500" />
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="hover:bg-accent flex items-center gap-3 rounded-lg p-2 transition-colors">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                <HospitalIcon className="size-4" />
              </div>
              <div>
                <p className="text-xs font-medium md:text-sm">
                  Centros de salud
                </p>
                <p className="text-muted-foreground text-xs">
                  Hospitales y clínicas
                </p>
              </div>
            </div>

            <div className="hover:bg-accent flex items-center gap-3 rounded-lg p-2 transition-colors">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                <PharmacyIcon className="size-4" />
              </div>
              <div>
                <p className="text-xs font-medium md:text-sm">Farmacias</p>
                <p className="text-muted-foreground text-xs">
                  Medicamentos y más
                </p>
              </div>
            </div>

            <div className="hover:bg-accent flex items-center gap-3 rounded-lg p-2 transition-colors">
              <div className="relative size-8 shrink-0 rounded-full bg-green-500"></div>
              <div>
                <p className="text-xs font-medium md:text-sm">Tu ubicación</p>
                <p className="text-muted-foreground text-xs">Posición actual</p>
              </div>
            </div>

            <div className="hover:bg-accent flex items-center gap-3 rounded-lg p-2 transition-colors">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <Navigation className="size-4" />
              </div>
              <div>
                <p className="text-xs font-medium md:text-sm">Indicaciones</p>
                <p className="text-muted-foreground text-xs">Cómo llegar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpContent;
