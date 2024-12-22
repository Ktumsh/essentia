import { RESOURCES } from "@/consts/resources";

import ResourcesItem from "./resources-item";

const Resources = () => {
  const itemId = RESOURCES.map(
    ({ title, subtitle, quote, image, resource }) => ({
      title,
      subtitle,
      quote,
      image,
      href: `/recursos/${resource}`,
    }),
  );
  return (
    <div className="flex size-full">
      <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {itemId.map((item, index) => (
          <ResourcesItem
            key={index}
            index={index}
            title={item.title}
            subtitle={item.subtitle}
            quote={item.quote}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
};

export default Resources;
