"use client";

import useWindowSize from "@/modules/core/hooks/use-window-size";
import Carousel from "@/modules/home/components/home-carousel/carousel";
import { UserProfileData } from "@/types/session";

import RecomCard from "./recom-card";
import Resources from "./resources";

interface HomeProps {
  profileData: UserProfileData | null;
}

const Home = ({ profileData }: HomeProps) => {
  const windowSize = useWindowSize();

  return (
    <div className="w-full flex items-stretch justify-center grow lg:px-8 md:pb-0 pt-14 shrink">
      <div className="flex flex-col size-full max-w-5xl py-5 lg:pb-5 lg:px-5 shrink items-stretch grow">
        {windowSize.width > 768 ? (
          <div className="hidden md:flex flex-row relative w-full gap-2 mb-2">
            <section className="flex flex-col flex-1 w-full">
              <h2 className="text-sm uppercase font-bold px-5 lg:px-0 mb-2 ml-3 text-base-color-h dark:text-base-color-dark">
                Recomendaciones
              </h2>
              <Carousel />
            </section>
          </div>
        ) : (
          <div className="flex md:hidden flex-col relative w-full">
            <section className="flex flex-col flex-1 w-full px-6 lg:px-0">
              <RecomCard profileData={profileData} />
            </section>
          </div>
        )}
        <div className="relative pb-16 lg:pb-0 mt-5 bg-gray-100 dark:bg-base-dark-50 md:bg-transparent md:dark:bg-transparent rounded-t-3xl md:rounded-none">
          <div className="flex flex-col w-full py-4 md:py-0 select-none">
            <h2 className="px-8 lg:px-0 mb-2 ml-3 text-base-color-h dark:text-base-color-dark text-2xl md:text-sm font-medium md:font-bold normal-case md:uppercase tracking-tight">
              Recursos
            </h2>
            <section className="flex flex-col w-full px-6 lg:px-0">
              <Resources />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
