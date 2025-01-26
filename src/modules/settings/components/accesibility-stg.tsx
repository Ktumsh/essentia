"use client";

import { ArrowLeft, Blend, SunMoon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import SettingsOptsHeader from "./settings-opts-header";
import ThemeSelect from "./theme-select";
import { useReducedMotion } from "../hooks/use-reduce-motion";

interface AccesibilityStgProps {
  isMobile?: boolean;
}

const AccesibilityStg = ({ isMobile = false }: AccesibilityStgProps) => {
  const { isReducedMotion, toggleReducedMotion } = useReducedMotion();
  const router = useRouter();

  return (
    <div className="mb-5 pb-16 md:mb-0 md:pb-0">
      {isMobile ? (
        <div className="relative px-6">
          <Button
            variant="ghost"
            size="icon"
            radius="full"
            className="absolute inset-y-0 left-4 mb-2 mt-auto md:left-0"
            onClick={() => router.push("/settings")}
          >
            <ArrowLeft className="size-5! text-main-h dark:text-main-dark" />
          </Button>
          <div className="ml-12">
            <SettingsOptsHeader title="Accesibilidad y pantalla" />
          </div>
        </div>
      ) : (
        <SettingsOptsHeader
          title="Accesibilidad y pantalla"
          description="Configura las opciones de accesibilidad y visualización de la aplicación."
        />
      )}

      <div className="mt-1 flex flex-1 flex-col">
        <div className="flex flex-col">
          <ul className="flex flex-col overflow-hidden border-y border-gray-200 dark:border-dark md:rounded-lg md:border">
            <li>
              <div className="inline-flex h-auto min-h-11 w-full items-center justify-between gap-2 px-6 py-3 text-sm font-medium text-main-h dark:text-main-dark md:px-4 md:py-2">
                <div className="flex items-center gap-4">
                  <SunMoon className="size-4 shrink-0" />
                  <div className="flex flex-col items-start">
                    <span>Modo visual</span>
                    <p className="font-normal text-main-m dark:text-main-dark-m">
                      Selecciona el esquema de colores de tu interfaz.
                    </p>
                  </div>
                </div>
                <ThemeSelect />
              </div>
            </li>
            <li>
              <div className="inline-flex h-auto min-h-11 w-full items-center justify-between gap-2 px-6 py-2 text-sm font-medium text-main-h dark:text-main-dark md:px-4">
                <div className="flex items-center gap-4">
                  <Blend className="size-4 shrink-0" />
                  <div className="flex flex-col items-start">
                    <span>Reducir movimiento</span>
                    <p className="font-normal text-main-m dark:text-main-dark-m">
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
            {/* <li>
            <Button
            variant="ghost"
            fullWidth
            radius="none"
            className="h-auto min-h-11 justify-between px-4 py-2 text-main-h hover:text-main dark:text-main-dark dark:hover:text-white"
            >
            <div className="flex items-center gap-4">
            <Languages />
            <span>Idioma de visualización</span>
            </div>
              <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
              </Button>
              </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccesibilityStg;
