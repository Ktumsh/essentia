import { RESOURCES } from "@/consts/resources";

import ResourcesItem from "./resources-item";

const Resources = () => {
  const itemId = RESOURCES.map(
    ({ title, subtitle, quote, image, resource }) => ({
      title,
      subtitle,
      quote,
      image,
      href: `/${resource}`,
    }),
  );
  return (
    <div className="flex size-full">
      <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-2">
        {itemId.map((item, index) => (
          <ResourcesItem
            key={index}
            index={index}
            title={item.title}
            subtitle={item.subtitle}
            img={item.image}
            href={item.href}
          >
            <q className="invisible absolute left-5 top-5 max-w-[calc(100%-40px)] text-base font-normal text-main opacity-0 transition-opacity delay-200 duration-500 dark:font-extralight dark:text-white sm:text-sm lg:group-hover:visible lg:group-hover:opacity-100 xl:text-base">
              {item.quote}
            </q>
          </ResourcesItem>
        ))}
      </div>
    </div>
  );
};

export default Resources;
