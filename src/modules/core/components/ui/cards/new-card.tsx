import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "../../../../icons/navigation";

const NewCard = () => {
  return (
    <article className="relative size-full bg-white/50 bg-bento-gradient dark:bg-none border border-gray-200 dark:border-none backdrop-blur backdrop-saturate-150 dark:backdrop-saturate-100 dark:bg-transparent rounded-xl shadow-md overflow-hidden">
      <div className="relative flex flex-col h-full overflow-hidden">
        <div className="flex flex-col items-center justify-between size-full overflow-hidden">
          <Image
            width={272}
            height={374.2}
            src="/extras/news-card-main.webp"
            alt="Noticias de Essentia"
            priority
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="z-0 absolute inset-0 object-cover [mask-image:linear-gradient(to_top,_rgba(0,_0,_0,_1)_30%,_transparent_100%)] rounded-xl group-hover:scale-105 transition"
          />
          <div className="absolute inset-0 size-full bg-cover bg-center"></div>
          <div className="flex flex-col w-full content-center p-5 z-10">
            <h4 className="font-medium text-lg text-main-h dark:text-white drop-shadow-sm">
              Échale un vistazo a las noticias interesantes del momento...
            </h4>
          </div>
          <div className="flex items-center justify-end w-full overflow-hidden p-2 z-10">
            <Link
              className="group flex flex-row items-center justify-center h-9 w-full px-3 bg-bittersweet-400 dark:bg-cerise-red-600 rounded-xl bottom-1 shadow-small transition hover:brightness-90"
              href="/noticias"
            >
              <span className="text-white">Ir a noticias</span>
              <ArrowRightIcon className="rtl:rotate-180 size-3.5 ms-2 text-white group-hover:ms-4 transition-[margin,_transform]" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewCard;
