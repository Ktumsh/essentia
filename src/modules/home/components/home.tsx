import Carousel from "./carousel";
import Resources from "./resources";

const Home = () => {
  return (
    <>
      <div className="w-full flex items-stretch justify-center grow lg:px-8 pt-14 shrink">
        <main className="flex flex-col size-full md:min-w-[768px] max-w-5xl py-5 lg:px-5 shrink items-stretch grow">
          <div className="flex flex-row relative w-full gap-2 mb-2">
            <section className="flex flex-col flex-1 w-full">
              <h3 className="text-sm uppercase font-bold mb-2 ml-3 text-base-color-h dark:text-base-color-dark">
                Recomendaciones
              </h3>
              <Carousel />
            </section>
          </div>
          <div className="flex flex-col relative w-full select-none">
            <section className="flex flex-col w-full px-5 lg:px-0">
              <Resources />
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
