import { CheckCircle2 } from "lucide-react";

import { BadgeAlert } from "@/components/kit/badge-alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";

import Medicines from "./medicines";

const Kit = () => {
  return (
    <>
      <div className="mb-4 flex items-start rounded-lg bg-emerald-50 p-4 dark:bg-emerald-950">
        <BadgeAlert
          variant="info"
          className="mr-4 bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/15"
        />
        <div>
          <h3 className="font-merriweather text-base font-semibold text-emerald-800 dark:text-emerald-200">
            Botiquín básico
          </h3>
          <p className="prose mt-1 text-xs text-emerald-600 md:text-sm dark:text-emerald-400">
            Un botiquín de primeros auxilios bien equipado es esencial en todo
            hogar. Aquí encontrarás información sobre los medicamentos y
            suministros básicos que deberías tener a mano.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="bg-muted">
          <CardHeader className="pb-4">
            <CardTitle className="text-emerald-600 dark:text-emerald-400">
              Elementos esenciales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs md:text-sm">
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 size-3.5 shrink-0 text-emerald-500" />
              <span>Vendas adhesivas de varios tamaños</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 size-3.5 shrink-0 text-emerald-500" />
              <span>Gasas estériles</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 size-3.5 shrink-0 text-emerald-500" />
              <span>Cinta adhesiva médica</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 size-3.5 shrink-0 text-emerald-500" />
              <span>Tijeras y pinzas</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 size-3.5 shrink-0 text-emerald-500" />
              <span>Termómetro</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 size-3.5 shrink-0 text-emerald-500" />
              <span>Guantes desechables</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardHeader className="pb-4">
            <CardTitle className="text-emerald-600 dark:text-emerald-400">
              Recomendaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs md:text-sm">
            <div className="flex items-start">
              <CheckCircle2 className="mt-0.5 mr-2 size-3.5 shrink-0 text-emerald-500" />
              <span>
                Revisa regularmente las fechas de caducidad de los medicamentos
                y reemplaza los que hayan expirado
              </span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="mt-0.5 mr-2 size-3.5 shrink-0 text-emerald-500" />
              <span>
                Guarda el botiquín en un lugar fresco, seco y fuera del alcance
                de los niños
              </span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="mt-0.5 mr-2 size-3.5 shrink-0 text-emerald-500" />
              <span>
                Incluye una lista con números de emergencia, información médica
                familiar y contactos importantes
              </span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="mt-0.5 mr-2 size-3.5 shrink-0 text-emerald-500" />
              <span>
                Personaliza tu botiquín según las necesidades específicas de tu
                familia
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Medicines />
    </>
  );
};

export default Kit;
