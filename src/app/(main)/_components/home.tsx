import AsideRight from "./aside-right";
import MobileDailyTip from "./mobile-daily-tip";
import RecomCard from "./recom-card";
import Recomendations from "./recomendations";
import ResourceGrid from "./resource-grid";
import StorageMobile from "./storage-mobile";
import UpgradeCard from "./upgrade-card";

const Home = () => {
  return (
    <div className="@container">
      <div className="flex flex-col @7xl:flex-row">
        <div className="mx-auto flex w-full max-w-6xl shrink grow items-stretch justify-center">
          <div className="flex size-full shrink grow flex-col items-stretch md:p-5">
            <div className="relative mb-5 hidden w-full flex-row gap-2 md:flex">
              <section className="flex w-full flex-1 flex-col">
                <h2 className="mb-2 ml-3 px-5 text-base font-semibold md:px-0">
                  Recomendaciones
                </h2>
                <Recomendations />
              </section>
            </div>
            <div className="relative my-5 flex w-full flex-col md:hidden">
              <section className="flex w-full flex-1 flex-col px-6 md:px-0">
                <RecomCard />
              </section>
            </div>
            <div className="dark:bg-accent/50 bg-accent relative rounded-t-3xl pb-16 md:rounded-none md:bg-transparent md:pb-0 md:dark:bg-transparent">
              <div className="flex w-full flex-col py-6 select-none md:py-0">
                <h2 className="font-merriweather md:font-poppins mb-2 ml-3 px-8 text-xl font-semibold tracking-tight md:px-0 md:text-base md:tracking-normal">
                  Recursos educativos
                </h2>
                <div className="flex flex-col space-y-8 md:space-y-0">
                  <section className="px-6 md:px-0">
                    <ResourceGrid />
                  </section>
                  <MobileDailyTip />
                  <StorageMobile />
                  <section className="flex w-full flex-col px-6 md:hidden">
                    <UpgradeCard />
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AsideRight />
      </div>
    </div>
  );
};

export default Home;
