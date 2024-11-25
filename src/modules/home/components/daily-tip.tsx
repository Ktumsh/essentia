"use client";

import { useEffect, useState } from "react";

import { dailyFacts } from "@/app/actions";
import { useIsMobile } from "@/components/hooks/use-mobile";
import HealthFactsCard from "@/modules/core/components/ui/cards/health-facts-card";
import { HealthFact } from "@/types/common";

import Loading from "../loading";

const DailyTip = () => {
  const isMobile = useIsMobile();
  const [facts, setFacts] = useState<HealthFact[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isMobile) {
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
    }
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <>
      <h2 className="mb-2 ml-3 px-8 text-xl font-semibold normal-case tracking-tight text-main dark:text-main-dark">
        Consejo del día
      </h2>
      <section className="flex w-full flex-col px-6 md:px-0">
        {loading ? <Loading /> : <HealthFactsCard facts={facts} />}
      </section>
    </>
  );
};

export default DailyTip;
