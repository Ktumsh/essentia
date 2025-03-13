import { HealthFact } from "@/types/common";

import DailyTipLoading from "./daily-tip-loading";
import HealthFactsCard from "./health-facts-card";

interface MobileDailyTipProps {
  facts: HealthFact[] | null;
  loading: boolean;
}

const MobileDailyTip = ({ facts, loading }: MobileDailyTipProps) => {
  return (
    <section className="w-full md:hidden">
      <h2 className="font-merriweather mb-2 ml-3 px-8 text-xl font-semibold tracking-tight normal-case">
        Dato curioso del día
      </h2>
      <section className="flex w-full flex-col px-6 md:px-0">
        {loading ? <DailyTipLoading /> : <HealthFactsCard facts={facts} />}
      </section>
    </section>
  );
};

export default MobileDailyTip;
