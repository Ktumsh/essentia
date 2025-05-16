import DailyTipLoading from "./daily-tip-loading";
import FunFactCard from "./fun-fact-card";

import type { FunFactType } from "@/db/data/fun-fact-data";

interface MobileDailyTipProps {
  facts: FunFactType[] | null;
  loading: boolean;
}

const MobileDailyTip = ({ facts, loading }: MobileDailyTipProps) => {
  return (
    <section className="w-full md:hidden">
      <h2 className="font-merriweather mb-2 ml-3 px-8 text-xl font-semibold tracking-tight normal-case">
        Dato curioso del día
      </h2>
      <section className="flex w-full flex-col px-6">
        {loading ? <DailyTipLoading /> : <FunFactCard facts={facts} />}
      </section>
    </section>
  );
};

export default MobileDailyTip;
