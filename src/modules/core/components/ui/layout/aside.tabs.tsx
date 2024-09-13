"use client";

import { useState } from "react";
import HealthFactsCard from "../cards/health-facts-card";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
import { HealthFact } from "@/types/common";
import { getRandomFacts } from "../../../lib/utils";

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
                  <h3 className="text-sm uppercase font-bold text-base-color-h dark:text-base-color-dark">
                    Consejos del día
                  </h3>
                </div>
                <section className="flex flex-col h-1/2">
                  <HealthFactsCard facts={facts} setFacts={setFacts} />
                </section>
                <Button
                  variant="flat"
                  radius="sm"
                  onPress={() => setFacts(getRandomFacts(2))}
                  className="bg-black/5 dark:bg-white/5 text-base-color dark:text-base-color-dark"
                >
                  Ver más consejos
                </Button>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default AsideTabs;
