"use client";

import NewCard from "@/modules/home/components/new-card";
import HealthFactsCard from "./ui/health-facts-card";
import { usePathname } from "next/navigation";

const AsideTabs = () => {
  const pathname = usePathname();

  const additionals = pathname.startsWith("/adicionales");
  return (
    <>
      {!additionals && (
        <aside className="hidden lg:block w-full max-w-96 max-h-dvh sticky left-0 top-0 pt-14 select-none">
          <div className="relative flex w-72 h-full float-end">
            <div className="flex flex-col items-center lg:justify-between w-full p-2 pb-0">
              <div className="flex flex-col size-full">
                <section className="flex flex-col mb-5 min-h-[374.2px] w-full">
                  <NewCard />
                </section>
                <section className="flex flex-col h-full">
                  <HealthFactsCard />
                </section>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default AsideTabs;
