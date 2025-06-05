"use client";

import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { BadgeAlert } from "@/components/ui/badge-alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const LOCAL_STORAGE_KEY = "hide_ai_recommendation_disclaimer";
const OPEN_DELAY_MS = 500;

interface AIDisclaimerProps {
  isOpen: boolean;
}

const AIDisclaimer = ({ isOpen }: AIDisclaimerProps) => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  useEffect(() => {
    const shouldHide = localStorage.getItem(LOCAL_STORAGE_KEY);

    let timeout: NodeJS.Timeout;

    if (isOpen && !shouldHide) {
      timeout = setTimeout(() => {
        setShowDisclaimer(true);
      }, OPEN_DELAY_MS);
    }

    return () => clearTimeout(timeout);
  }, [isOpen]);

  const handleClose = () => {
    if (doNotShowAgain) {
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
    }
    setShowDisclaimer(false);
  };

  return (
    <AlertDialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
      <AlertDialogContent isSecondary>
        <AlertDialogHeader isSecondary>
          <BadgeAlert variant="info" className="mb-0 md:mb-4" />
          <AlertDialogTitle>
            Importante sobre las recomendaciones con IA
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="prose">
              <p>
                Las recomendaciones proporcionadas por <strong>IA</strong> se
                generan a partir de tu historial médico y están diseñadas para{" "}
                <strong>complementar</strong>,{" "}
                <strong className="text-secondary">no reemplazar</strong>, la
                opinión de profesionales de la salud.
              </p>
              <p>
                <strong>Consulta siempre con un médico</strong> ante cualquier
                duda o decisión importante sobre tu salud.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex items-center space-x-2 p-4 md:p-6 md:pt-0">
          <Checkbox
            id="do-not-show"
            checked={doNotShowAgain}
            onCheckedChange={(checked) => setDoNotShowAgain(!!checked)}
          />
          <Label htmlFor="do-not-show">No volver a mostrar este mensaje</Label>
        </div>

        <AlertDialogFooter isSecondary className="justify-end">
          <Button onClick={handleClose} className="rounded-full">
            Entendido
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AIDisclaimer;
