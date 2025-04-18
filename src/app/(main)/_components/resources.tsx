import { RESOURCES_DATA } from "@/consts/resources-data";

import ResourcesItem from "./resources-item";

const Resources = () => {
  const itemId = RESOURCES_DATA.map(
    ({ title, subtitle, quote, image, route }) => ({
      title,
      subtitle,
      quote,
      image,
      href: `/${route}`,
    }),
  );
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
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
  );
};

export default Resources;
