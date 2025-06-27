"use client";

import { AlertTriangle, Brain, Shield } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const importantPoints = [
  {
    title: "Consulta siempre a tu médico",
    description:
      "Antes de tomar cualquier decisión sobre tu salud, consulta con un profesional médico calificado.",
  },
  {
    title: "La IA puede tener limitaciones",
    description:
      "Los algoritmos pueden no considerar todos los factores relevantes de tu situación médica específica.",
  },
  {
    title: "Información complementaria",
    description:
      "Usa estas recomendaciones como información adicional para discutir con tu equipo médico.",
  },
  {
    title: "Emergencias médicas",
    description:
      "En caso de emergencia médica, contacta inmediatamente a los servicios de emergencia.",
  },
];

interface AIDisclaimerProps {
  dontShowAgain: boolean;
  setDontShowAgain: (value: boolean) => void;
}

const AIDisclaimer = ({
  dontShowAgain,
  setDontShowAgain,
}: AIDisclaimerProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-linear-to-br/shorter from-amber-500 to-orange-500 shadow-lg">
          <AlertTriangle className="h-8 w-8 text-white" />
        </div>
        <div>
          <h2 className="font-merriweather mb-2 text-xl font-semibold text-balance text-amber-900 dark:text-amber-100">
            Aviso Importante sobre Recomendaciones con IA
          </h2>
          <p className="text-base text-amber-700 dark:text-amber-300">
            Por favor, lee cuidadosamente antes de continuar
          </p>
        </div>
      </div>

      {/* Main Warning */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20">
        <div className="flex items-start gap-2">
          <Shield className="mt-1 size-6 shrink-0 text-red-500" />
          <div className="prose-sm">
            <h3 className="font-semibold text-red-900 dark:text-red-100">
              Esta herramienta NO reemplaza el consejo médico profesional
            </h3>
            <p className="text-red-800 dark:text-red-200">
              Las recomendaciones generadas por inteligencia artificial son
              únicamente para fines informativos y educativos. No deben ser
              utilizadas como sustituto del diagnóstico, tratamiento o consejo
              médico profesional.
            </p>
          </div>
        </div>
      </div>

      {/* Key Points */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-3 text-base font-semibold md:text-lg">
          <Brain className="text-secondary size-6" />
          Puntos importantes a considerar:
        </h3>

        <div className="grid gap-4">
          {importantPoints.map((point, index) => (
            <div
              key={index}
              className="bg-background flex items-start gap-4 rounded-xl p-4"
            >
              <div className="bg-secondary/10 text-secondary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                {index + 1}
              </div>
              <div>
                <h4 className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
                  {point.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Notice */}
      <div className="border-alternative bg-accent rounded-xl border p-4">
        <p className="text-muted-foreground text-xs leading-relaxed">
          <strong className="text-foreground font-medium">
            Descargo de responsabilidad:
          </strong>{" "}
          Esta aplicación y sus recomendaciones son proporcionadas &quot;tal
          como están&quot; sin garantías de ningún tipo. Los desarrolladores no
          se hacen responsables de las decisiones tomadas basándose en la
          información proporcionada por esta herramienta.
        </p>
      </div>

      {/* Don't show again option */}
      <div className="border-primary/50 bg-primary/10 flex items-center space-x-3 rounded-xl border-2 border-dashed p-4 backdrop-blur-md">
        <Checkbox
          id="dont-show-again"
          checked={dontShowAgain}
          onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
          className="border-primary"
        />
        <Label htmlFor="dont-show-again">
          No mostrar este aviso nuevamente
        </Label>
      </div>
    </div>
  );
};

export default AIDisclaimer;
