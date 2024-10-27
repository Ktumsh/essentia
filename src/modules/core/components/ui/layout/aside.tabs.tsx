"use client";

import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { getRandomFacts } from "@/modules/core/lib/utils";
import { HealthFact } from "@/types/common";

import HealthFactsCard from "../cards/health-facts-card";

const AsideTabs = () => {
  const [facts, setFacts] = useState<HealthFact[]>([]);
  const pathname = usePathname();
  const pathnames = ["/adicionales", "/centros-de-salud"];

  const pathnameToIgnore = pathnames.some((path) => pathname.includes(path));

  return (
    <>
      {!pathnameToIgnore && (
        <aside className="hidden 2xl:block w-full max-w-96 max-h-dvh sticky left-0 top-0 pt-14 select-none">
          <div className="relative flex w-72 h-full float-end">
            <div className="flex flex-col items-center lg:justify-between w-full p-2 pb-0">
              <div className="flex flex-col size-full">
                <div className="pt-3 mb-2 ml-3">
                  <h3 className="text-sm uppercase font-bold text-main-h dark:text-main-dark">
                    Consejos del día
                  </h3>
                </div>
                <section className="flex flex-col h-full">
                  <HealthFactsCard facts={facts} setFacts={setFacts} />
                  <Button
                    aria-label="Ver más consejos"
                    variant="flat"
                    radius="sm"
                    onPress={() => setFacts(getRandomFacts(2))}
                    className="bg-black/5 dark:bg-white/5 text-main dark:text-main-dark"
                  >
                    Ver más consejos
                  </Button>
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
