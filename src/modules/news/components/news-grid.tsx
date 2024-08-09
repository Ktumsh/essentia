"use client";

import { NEWS } from "@/consts/news-data";
import { News } from "@/types/common";
import { useState, useEffect } from "react";
import NewsGridItem from "./news-grid-item";
import { SpinnerIcon } from "@/modules/icons/common";

const shuffleArray = (array: News[]): News[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const NewsGrid: React.FC = () => {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const shuffledNews = shuffleArray([...NEWS]);
        setNewsData(shuffledNews);
        const isTablet = window.matchMedia("(max-width: 1024px)").matches;
        setVisibleCount(isTablet ? 6 : 7);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const loadMore = () => {
    setLoadingMore(true);
    const isTablet = window.matchMedia("(max-width: 1024px)").matches;
    setTimeout(() => {
      setVisibleCount((prevCount) =>
        isTablet ? prevCount + 4 : prevCount + 6
      );
      setLoadingMore(false);
    }, 500);
  };

  const loader = (
    <div className="flex items-center justify-center h-16 mb-8 mx-auto">
      <span className="flex flex-col items-center justify-center text-base-color-m dark:text-base-color-dark-m">
        <SpinnerIcon className="size-[18px]" />
      </span>
    </div>
  );

  if (loading) {
    return loader;
  }

  return (
    <>
      <div id="news-grid" className="grid grid-cols-12 gap-2 my-5">
        {newsData.slice(0, visibleCount).map((item, index) => (
          <NewsGridItem
            key={item.id}
            url={item.link ?? ""}
            className={
              index < 4
                ? index % 4 === 0 || index % 4 === 3
                  ? "col-span-12 sm:col-span-7"
                  : "col-span-12 sm:col-span-5"
                : "col-span-12 sm:col-span-6 lg:col-span-4"
            }
            category={item.category ?? ""}
            title={item.title ?? ""}
            sourceUrl={item.source_url ?? ""}
            sourceIcon={item.source_icon ?? ""}
            creator={item.creator ?? ""}
            date={item.pubDate ?? ""}
            views={item.views ?? 0}
            image={item.image_url ?? ""}
          />
        ))}
      </div>
      {visibleCount < newsData.length && (
        <>
          {loadingMore ? (
            loader
          ) : (
            <div className="flex justify-center items-center mx-auto w-full h-16 mb-8 text-white text-sm">
              <button
                type="button"
                onClick={loadMore}
                className="w-fit h-8 px-5 bg-bittersweet-400 dark:bg-cerise-red-600 rounded-full hover:brightness-90 transition"
              >
                Cargar más
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NewsGrid;
