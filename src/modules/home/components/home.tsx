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
    <div className="flex items-stretch justify-center w-full grow lg:px-8 md:pb-0 pt-14 shrink">
      <div className="flex flex-col items-stretch max-w-5xl py-5 size-full lg:pb-5 lg:px-5 shrink grow">
        {windowSize.width > 768 ? (
          <div className="relative flex-row hidden w-full gap-2 mb-2 md:flex">
            <section className="flex flex-col flex-1 w-full">
              <h2 className="px-5 mb-2 ml-3 text-sm font-bold uppercase lg:px-0 text-main-h dark:text-main-dark">
                Recomendaciones
              </h2>
              <Carousel />
            </section>
          </div>
        ) : (
          <div className="relative flex flex-col w-full md:hidden">
            <section className="flex flex-col flex-1 w-full px-6 lg:px-0">
              <RecomCard profileData={profileData} />
            </section>
          </div>
        )}
        <div className="relative pb-16 mt-5 bg-gray-100 lg:pb-0 dark:bg-dark/50 md:bg-transparent md:dark:bg-transparent rounded-t-3xl md:rounded-none">
          <div className="flex flex-col w-full py-4 select-none md:py-0">
            <h2 className="px-8 mb-2 ml-3 text-2xl font-medium tracking-tight normal-case lg:px-0 text-main-h dark:text-main-dark md:text-sm md:font-bold md:uppercase">
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
