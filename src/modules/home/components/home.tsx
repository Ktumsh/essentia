"use client";

import { useIsMobile } from "@/components/hooks/use-mobile";
import AsideTabs from "@/modules/core/components/ui/layout/aside.tabs";
import { UserProfileData } from "@/types/session";

import DailyTip from "./daily-tip";
import Recomendations from "./home-carousel/recomendations";
import RecomCard from "./recom-card";
import Resources from "./resources";

interface HomeProps {
  profileData: UserProfileData | null;
}

const Home = ({ profileData }: HomeProps) => {
  const isMobile = useIsMobile();
  const { is_premium } = profileData ?? {};

  return (
    <div className="flex flex-1">
      <div className="mx-auto flex w-full max-w-6xl shrink grow items-stretch justify-center">
        <div className="flex size-full shrink grow flex-col items-stretch md:pt-5 lg:px-5 lg:pb-5">
          {!isMobile && (
            <div className="relative mb-5 hidden w-full flex-row gap-2 md:flex">
              <section className="flex w-full flex-1 flex-col">
                <h2 className="mb-2 ml-3 px-5 font-semibold text-main dark:text-main-dark lg:px-0">
                  Recomendaciones
                </h2>
                <Recomendations isPremium={is_premium} />
              </section>
            </div>
          )}
          <div className="relative my-5 flex w-full flex-col md:hidden">
            <section className="flex w-full flex-1 flex-col px-6 lg:px-0">
              <RecomCard profileData={profileData} />
            </section>
          </div>
          <div className="relative rounded-t-3xl bg-gray-100 pb-16 dark:bg-dark/50 md:rounded-none md:bg-transparent md:pb-0 md:dark:bg-transparent lg:pb-0">
            <div className="flex w-full select-none flex-col py-6 md:py-0">
              <h2 className="mb-2 ml-3 px-8 text-xl font-semibold tracking-tight text-main dark:text-main-dark md:text-base md:tracking-normal lg:px-0">
                Todos los recursos
              </h2>
              <section className="mb-6 flex w-full flex-col px-6 md:mb-0 md:px-0">
                <Resources />
              </section>
              <DailyTip />
            </div>
          </div>
        </div>
      </div>
      <AsideTabs />
    </div>
  );
};

export default Home;
