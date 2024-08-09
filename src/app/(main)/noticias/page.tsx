import { Metadata } from "next";
import { AdjustmentsIcon } from "@/modules/icons/miscellaneus";
import NewsTabs from "@/modules/news/components/tabs";
import NewsGrid from "@/modules/news/components/news-grid";

export const metadata: Metadata = {
  title: "Noticias",
};

const NewsPage = () => {
  return (
    <>
      <div className="relative flex items-center justify-center w-full h-80 my-5 mt-14">
        <div className="absolute inset-0 bg-cover bg-no-repeat bg-center size-full bg-[url(/newsbg.jpg)]"></div>
        <div className="absolute inset-0 size-full bg-base-full-dark-60"></div>
        <h1 className="text-6xl drop-shadow-md font-extrabold uppercase text-transparent bg-clip-text bg-light-gradient dark:bg-[linear-gradient(111.1deg,#061b37_-100%,_rgb(255,_115,_115)_82.7%,_rgb(255,_175,_123)_97.2%)]">
          Noticias
        </h1>
      </div>
      <main className="flex flex-col min-h-dvh w-full md:min-w-[768px] max-w-5xl p-5 shrink items-stretch grow">
        <div
          role="navigation"
          className="relative flex items-center justify-between w-full h-10 bg-white/50 border border-gray-100/50 dark:border-none backdrop-blur backdrop-saturate-150 dark:bg-base-dark rounded-xl shadow-md overflow-hidden"
        >
          <NewsTabs />
          <button
            type="button"
            className="flex items-center justify-center rounded-full p-1.5 mr-1 hover:bg-gray-200 hover:dark:bg-base-full-dark hover:brightness-90 transition-[filter]"
          >
            <AdjustmentsIcon className="size-6" />
          </button>
        </div>

        <NewsGrid />
      </main>
    </>
  );
};

export default NewsPage;
