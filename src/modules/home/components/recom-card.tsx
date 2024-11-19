import Link from "next/link";

import { StarsIcon } from "@/modules/icons/common";
import { AdditionalFillIcon, AIFillIcon } from "@/modules/icons/interface";
import { HealthCentersFillIcon } from "@/modules/icons/miscellaneus";
import { UserProfileData } from "@/types/session";

interface RecomCardProps {
  profileData: UserProfileData | null;
}

const RecomCard = ({ profileData }: RecomCardProps) => {
  const { is_premium } = profileData || {};
  return (
    <div className="flex size-full">
      <div className="grid w-full grid-cols-2 gap-4 md:gap-2">
        {is_premium ? (
          <Link
            href="/essentia-ai"
            className="col-span-2 flex items-center justify-center rounded-2xl bg-light-gradient-v2 !transition data-[hover=true]:scale-105 data-[hover=true]:shadow-lg data-[hover=true]:saturate-200 dark:bg-dark-gradient-v2"
          >
            <div className="inline-flex h-16 items-center justify-center gap-4">
              <AIFillIcon className="size-7 text-white" />
              <h2 className="text-2xl font-extrabold leading-none text-white">
                Essentia AI
              </h2>
            </div>
          </Link>
        ) : (
          <Link
            href="/premium"
            className="col-span-2 flex items-center justify-center rounded-2xl bg-light-gradient-v2 !transition data-[hover=true]:scale-105 data-[hover=true]:shadow-lg data-[hover=true]:saturate-200 dark:bg-dark-gradient-v2"
          >
            <div className="inline-flex h-16 items-center justify-center gap-4">
              <StarsIcon
                aria-hidden="true"
                className="size-7 focus:outline-none [&_*]:fill-white"
              />
              <h2 className="text-2xl font-extrabold leading-none text-white">
                Hazte Premium
              </h2>
            </div>
          </Link>
        )}
        <Link
          href="/centros-de-salud"
          className="flex items-center justify-center rounded-2xl border border-gray-300 bg-gray-100 dark:border-dark dark:bg-dark/50"
        >
          <div className="inline-flex h-20 flex-col items-center justify-between p-3 text-main-h dark:text-main-dark">
            <HealthCentersFillIcon className="size-7" />
            <h2 className="text-sm">Centros de Salud</h2>
          </div>
        </Link>
        <Link
          href="/adicionales"
          className="rounded-2xl border border-gray-300 bg-gray-100 dark:border-dark dark:bg-dark/50"
        >
          <div className="inline-flex h-20 flex-col items-center justify-between p-3 text-main-h dark:text-main-dark">
            <AdditionalFillIcon className="size-7" />
            <h2 className="text-sm">Recursos Adicionales</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecomCard;
