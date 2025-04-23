import DailyTipLoading from "./daily-tip-loading";
import HealthFactsCard from "./health-facts-card";

import type { HealthFact } from "@/types/common";

interface DesktopDailyTipProps {
  facts: HealthFact[] | null;
  loading: boolean;
}

const DesktopDailyTip = ({ facts, loading }: DesktopDailyTipProps) => {
  return (
    <div className="flex w-full flex-col">
      <h3 className="text-foreground mb-2 ml-3 px-5 pt-3 text-base font-semibold lg:px-0">
        Dato curioso del día
      </h3>
      <article className="flex h-full flex-col">
        {loading ? <DailyTipLoading /> : <HealthFactsCard facts={facts} />}
      </article>
    </div>
  );
};

export default DesktopDailyTip;
