"use client";

import NumberFlow from "@number-flow/react";
import { X } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/kit/button";

import { getEmojiForRemaining } from "../_lib/utils";

interface MessagesUsageBannerProps {
  remainingMessages?: number | null;
  onOpenPayment: () => void;
}

const MessagesUsageBanner = ({
  remainingMessages,
  onOpenPayment,
}: MessagesUsageBannerProps) => {
  if (typeof remainingMessages !== "number" || remainingMessages > 10) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2, delay: 1 }}
      className="peer text-foreground relative mb-0! rounded-t-xl border border-b-0 before:absolute before:-right-px before:-bottom-4 before:size-4 before:border-r before:content-[''] after:absolute after:-bottom-4 after:-left-px after:size-4 after:border-l after:content-['']"
    >
      <div className="banner @container/banner flex items-center justify-between gap-2 py-1.5 pr-2 pl-3 text-sm">
        <div className="flex items-center gap-2">
          <div>
            {remainingMessages > 8 ? (
              <>
                <span className="hidden @lg/banner:inline">
                  ¿Quieres enviar mensajes sin límites? Actualiza a Premium
                  Plus.
                </span>
                <span className="@lg/banner:hidden">
                  Obtén mensajes ilimitados ☺️
                </span>
              </>
            ) : (
              <span>
                Te quedan{" "}
                <NumberFlow
                  willChange
                  value={remainingMessages}
                  locales="es-CL"
                  className="mr-1 -translate-y-px font-semibold"
                />
                mensajes restantes por hoy{" "}
                {getEmojiForRemaining(remainingMessages)}
              </span>
            )}
            <span className="@md/banner:hidden">
              {" "}
              <Button
                variant="link"
                onClick={onOpenPayment}
                className="bg-premium-plus after:bg-premium-plus relative h-auto rounded-none bg-clip-text p-0 text-transparent after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:w-0 after:rounded-full after:transition-[width] after:content-[''] hover:after:w-full"
              >
                Actualizar Plan
              </Button>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="hidden @md/banner:block">
            <Button
              variant="link"
              onClick={onOpenPayment}
              className="bg-premium-plus after:bg-premium-plus relative h-auto bg-clip-text p-0 text-transparent after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:w-0 after:rounded-full after:transition-[width] after:content-[''] hover:after:w-full"
            >
              Actualizar Plan
            </Button>
          </div>
          <Button size="icon" variant="ghost" className="size-6 rounded-sm">
            <X className="size-3!" />
            <span className="sr-only">Cerrar banner de uso de mensajes</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MessagesUsageBanner;
