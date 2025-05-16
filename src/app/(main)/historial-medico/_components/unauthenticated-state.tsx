"use client";

import { Shield, Lock, FileText, Brain } from "lucide-react";
import { useRouter } from "next/navigation";

import { AddUserButton } from "@/components/button-kit/add-user-button";
import { LoginButton } from "@/components/button-kit/login-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";

const UnauthenticatedState = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center md:min-h-[calc(100dvh-112px)]">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <div className="bg-primary/10 rounded-full p-3">
            <Shield className="text-primary size-10" />
          </div>
        </div>
        <h2 className="font-merriweather mt-6 text-2xl font-semibold md:text-3xl">
          Historial médico privado
        </h2>
        <p className="text-foreground/80 mt-2 text-sm md:text-base">
          Inicia sesión para acceder a tu historial médico personal y gestionar
          tus documentos de forma segura.
        </p>
      </div>

      <div className="mt-10 w-full max-w-4xl">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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

          <Card>
            <CardHeader className="pb-2">
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950">
                <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
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

          <Card>
            <CardHeader className="pb-2">
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950">
                <Lock className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">Privacidad total</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Tu información está protegida con los más altos estándares de
                seguridad y cifrado.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
          <AddUserButton size="lg" onClick={() => router.push("/signup")}>
            Crear cuenta
          </AddUserButton>
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
