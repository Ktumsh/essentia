import { Brain } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const secondaryMessages = [
  "El cerebro digital está en acción...",
  "Analizando patrones de salud...",
  "Sintetizando recomendaciones...",
  "Procesando datos médicos, ¡un instante por favor!",
  "Pensando en tu bienestar...",
  "Armando sugerencias personalizadas...",
  "Revisando tu historial con lupa...",
  "La IA está haciendo magia médica...",
  "Detectando oportunidades para mejorar tu salud...",
  "Ordenando tus datos geniales...",
  "Esto tomará solo unos segundos...",
  "Buscando ideas brillantes para ti...",
  "Traduciendo tus exámenes en soluciones...",
  "Afinando cada detalle de tus recomendaciones...",
  "Cargando ideas saludables...",
  "Inspirando bienestar y equilibrio...",
  "Leyendo tus antecedentes médicos con atención...",
];

interface ProcessingStepProps {
  isLoading: boolean;
}

const ProcessingStep = ({ isLoading }: ProcessingStepProps) => {
  const [secondaryIndex, setSecondaryIndex] = useState(
    Math.floor(Math.random() * secondaryMessages.length),
  );

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setSecondaryIndex((prevIndex) => {
          let newIndex = prevIndex;
          while (newIndex === prevIndex) {
            newIndex = Math.floor(Math.random() * secondaryMessages.length);
          }
          return newIndex;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-linear-to-r/shorter from-indigo-200 to-fuchsia-200 px-4 dark:from-indigo-900 dark:to-fuchsia-900">
      <div className="relative mb-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20">
          <Brain className="h-10 w-10 text-fuchsia-500" />
        </div>
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-fuchsia-500/30 border-t-fuchsia-500" />
      </div>
      <motion.p className="mb-1 text-base font-medium">
        ✨ Preparando sugerencias para ti
      </motion.p>
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="loading-shimmer text-center text-sm"
      >
        {secondaryMessages[secondaryIndex]}
      </motion.span>
    </div>
  );
};

export default ProcessingStep;
