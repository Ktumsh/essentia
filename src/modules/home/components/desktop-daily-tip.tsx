import Loading from "@/modules/home/loading";
import { HealthFact } from "@/types/common";

import HealthFactsCard from "./health-facts-card";

interface DesktopDailyTipProps {
  facts: HealthFact[] | null;
  loading: boolean;
}

const DesktopDailyTip = ({ facts, loading }: DesktopDailyTipProps) => {
  return (
    <aside className="sticky right-0 top-0 hidden max-h-dvh w-full max-w-72 select-none 2xl:block">
      <div className="relative float-end flex h-full w-72">
        <div className="flex w-full flex-col items-center p-2 pb-0 lg:justify-between">
          <div className="flex w-full flex-col">
            <h3 className="mb-2 ml-3 px-5 pt-3 font-semibold text-main dark:text-main-dark lg:px-0">
              Consejo del día
            </h3>
            <article className="flex h-full flex-col">
              {loading ? <Loading /> : <HealthFactsCard facts={facts} />}
            </article>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DesktopDailyTip;
