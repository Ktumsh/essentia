"use client";

import { ArrowLeft, Blend, SunMoon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/kit/button";
import { Switch } from "@/components/kit/switch";
import { useReducedMotion } from "@/hooks/use-reduce-motion";

import SettingsOptsHeader from "./settings-opts-header";
import ThemeSelect from "./theme-select";

interface AccesibilityStgProps {
  isMobile?: boolean;
}

const AccesibilityStg = ({ isMobile = false }: AccesibilityStgProps) => {
  const { isReducedMotion, toggleReducedMotion } = useReducedMotion();
  const router = useRouter();

  return (
    <div className="-mx-6 md:mx-0">
      {isMobile ? (
        <SettingsOptsHeader title="Accesibilidad y pantalla" className="px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/settings")}
          >
            <ArrowLeft className="text-foreground" />
          </Button>
        </SettingsOptsHeader>
      ) : (
        <SettingsOptsHeader
          title="Accesibilidad y pantalla"
          description="Configura las opciones de accesibilidad y visualización de la aplicación."
        />
      )}

      <div className="mt-1 flex flex-1 flex-col">
        <div className="flex flex-col">
          <ul className="border-border flex flex-col overflow-hidden border-y md:rounded-lg md:border">
            <li>
              <div className="text-foreground inline-flex h-auto min-h-11 w-full items-center justify-between gap-2 px-6 py-3 text-sm font-medium md:px-4 md:py-2">
                <div className="flex items-center gap-4">
                  <SunMoon className="size-4 shrink-0" />
                  <div className="flex flex-col items-start">
                    <span>Modo visual</span>
                    <p className="text-muted-foreground font-normal">
                      Selecciona el esquema de colores de tu interfaz.
                    </p>
                  </div>
                </div>
                <ThemeSelect />
              </div>
            </li>
            <li>
              <div className="text-foreground inline-flex h-auto min-h-11 w-full items-center justify-between gap-2 px-6 py-2 text-sm font-medium md:px-4">
                <div className="flex items-center gap-4">
                  <Blend className="size-4 shrink-0" />
                  <div className="flex flex-col items-start">
                    <span>Reducir movimiento</span>
                    <p className="text-muted-foreground font-normal">
                      Limita las animaciones y movimientos de la aplicación.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isReducedMotion}
                  onCheckedChange={toggleReducedMotion}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccesibilityStg;
