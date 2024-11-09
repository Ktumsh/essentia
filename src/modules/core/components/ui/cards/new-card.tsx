import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "../../../../icons/navigation";

const NewCard = () => {
  return (
    <article className="relative size-full overflow-hidden rounded-xl border border-gray-200 bg-white/50 bg-bento-gradient shadow-md backdrop-blur backdrop-saturate-150 dark:border-none dark:bg-transparent dark:bg-none dark:backdrop-saturate-100">
      <div className="relative flex h-full flex-col overflow-hidden">
        <div className="flex size-full flex-col items-center justify-between overflow-hidden">
          <Image
            width={272}
            height={374.2}
            src="/extras/news-card-main.webp"
            alt="Noticias de Essentia"
            priority
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute inset-0 z-0 rounded-xl object-cover transition [mask-image:linear-gradient(to_top,_rgba(0,_0,_0,_1)_30%,_transparent_100%)] group-hover:scale-105"
          />
          <div className="absolute inset-0 size-full bg-cover bg-center"></div>
          <div className="z-10 flex w-full flex-col content-center p-5">
            <h4 className="text-lg font-medium text-main-h drop-shadow-sm dark:text-white">
              Échale un vistazo a las noticias interesantes del momento...
            </h4>
          </div>
          <div className="z-10 flex w-full items-center justify-end overflow-hidden p-2">
            <Link
              className="group bottom-1 flex h-9 w-full flex-row items-center justify-center rounded-xl bg-bittersweet-400 px-3 shadow-small transition hover:brightness-90 dark:bg-cerise-red-600"
              href="/noticias"
            >
              <span className="text-white">Ir a noticias</span>
              <ArrowRightIcon className="ms-2 size-3.5 text-white transition-[margin,_transform] group-hover:ms-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewCard;
