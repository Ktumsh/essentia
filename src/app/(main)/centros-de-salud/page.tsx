import Centers from "@/modules/health-centers/components/centers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centros de salud",
};

const HealthCentersPage = () => {
  return (
    <div className="w-full flex items-stretch justify-center grow md:px-8 2xl:px-16 pt-14 shrink">
      <main className="flex flex-col w-full lg:min-w-[1024px] md:py-5 lg:px-5 shrink items-stretch grow">
        <Centers />
      </main>
    </div>
  );
};

export default HealthCentersPage;
