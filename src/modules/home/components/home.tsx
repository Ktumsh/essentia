import Carousel from "@/modules/home/components/home-carousel/carousel";
import Resources from "./resources";

const Home = () => {
  return (
    <>
      <div className="w-full flex items-stretch justify-center grow lg:px-8 pb-14 md:pb-0 pt-14 shrink">
        <main className="flex flex-col size-full max-w-5xl py-5 pb-12 lg:pb-5 lg:px-5 shrink items-stretch grow">
          <div className="flex flex-row relative w-full gap-2 mb-2">
            <section className="flex flex-col flex-1 w-full">
              <h3 className="text-sm uppercase font-bold px-5 lg:px-0 mb-2 ml-3 text-base-color-h dark:text-base-color-dark">
                Recomendaciones
              </h3>
              <Carousel />
            </section>
          </div>
          <div className="flex flex-col relative w-full mt-5 select-none">
            <h3 className="text-sm uppercase font-bold px-5 lg:px-0 mb-2 ml-3 text-base-color-h dark:text-base-color-dark">
              Nuestros recursos
            </h3>
            <section className="flex flex-col w-full px-2 lg:px-0">
              <Resources />
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
