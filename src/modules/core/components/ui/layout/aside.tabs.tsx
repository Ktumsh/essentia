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
        <aside className="sticky left-0 top-0 hidden max-h-dvh w-full max-w-96 select-none 2xl:block">
          <div className="relative float-end flex h-full w-72">
            <div className="flex w-full flex-col items-center p-2 pb-0 lg:justify-between">
              <div className="flex size-full flex-col">
                <div className="mb-2 ml-3 pt-3">
                  <h3 className="text-sm font-bold uppercase text-main-h dark:text-main-dark">
                    Consejos del día
                  </h3>
                </div>
                <section className="flex h-full flex-col">
                  <HealthFactsCard facts={facts} setFacts={setFacts} />
                  <Button
                    aria-label="Ver más consejos"
                    variant="flat"
                    radius="full"
                    onPress={() => setFacts(getRandomFacts(2))}
                    className="bg-black/5 text-main dark:bg-white/5 dark:text-main-dark"
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
