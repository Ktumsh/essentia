import { Metadata } from "next";

import Centers from "@/modules/health-centers/components/centers";

export const metadata: Metadata = {
  title: "Centros de salud",
};

const HealthCentersPage = () => {
  return (
    <div className="fixed mt-14 flex min-h-[calc(100dvh-56px)] w-full flex-col md:static md:mt-0">
      <div className="flex-1">
        <div className="mx-auto size-full min-h-[calc(100dvh-56px)] max-w-8xl flex-1 border-gray-200 bg-white text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:min-h-full md:border md:border-y-0">
          <Centers />
        </div>
      </div>
    </div>
  );
};

export default HealthCentersPage;
