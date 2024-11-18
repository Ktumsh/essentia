"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { HealthFact } from "@/types/common";

import HealthFactsCard from "../cards/health-facts-card";

const AsideTabs = () => {
  const [facts, setFacts] = useState<HealthFact[]>([]);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    isHome && (
      <aside className="sticky right-0 top-0 hidden max-h-dvh w-full max-w-72 select-none 2xl:block">
        <div className="relative float-end flex h-full w-72">
          <div className="flex w-full flex-col items-center p-2 pb-0 lg:justify-between">
            <div className="flex size-full flex-col">
              <div className="mb-2 ml-3 pt-3">
                <h3 className="mb-2 ml-3 px-5 text-sm font-semibold uppercase text-main dark:text-main-dark lg:px-0">
                  Consejos del día
                </h3>
              </div>
              <section className="flex h-full flex-col">
                <HealthFactsCard facts={facts} setFacts={setFacts} />
              </section>
            </div>
          </div>
        </div>
      </aside>
    )
  );
};

export default AsideTabs;
