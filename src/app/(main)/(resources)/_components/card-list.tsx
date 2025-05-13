import { memo } from "react";

import { ARTICLES_BY_RESOURCE } from "@/db/data/article-data";
import { EXERCISE_VIDEO_DATA } from "@/db/data/exercise-video-data";
import { ROUTINE_DATA } from "@/db/data/routine-data";

import CardItem from "./card-item";

interface CardList {
  resource: string;
  type: "article" | "routine";
}

const CardList = ({ resource, type }: CardList) => {
  let items: any[] = [];

  const isArticle = type === "article";
  const isRoutine = type === "routine";

  if (isArticle) {
    items = ARTICLES_BY_RESOURCE[resource];
  } else if (isRoutine) {
    const videos =
      EXERCISE_VIDEO_DATA.find(
        (section) => section.section === "ExerciseFitness",
      )?.videos || [];

    items = ROUTINE_DATA.map((routine, index) => ({
      ...routine,
      videoTitle: videos[index]?.title,
      videoLink: videos[index]?.link,
      videoChannel: videos[index]?.channel,
    }));
  }

  if (!items) {
    return <p>No se encontraron artículos para este recurso.</p>;
  }

  return (
    <>
      <ul className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <CardItem key={item.id} item={item} type={type} />
        ))}
      </ul>
    </>
  );
};

export default memo(CardList);
