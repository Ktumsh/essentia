"use client";

import { ArrowLeft, Blend, SunMoon, Text } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAccessibility } from "@/hooks/use-accesibility";

import SettingsOptsHeader from "../../_components/settings-opts-header";
import ThemeSelect from "../../_components/theme-select";

interface AccesibilityStgProps {
  isMobile?: boolean;
}

const AccesibilityStg = ({ isMobile = false }: AccesibilityStgProps) => {
  const { isReducedMotion, toggleReducedMotion, fontSize, setFontSize } =
    useAccessibility();
  const router = useRouter();

  return (
    <div className="-mx-6 md:mx-0">
      {isMobile ? (
        <SettingsOptsHeader
          title="Preferencias y accesibilidad"
          className="px-4"
        >
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
          title="Preferencias y accesibilidad"
          description="Configura las opciones de accesibilidad y visualización de la aplicación."
        />
      )}

      <div className="mt-1 flex flex-1 flex-col">
        <div className="flex flex-col">
          <ul className="border-border flex flex-col overflow-hidden border-y md:rounded-lg md:border">
            {/* Tema visual */}
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

            {/* Reducir movimiento */}
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

            {/* Tamaño de fuente */}
            <li>
              <div className="text-foreground inline-flex h-auto min-h-11 w-full items-center justify-between gap-2 px-6 py-2 text-sm font-medium md:px-4">
                <div className="flex items-center gap-4">
                  <Text className="size-4 shrink-0" />
                  <div className="flex flex-col items-start">
                    <span>Tamaño de fuente</span>
                    <p className="text-muted-foreground font-normal">
                      Ajusta el tamaño de los textos en toda la aplicación.
                    </p>
                  </div>
                </div>
                <Select
                  value={fontSize}
                  onValueChange={(value) => setFontSize(value as any)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeño</SelectItem>
                    <SelectItem value="medium">Mediano</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccesibilityStg;
