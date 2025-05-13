import { Stars } from "lucide-react";
import Link from "next/link";

import {
  AdditionalFillIcon,
  AIFillIcon,
  HealthCentersFillIcon,
  MedicalHistoryFillIcon,
} from "@/components/ui/icons/interface";

import type { UserProfileData } from "@/types/auth";

interface RecomCardProps {
  profileData: UserProfileData | null;
}

const RecomCard = ({ profileData }: RecomCardProps) => {
  const { isPremium } = profileData || {};

  return (
    <div className="flex size-full">
      <div className="grid w-full grid-cols-2 gap-4 md:gap-2">
        <Link
          href="/centros-de-salud"
          scroll={false}
          className="dark:border-border dark:bg-accent/50 bg-accent flex items-center justify-center rounded-2xl border border-slate-300"
        >
          <div className="text-foreground/80 inline-flex h-20 flex-col items-center justify-between p-3">
            <HealthCentersFillIcon className="size-7" />
            <h2 className="text-xs font-semibold">Centros de Salud</h2>
          </div>
        </Link>
        <Link
          href="/herramientas"
          className="dark:border-border dark:bg-accent/50 bg-accent flex items-center justify-center rounded-2xl border border-slate-300"
        >
          <div className="text-foreground/80 inline-flex h-20 flex-col items-center justify-between p-3">
            <AdditionalFillIcon className="size-7" />
            <h2 className="text-xs font-semibold">Recursos Adicionales</h2>
          </div>
        </Link>
        <Link
          href="/historial-medico"
          className="dark:border-border dark:bg-accent/50 bg-accent col-span-2 flex items-center justify-center rounded-2xl border border-slate-300"
        >
          <div className="text-foreground/80 inline-flex h-20 flex-col items-center justify-between p-3">
            <MedicalHistoryFillIcon className="size-7" />
            <h2 className="text-xs font-semibold">Mi Historial Médico</h2>
          </div>
        </Link>
        {isPremium ? (
          <Link
            href="/essentia-ai"
            className="bg-premium border-background relative z-1 col-span-2 flex items-center justify-center rounded-2xl border-2 text-white transition active:scale-[.97] active:shadow-lg active:saturate-200"
          >
            <div className="inline-flex h-16 items-center justify-center gap-2">
              <AIFillIcon className="size-7" />
              <h2 className="text-2xl leading-none font-semibold">
                Essentia AI
              </h2>
            </div>
            <div className="bg-premium absolute inset-0 -z-1 scale-95 rounded-2xl blur-md"></div>
          </Link>
        ) : (
          <Link
            href="/planes"
            className="bg-premium border-background relative z-1 col-span-2 flex items-center justify-center rounded-2xl border-2 text-white transition active:scale-[.97] active:shadow-lg active:saturate-200"
          >
            <div className="inline-flex h-16 items-center justify-center gap-4">
              <Stars
                aria-hidden="true"
                className="size-7 **:fill-white focus:outline-hidden"
              />
              <h2 className="text-2xl leading-none font-semibold">
                Hazte Premium
              </h2>
            </div>
            <div className="bg-premium absolute inset-0 -z-1 scale-95 rounded-2xl blur-md"></div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default RecomCard;
