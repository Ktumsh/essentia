"use client";

import { useEffect, useState } from "react";

import { dailyFacts } from "@/app/actions";
import { useIsMobile } from "@/hooks/use-mobile";
import { HealthFact } from "@/types/common";

import AsideRight from "./aside-right";
import MobileDailyTip from "./mobile-daily-tip";
import RecomCard from "./recom-card";
import Recomendations from "./recomendations";
import Resources from "./resources";
import StorageMobile from "./storage-mobile";
import UpgradeCard from "./upgrade-card";

import type { UserProfileData } from "@/types/auth";

interface HomeProps {
  userData: UserProfileData | null;
}

const Home = ({ userData }: HomeProps) => {
  const { isPremium } = userData ?? {};

  const [facts, setFacts] = useState<HealthFact[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isMobile = useIsMobile();

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
    <div className="@container flex">
      <div className="mx-auto flex w-full max-w-6xl shrink grow items-stretch justify-center">
        <div className="flex size-full shrink grow flex-col items-stretch md:p-5">
          {!isMobile && (
            <div className="relative mb-5 hidden w-full flex-row gap-2 md:flex">
              <section className="flex w-full flex-1 flex-col">
                <h2 className="mb-2 ml-3 px-5 text-base font-semibold md:px-0">
                  Recomendaciones
                </h2>
                <Recomendations isPremium={isPremium!} />
              </section>
            </div>
          )}
          <div className="relative my-5 flex w-full flex-col md:hidden">
            <section className="flex w-full flex-1 flex-col px-6 md:px-0">
              <RecomCard profileData={userData} />
            </section>
          </div>
          <div className="dark:bg-accent/50 bg-accent relative rounded-t-3xl pb-16 md:rounded-none md:bg-transparent md:pb-0 md:dark:bg-transparent">
            <div className="flex w-full flex-col py-6 select-none md:py-0">
              <h2 className="font-merriweather md:font-poppins mb-2 ml-3 px-8 text-xl font-semibold tracking-tight md:px-0 md:text-base md:tracking-normal">
                Recursos educativos
              </h2>
              <div className="flex flex-col space-y-8">
                <section className="px-6 md:px-0">
                  <Resources />
                </section>
                <MobileDailyTip facts={facts} loading={loading} />
                {userData && <StorageMobile />}
                {isMobile && userData && !isPremium && (
                  <section className="flex w-full flex-col px-6">
                    <UpgradeCard />
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isMobile && (
        <AsideRight facts={facts} loading={loading} userData={userData} />
      )}
    </div>
  );
};

export default Home;
