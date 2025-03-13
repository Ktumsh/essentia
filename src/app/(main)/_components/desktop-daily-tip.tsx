import { HealthFact } from "@/types/common";

import DailyTipLoading from "./daily-tip-loading";
import HealthFactsCard from "./health-facts-card";

interface DesktopDailyTipProps {
  facts: HealthFact[] | null;
  loading: boolean;
}

const DesktopDailyTip = ({ facts, loading }: DesktopDailyTipProps) => {
  return (
    <aside className="sticky top-0 right-0 hidden max-h-dvh w-full max-w-72 select-none 2xl:block">
      <div className="relative float-end flex h-full w-72">
        <div className="flex w-full flex-col items-center p-2 pb-0 lg:justify-between">
          <div className="flex w-full flex-col">
            <h3 className="text-main dark:text-main-dark mb-2 ml-3 px-5 pt-3 text-base font-semibold lg:px-0">
              Dato curioso del día
            </h3>
            <article className="flex h-full flex-col">
              {loading ? (
                <DailyTipLoading />
              ) : (
                <HealthFactsCard facts={facts} />
              )}
            </article>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DesktopDailyTip;
