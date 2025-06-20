"use client";

import { FileText, Brain } from "lucide-react";
import { useRouter } from "next/navigation";

import { LoginButton } from "@/components/button-kit/login-button";
import { MedicalHistoryFillIcon } from "@/components/icons/interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UnauthenticatedState = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center md:min-h-[calc(100dvh-112px)]">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <div className="bg-primary/10 rounded-full p-3">
            <MedicalHistoryFillIcon className="text-primary size-10" />
          </div>
        </div>
        <h2 className="font-merriweather mt-6 text-2xl font-semibold md:text-3xl">
          Historial médico
        </h2>
        <p className="text-foreground/80 mt-2 text-sm md:text-base">
          Inicia sesión para acceder a tu historial médico personal y gestionar
          tus documentos de forma segura.
        </p>
      </div>

      <div className="mt-10 flex w-full max-w-3xl flex-col">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-muted">
            <CardHeader className="pb-2">
              <div className="mask mask-squircle mb-2 grid aspect-square size-10 place-content-center bg-blue-100 dark:bg-blue-950">
                <FileText className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">Documentos seguros</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Almacena y organiza todos tus documentos médicos en un solo
                lugar con total privacidad.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-muted">
            <CardHeader className="pb-2">
              <div className="mask mask-squircle mb-2 grid aspect-square size-10 place-content-center bg-purple-100 dark:bg-purple-950">
                <Brain className="size-5 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg">Análisis con IA</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Obtén recomendaciones personalizadas basadas en tu historial
                médico con nuestra IA avanzada.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto mt-10">
          <LoginButton
            variant="secondary"
            size="lg"
            onClick={() => router.push("/login?next=historial-medico")}
          >
            Iniciar sesión
          </LoginButton>
        </div>
      </div>
    </div>
  );
};

export default UnauthenticatedState;
