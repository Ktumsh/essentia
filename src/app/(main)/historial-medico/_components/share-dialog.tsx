"use client";

import { Copy, Share2, Smartphone, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { BadgeAlert } from "@/components/ui/badge-alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";

import {
  getPriorityBadge,
  getPriorityColor,
  getPriorityText,
} from "../_lib/utils";

import type { AIRecommendationType } from "./ai-recommendation";

const shareOptions = [
  {
    id: "clipboard",
    title: "Copiar al portapapeles",
    description: "Copia el texto para pegarlo donde quieras",
    icon: <Copy className="size-6" />,
    color:
      "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
    iconColor: "text-blue-500",
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Comparte directamente por WhatsApp",
    icon: <Smartphone className="size-6" />,
    color:
      "bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
    iconColor: "text-green-500",
  },
];

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: AIRecommendationType | AIRecommendationType[] | null;
}

type ShareMethod = "clipboard" | "whatsapp" | "email" | "pdf";

export default function ShareDialog({
  isOpen,
  onClose,
  recommendation,
}: ShareDialogProps) {
  const isMobile = useIsMobile();

  const [shareMethod, setShareMethod] = useState<ShareMethod>("clipboard");
  const [isSharing, setIsSharing] = useState(false);
  const [isShared, setIsShared] = useState(false);

  if (!recommendation) return null;

  const getRecommendationText = () => {
    if (Array.isArray(recommendation)) {
      return (
        recommendation
          .map(
            (rec) =>
              `${rec.title}\n\n${rec.description}\n\nPrioridad: ${getPriorityText(rec.priority)}\n`,
          )
          .join("\n----------------\n") +
        "\n\nEsta(s) recomendación(es) fueron generadas por IA basada(s) en mi historial médico."
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

      switch (shareMethod) {
        case "clipboard":
          await navigator.clipboard.writeText(text);
          toast.success("¡Copiado al portapapeles!");
          break;

        case "whatsapp":
          const encodedText = encodeURIComponent(text);
          window.open(
            `https://wa.me/?text=${encodedText}`,
            "_blank",
            "noopener,noreferrer",
          );
          toast.success("Compartiendo por WhatsApp... 😊");
          break;
      }

      setIsShared(true);
    } catch (error) {
      console.error("Error al compartir:", error);
      toast.error("¡Ups! 😶", {
        description: "Ocurrió un error al intentar compartir.",
      });
    } finally {
      setIsSharing(false);
    }
  };

  const isArrayRec = Array.isArray(recommendation);

  const content = (
    <div className="space-y-4 overflow-y-auto p-4 md:p-6">
      {isArrayRec ? (
        recommendation.map((rec, index) => {
          const priorityBadge = getPriorityBadge(rec.priority);

          return (
            <Card key={index} className="bg-muted">
              <CardHeader isSecondary className="pb-0!">
                <CardTitle>{rec.title}</CardTitle>
                <Badge variant="outline" className={priorityBadge.color}>
                  {priorityBadge.icon}
                  Prioridad {priorityBadge.label}
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
                recommendation.priority === "high"
                  ? "bg-red-50 dark:bg-red-950"
                  : recommendation.priority === "medium"
                    ? "bg-yellow-50 dark:bg-yellow-950"
                    : "bg-green-50 dark:bg-green-950",
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
                    option.color,
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
          <BadgeAlert
            variant="success"
            className="mb-0 size-7 [&_svg]:size-4!"
          />
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
  );

  if (isMobile) {
    return (
      <Drawer
        open={isOpen}
        onOpenChange={() => {
          onClose();
          setShareMethod("clipboard");
          setIsShared(false);
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-center gap-2">
              <Share2 className="size-4 shrink-0 text-blue-500" />
              <span>
                {isArrayRec
                  ? "Compartir recomendaciones"
                  : "Compartir recomendación"}
              </span>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="p-4">
            {isArrayRec
              ? "Selecciona cómo quieres compartir estas recomendaciones."
              : "Selecciona cómo quieres compartir esta recomendación."}
          </DrawerDescription>
          {content}
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <Button
                variant="mobile"
                onClick={() => {
                  onClose();
                  setShareMethod("clipboard");
                  setIsShared(false);
                }}
                className="justify-center"
              >
                Cancelar
              </Button>
            </div>
            <Button
              variant="mobile-primary"
              onClick={handleShare}
              disabled={isSharing}
              className={cn(
                "text-foreground",
                shareMethod === "whatsapp"
                  ? "bg-green-400! dark:bg-green-700!"
                  : "bg-blue-400! dark:bg-blue-700!",
              )}
            >
              {isSharing ? <Loader className="animate-spin" /> : "Compartir"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        setShareMethod("clipboard");
        setIsShared(false);
      }}
    >
      <DialogContent isSecondary>
        <DialogHeader isSecondary>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="size-5 text-blue-500" />
            {isArrayRec
              ? "Compartir recomendaciones"
              : "Compartir recomendación"}
          </DialogTitle>
          <DialogDescription>
            {isArrayRec
              ? "Selecciona cómo quieres compartir estas recomendaciones."
              : "Selecciona cómo quieres compartir esta recomendación."}
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter isSecondary>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => {
              onClose();
              setShareMethod("clipboard");
              setIsShared(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            disabled={isSharing}
            className={cn(
              "rounded-full border-0",
              shareMethod === "whatsapp"
                ? "bg-green-400 dark:bg-green-700"
                : "bg-blue-400 dark:bg-blue-700",
            )}
          >
            {isSharing ? <Loader className="animate-spin" /> : "Compartir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
