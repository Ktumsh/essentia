import { Button } from "@nextui-org/react";

import Link from "next/link";
import Image from "next/image";

import { ArrowRightIcon } from "../../icons/navigation";

type Props = {
  id: string;
  title: string;
  description: string;
  textBtn: string;
  url: string;
  image: string;
  isActive: boolean;
};

const RecomCarouselItem = ({
  id,
  title,
  description,
  textBtn,
  url,
  image,
  isActive,
}: Props) => {
  return (
    <div
      id={id}
      className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      data-carousel-item={isActive ? "active" : ""}
    >
      <div className="absolute inset-0 z-30">
        <Link href={url}>
          <div className="flex flex-col items-center sm:items-start justify-center size-full py-8 sm:py-16 px-14 sm:px-24 sm:pr-56 2xl:pr-80 text-start bg-[radial-gradient(rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.2)_100%)] sm:bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0)_100%)]">
            <h1 className="mb-4 text-center sm:text-start text-xl md:text-2xl 2xl:text-4xl font-medium tracking-tight leading-none text-white dark:text-white">
              {title}
            </h1>
            <p className="hidden md:block mb-6 2xl:mb-8 text-base 2xl:text-lg font-normal text-gray-200">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-center">
              <Button size="md" color="danger" className="group">
                {textBtn}
                <ArrowRightIcon className="size-3.5 ms-2 rtl:rotate-180 group-hover:translate-x-2 group-hover:mr-2 transition-[margin,transform]" />
              </Button>
            </div>
          </div>
        </Link>
      </div>
      <Image
        priority
        quality={90}
        width={982}
        height={286}
        src={image}
        alt={title}
        className="absolute size-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-none lg:rounded-xl"
      />
    </div>
  );
};

export default RecomCarouselItem;
