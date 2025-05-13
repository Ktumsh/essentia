import DailyTipLoading from "./daily-tip-loading";
import HealthFactsCard from "./health-facts-card";

import type { FunFactType } from "@/db/data/fun-fact-data";

interface DesktopDailyTipProps {
  facts: FunFactType[] | null;
  loading: boolean;
}

const DesktopDailyTip = ({ facts, loading }: DesktopDailyTipProps) => {
  return (
    <div className="flex w-full flex-col">
      <h3 className="text-foreground mb-2 ml-3 px-5 text-base font-semibold lg:px-0 @7xl:pt-3">
        Dato curioso del día
      </h3>
      <article className="flex h-full flex-col">
        {loading ? <DailyTipLoading /> : <HealthFactsCard facts={facts} />}
      </article>
    </div>
  );
};

export default DesktopDailyTip;
