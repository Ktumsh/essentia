"use client";

import { Home } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { memo } from "react";

import { Card, CardContent } from "@/components/ui/card";

import ActionButton from "./action-button";
import StatusIcon from "./status-icon";

const ErrorState = () => {
  const router = useRouter();

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="to-background flex min-h-screen items-center justify-center bg-linear-to-br from-red-200 p-6 dark:from-red-900">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="w-full max-w-md"
      >
        <Card className="bg-background border-2 border-dashed border-red-500 shadow-xl backdrop-blur-sm">
          <CardContent className="space-y-6 p-8 text-center">
            <StatusIcon status="failure" />
            <div className="space-y-2">
              <h2 className="text-foreground text-xl font-semibold">
                Error de verificación
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                No se pudo verificar el estado del pago. Por favor, inténtalo
                más tarde.
              </p>
            </div>
            <ActionButton
              onClick={() => router.push("/")}
              icon={Home}
              variant="accent"
            >
              Volver a Essentia
            </ActionButton>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default memo(ErrorState);
