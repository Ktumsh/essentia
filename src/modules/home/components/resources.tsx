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
    })
  );
  return (
    <div className="flex size-full">
      <div className="w-full gap-4 md:gap-2 grid grid-cols-12 grid-rows-2">
        {itemId.map((item, index) => (
          <ResourcesItem
            key={index}
            index={index}
            title={item.title}
            subtitle={item.subtitle}
            img={item.image}
            href={item.href}
          >
            <q className="absolute top-5 left-5 max-w-[calc(100%-40px)] text-base sm:text-sm xl:text-base text-main dark:text-white font-normal dark:font-extralight opacity-0 lg:group-hover:opacity-100 invisible lg:group-hover:visible transition-opacity delay-200 duration-500">
              {item.quote}
            </q>
          </ResourcesItem>
        ))}
      </div>
    </div>
  );
};

export default Resources;
