import HealthFactsCard from "@/modules/home/components/health-facts-card";
import { HealthFact } from "@/types/common";

import Loading from "../loading";

interface MobileDailyTipProps {
  facts: HealthFact[] | null;
  loading: boolean;
}

const MobileDailyTip = ({ facts, loading }: MobileDailyTipProps) => {
  return (
    <section className="w-full md:hidden">
      <h2 className="mb-2 ml-3 px-8 text-xl font-semibold normal-case tracking-tight text-main dark:text-main-dark">
        Consejo del día
      </h2>
      <section className="flex w-full flex-col px-6 md:px-0">
        {loading ? <Loading /> : <HealthFactsCard facts={facts} />}
      </section>
    </section>
  );
};

export default MobileDailyTip;
