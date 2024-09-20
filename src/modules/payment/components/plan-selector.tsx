import { LinkIcon } from "@/modules/icons/action";
import { cn } from "@/utils/common";
import Link from "next/link";

export const PlanSelector = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 dark:border-base-dark p-4 text-sm font-normal text-base-color dark:text-white">
          <div className="flex justify-between">
            <div className="flex items-center gap-1.5">
              <h3 className="font-medium">Gratis</h3>
              <div className="inline-flex shrink-0 items-center justify-center h-5 gap-1 px-1.5 font-medium text-base-color dark:text-base-color-dark text-xs bg-gray-200 dark:bg-base-dark rounded-full">
                Plan Actual
              </div>
            </div>
            <div>
              <span className="text-base font-medium font-sans">$0</span>
              <span className="text-base-color-m dark:text-base-color-dark-m">
                /mes
              </span>
            </div>
          </div>
          <p className="text-base-color-h dark:text-base-color-dark-h">
            Plan básico, no incluye funcionalidades premium.
          </p>
        </div>

        <div
          className={cn(
            "relative flex flex-col gap-2 rounded-xl p-4 text-sm font-normal text-base-color dark:text-white bg-light-gradient-v2 dark:bg-dark-gradient-v2",
            "after:content-[''] after:absolute after:inset-[2px] after:rounded-[10px] after:bg-white after:dark:bg-base-full-dark"
          )}
        >
          <div className="flex justify-between z-10">
            <div className="flex items-center gap-1.5">
              <h3 className="font-medium">Premium</h3>
              <div className="inline-flex shrink-0 items-center justify-center h-5 gap-1 px-1.5 font-medium text-white text-xs bg-light-gradient-v2 dark:bg-dark-gradient-v2 rounded-full">
                Recomendado
              </div>
            </div>
            <div className="z-10">
              <span className="text-base font-medium font-sans">$5.000</span>
              <span className="text-base-color-m dark:text-base-color-dark-m">
                /mes
              </span>
            </div>
          </div>
          <p className="text-base-color-h dark:text-base-color-dark-h z-10">
            Plan premium con todas las funcionalidades de Essentia AI.
          </p>
        </div>
      </div>

      <p className="flex gap-1 text-center text-sm text-base-color-m dark:text-base-color-dark-m">
        Ver más detalles en nuestra
        <Link
          className="flex items-center gap-x-1 text-orient-700"
          href="/pricing"
        >
          página de precios <LinkIcon />
        </Link>
      </p>
    </>
  );
};
