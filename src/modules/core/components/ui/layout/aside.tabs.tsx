"use client";

import { useEffect, useState } from "react";

import { dailyFacts } from "@/app/actions";
import Loading from "@/modules/home/loading";
import { HealthFact } from "@/types/common";

import HealthFactsCard from "../cards/health-facts-card";

const AsideTabs = () => {
  const [facts, setFacts] = useState<HealthFact[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const data = await dailyFacts();
        setFacts(data);
      } catch (err) {
        console.error("Error al obtener los facts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacts();
  }, []);

  return (
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
              {loading ? <Loading /> : <HealthFactsCard facts={facts} />}
            </section>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AsideTabs;
