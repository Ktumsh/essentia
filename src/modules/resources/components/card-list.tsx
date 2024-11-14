import { ARTICLES_BY_RESOURCE } from "@/consts/articles-data";
import RESOURCES_VIDEOS from "@/consts/resources-videos";
import { ROUTINES } from "@/consts/routines-data";

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
      RESOURCES_VIDEOS.find((section) => section.section === "ExerciseFitness")
        ?.videos || [];

    items = ROUTINES.map((routine, index) => ({
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
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {items.map((card) => (
          <CardItem key={card.id} item={card} type={type} />
        ))}
      </ul>
    </>
  );
};

export default CardList;
