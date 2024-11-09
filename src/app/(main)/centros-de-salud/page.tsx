import { Metadata } from "next";

import Centers from "@/modules/health-centers/components/centers";

export const metadata: Metadata = {
  title: "Centros de salud",
};

const HealthCentersPage = () => {
  return (
    <div className="flex min-h-dvh w-full flex-col pt-14">
      <div className="flex-1">
        <div className="max-w-8xl mx-auto size-full flex-1 border-gray-200 bg-white text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:border md:border-y-0">
          <Centers />
        </div>
      </div>
    </div>
  );
};

export default HealthCentersPage;
