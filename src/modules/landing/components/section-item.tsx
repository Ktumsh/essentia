import { Image } from "@nextui-org/react";

type Props = {
  wrapper: string;
  inner: string;
  sectionName: string;
  title: string;
  description: string;
  img: string;
  imgAlt: string;
};

const SectionItem = ({
  wrapper,
  inner,
  sectionName,
  title,
  description,
  img,
  imgAlt,
}: Props) => {
  return (
    <div
      className={`
        ${wrapper}
        relative flex
        items-center
        justify-between
        w-full px-4 pt-8 sm:pt-14
        lg:pt-4 pb-4 bg-bento-gradient
        backdrop-blur-2xl
        shadow-bento-shadow
        rounded-[60px] z-10`}
    >
      <div className="bg-noise bg-repeat bg-[length:100px] pointer-events-none absolute inset-0 opacity-5 rounded-[60px] z-10"></div>
      <div
        className={`
           ${inner}
           relative flex flex-col
           [flex-flow:column]
           w-full gap-10 gap-x-14
           text-base-color`}
      >
        <div className="relative flex-[0_auto] self-center w-auto lg:w-full lg:max-w-md mx-2 sm:mx-10 lg:mx-0">
          <div className="group relative inline-flex overflow-hidden text-sm uppercase self-start lg:self-center font-semibold mb-4 px-4 py-1 rounded-full text-white bg-light-gradient">
            <span>{sectionName}</span>
            <div className="animate-shine-infinite absolute inset-0 top-[-20px] flex h-[calc(100%+40px)] w-full justify-center blur-md">
              <div className="relative h-full w-8 bg-white/30"></div>
            </div>
          </div>
          <h2 className="font-grotesk font-extrabold text-3xl sm:text-5xl mb-5 w-full">
            {title}
          </h2>
          <p className="max-full mx-auto text-lg sm:text-2xl leading-normal">
            {description}
          </p>
        </div>
        <div className="relative flex items-center justify-center flex-[0_auto] w-full shadow-xl rounded-[50px]">
          <div className="aspect-auto size-full lg:min-h-[600px] lg:max-w-3xl rounded-[50px] overflow-hidden">
            <Image
              removeWrapper
              className="size-full object-cover"
              loading="lazy"
              src={img}
              alt={imgAlt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionItem;
