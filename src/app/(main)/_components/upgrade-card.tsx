"use client";

import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { SparklesButton } from "@/components/button-kit/sparkles-button";
import PaymentModal from "@/components/ui/payment/payment-modal";

const UpgradeCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative col-span-2 mt-2 w-full overflow-hidden rounded-xl border border-dashed border-indigo-300 bg-indigo-50 px-4 py-3 shadow-md dark:border-indigo-700 dark:bg-indigo-950"
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded-full bg-indigo-200 p-1.5 dark:bg-indigo-800">
            <Sparkles className="h-4 w-4 text-indigo-700 dark:text-indigo-300" />
          </div>
          <h4 className="text-foreground text-sm font-semibold">
            Essentia Premium
          </h4>
        </div>
        <div>
          <p className="text-foreground/80 mb-2 text-xs">
            Desbloquea más funciones, espacio extra y recomendaciones con IA.
          </p>
          <ul className="mb-3 list-inside list-disc text-xs text-indigo-700 dark:text-indigo-300">
            <li>Sube más archivos médicos</li>
            <li>Recomendaciones personalizadas</li>
            <li>Planes de salud personalizados</li>
          </ul>
          <SparklesButton
            size="sm"
            variant="gradient"
            onClick={() => setOpen(true)}
            className="w-full [&_svg]:size-3.5!"
          >
            Actualizar a Premium
          </SparklesButton>
        </div>
      </motion.div>
      <PaymentModal isOpen={open} setIsOpen={setOpen} />
    </>
  );
};

export default UpgradeCard;
