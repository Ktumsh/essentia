"use client";

import { Share2, Copy, Smartphone, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { BadgeAlert } from "@/components/ui/badge-alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";

import {
  getPriorityBadge,
  getPriorityColor,
  getPriorityText,
} from "../_lib/utils";

import type { SavedRecommendation } from "@/lib/types";

const shareOptions = [
  {
    id: "clipboard",
    title: "Copiar al portapapeles",
    description: "Copia el texto para pegarlo donde quieras.",
    icon: <Copy className="size-6" />,
    color:
      "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Comparte directamente por WhatsApp.",
    icon: <Smartphone className="size-6" />,
    color:
      "bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
  },
];

interface ShareViewProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: SavedRecommendation | SavedRecommendation[] | null;
}

type ShareMethod = "clipboard" | "whatsapp";

export default function ShareView({
  isOpen,
  onClose,
  recommendation,
}: ShareViewProps) {
  const isMobile = useIsMobile();
  const [shareMethod, setShareMethod] = useState<ShareMethod>("clipboard");
  const [isSharing, setIsSharing] = useState(false);
  const [isShared, setIsShared] = useState(false);

  if (!recommendation) return null;

  const isArray = Array.isArray(recommendation);

  const getRecommendationText = () => {
    if (isArray) {
      return (
        recommendation
          .map(
            (rec) =>
              `${rec.title}\n\n${rec.description}\n\nPrioridad: ${getPriorityText(rec.priority)}\n`,
          )
          .join("\n----------------\n") +
        "\n\nEstas recomendaciones fueron generadas por IA basada en mi historial médico."
      );
    } else {
      return `${recommendation.title}

${recommendation.description}

Prioridad: ${getPriorityText(recommendation.priority)}

Esta recomendación fue generada por IA basada en mi historial médico.`;
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    setIsShared(false);
    try {
      const text = getRecommendationText();

      if (shareMethod === "clipboard") {
        await navigator.clipboard.writeText(text);
        toast.success("¡Copiado al portapapeles!");
      }

      if (shareMethod === "whatsapp") {
        const encoded = encodeURIComponent(text);
        window.open(
          `https://wa.me/?text=${encoded}`,
          "_blank",
          "noopener,noreferrer",
        );
        toast.success("Compartiendo por WhatsApp...");
      }

      setIsShared(true);
    } catch (err) {
      console.error(err);
      toast.error("Error al compartir.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={() => {
        onClose();
        setShareMethod("clipboard");
        setIsShared(false);
      }}
      direction={isMobile ? "bottom" : "right"}
      handleOnly={!isMobile}
    >
      <DrawerContent className="md:bg-background data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-screen data-[vaul-drawer-direction=right]:max-w-md data-[vaul-drawer-direction=right]:rounded-none data-[vaul-drawer-direction=right]:p-0 md:border-l">
        <DrawerHeader className="md:flex-row md:gap-2 md:p-4">
          <div className="mask mask-squircle hidden size-11 shrink-0 place-content-center bg-blue-50 md:grid dark:bg-blue-950">
            <Share2 className="size-5 text-blue-500" />
          </div>
          <div>
            <DrawerTitle className="flex items-center gap-2 truncate md:max-w-full md:p-0 md:text-base md:leading-normal">
              {isArray
                ? "Compartir recomendaciones"
                : "Compartir recomendación"}
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground sr-only md:not-sr-only">
              Selecciona cómo quieres compartir.
            </DrawerDescription>
          </div>
        </DrawerHeader>

        <DrawerDescription className="text-muted-foreground px-4 md:sr-only">
          Selecciona cómo quieres compartir.
        </DrawerDescription>

        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-4 overflow-y-auto p-4">
            {isArray ? (
              recommendation.map((rec, idx) => {
                const priority = getPriorityBadge(rec.priority);
                return (
                  <Card key={idx} className="bg-muted">
                    <CardHeader isSecondary className="pb-0!">
                      <CardTitle>{rec.title}</CardTitle>
                      <Badge variant="outline" className={priority.color}>
                        {priority.icon}
                        Prioridad {priority.label}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                        {rec.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card>
                <CardHeader isSecondary className="pb-0!">
                  <CardTitle>{recommendation.title}</CardTitle>
                  <Badge
                    className={cn(
                      "mt-1 h-5 rounded-full px-1.5 py-0",
                      getPriorityColor(recommendation.priority),
                    )}
                  >
                    Prioridad: {getPriorityText(recommendation.priority)}
                  </Badge>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                    {recommendation.description}
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Método de compartir</h3>
              <div className="grid grid-cols-2 gap-3">
                {shareOptions.map((option) => (
                  <div
                    key={option.id}
                    className={cn(
                      "cursor-pointer rounded-xl border p-3",
                      shareMethod === option.id && option.color,
                    )}
                    onClick={() => {
                      setShareMethod(option.id as ShareMethod);
                      setIsShared(false);
                    }}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div
                        className={cn(
                          "rounded-full p-2",
                          shareMethod === option.id && "bg-background",
                        )}
                      >
                        {option.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{option.title}</h4>
                        <p className="text-muted-foreground text-xs">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isShared && (
              <div className="flex items-start gap-2 rounded-xl border border-green-100 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
                <BadgeAlert variant="success" className="mb-0 size-7" />
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-200">
                    Compartido correctamente
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-300">
                    {shareMethod === "whatsapp"
                      ? "La recomendación ha sido compartida por WhatsApp."
                      : "La recomendación ha sido copiada al portapapeles."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <DrawerFooter className="md:gap-2">
          {isMobile ? (
            <>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <DrawerClose asChild>
                  <Button variant="mobile" className="justify-center">
                    Cancelar
                  </Button>
                </DrawerClose>
              </div>
              <Button
                variant="mobile-primary"
                onClick={handleShare}
                disabled={isSharing}
                className={cn(
                  shareMethod === "whatsapp"
                    ? "bg-green-400! dark:bg-green-700!"
                    : "bg-blue-400! dark:bg-blue-700!",
                )}
              >
                {isSharing ? <Loader className="animate-spin" /> : "Compartir"}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                radius="full"
                onClick={handleShare}
                disabled={isSharing}
                className={cn(
                  "border-0",
                  shareMethod === "whatsapp"
                    ? "bg-green-400 dark:bg-green-700"
                    : "bg-blue-400 dark:bg-blue-700",
                )}
              >
                {isSharing ? <Loader className="animate-spin" /> : "Compartir"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" radius="full">
                  Cancelar
                </Button>
              </DrawerClose>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
