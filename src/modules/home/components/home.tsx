"use client";

import { useIsMobile } from "@/components/hooks/use-mobile";
import AsideTabs from "@/modules/core/components/ui/layout/aside.tabs";
import Carousel from "@/modules/home/components/home-carousel/carousel";
import { UserProfileData } from "@/types/session";

import RecomCard from "./recom-card";
import Resources from "./resources";

interface HomeProps {
  profileData: UserProfileData | null;
}

const Home = ({ profileData }: HomeProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-1">
      <div className="mx-auto flex w-full max-w-6xl shrink grow items-stretch justify-center">
        <div className="flex size-full shrink grow flex-col items-stretch md:pt-5 lg:px-5 lg:pb-5">
          {!isMobile ? (
            <div className="relative mb-2 hidden w-full flex-row gap-2 md:flex">
              <section className="flex w-full flex-1 flex-col">
                <h2 className="mb-2 ml-3 px-5 text-sm font-semibold uppercase text-main dark:text-main-dark lg:px-0">
                  Recomendaciones
                </h2>
                <Carousel />
              </section>
            </div>
          ) : (
            <div className="relative mt-5 flex w-full flex-col md:hidden">
              <section className="flex w-full flex-1 flex-col px-6 lg:px-0">
                <RecomCard profileData={profileData} />
              </section>
            </div>
          )}
          <div className="relative rounded-t-3xl bg-gray-100 dark:bg-dark/50 md:rounded-none md:bg-transparent md:dark:bg-transparent lg:pb-0">
            <div className="flex w-full select-none flex-col py-4 md:py-0">
              <h2 className="mb-2 ml-3 px-8 text-xl font-semibold normal-case tracking-tight text-main dark:text-main-dark md:text-sm md:font-semibold md:uppercase md:tracking-normal lg:px-0">
                Recursos
              </h2>
              <section className="flex w-full flex-col px-6 md:px-0">
                <Resources />
              </section>
            </div>
          </div>
        </div>
      </div>
      <AsideTabs />
    </div>
  );
};

export default Home;
