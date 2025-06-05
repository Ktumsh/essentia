"use client";

import { HelpCircle, Info } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BetterTooltip } from "@/components/ui/tooltip";

import HelpContent from "./help-content";

export default function HelpButton() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar al cargar y cuando cambie el tamaño de la ventana
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    // Mostrar pulso cada 10 segundos para llamar la atención
    const pulseTimer = setInterval(() => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 3000);
    }, 10000);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      clearInterval(pulseTimer);
    };
  }, []);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: showPulse ? [0, -8, 0] : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              delay: 0.5,
              y: {
                duration: 0.8,
                repeat: showPulse ? 3 : 0,
                repeatType: "reverse",
              },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-16 left-4 z-50 md:bottom-4"
          >
            <Button
              variant="secondary"
              size="icon"
              className="bg-premium size-9 rounded-full border-none shadow-lg"
              aria-label="Ayuda"
            >
              <HelpCircle className="size-5! text-white" />
              {showPulse && (
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [1, 1.8, 1] }}
                  transition={{ duration: 1.5, repeat: 2, repeatType: "loop" }}
                  className="absolute inset-0 rounded-full border-2 border-white"
                />
              )}
            </Button>
          </motion.div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="inline-flex items-center justify-center gap-2 text-indigo-500">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="bg-premium mb-0! flex size-6 items-center justify-center rounded-full"
              >
                <Info className="size-4 text-white" />
              </motion.div>
              Guía interactiva
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="sr-only">
            Un buscador de centros de salud y farmacias cercanas a tu ubicación
            🔎🌎
          </DrawerDescription>
          <HelpContent />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: showPulse ? [0, -8, 0] : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          delay: 0.5,
          y: {
            duration: 0.8,
            repeat: showPulse ? 3 : 0,
            repeatType: "reverse",
          },
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-16 left-4 z-50 md:bottom-4"
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        <BetterTooltip content="Guía interactiva" side="right">
          <Button
            variant="secondary"
            size="icon"
            className="bg-premium relative size-9 rounded-full border-none shadow-lg"
            onClick={() => setOpen(true)}
            aria-label="Ayuda"
          >
            <HelpCircle className="size-5! text-white" />
            <AnimatedRing isActive={isHovering || showPulse} />
          </Button>
        </BetterTooltip>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent isSecondary isBlurred className="sm:max-w-xl">
          <DialogHeader isSecondary className="p-6!">
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="bg-premium mb-0! flex size-7 items-center justify-center rounded-full"
              >
                <Info className="size-4 text-white" />
              </motion.div>
              <DialogTitle className="mb-0! text-indigo-500">
                Guía interactiva
              </DialogTitle>
            </div>
            <DialogDescription>
              Un buscador de centros de salud y farmacias cercanas a tu
              ubicación 🔎🌎
            </DialogDescription>
          </DialogHeader>
          <HelpContent />
        </DialogContent>
      </Dialog>
    </>
  );
}

function AnimatedRing({ isActive }: { isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{
        opacity: isActive ? [0, 0.5, 0] : 0,
        scale: isActive ? [1, 1.5, 1] : 1,
      }}
      transition={{
        duration: 1.5,
        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop",
      }}
      className="absolute inset-0 rounded-full border-2 border-white"
    />
  );
}
