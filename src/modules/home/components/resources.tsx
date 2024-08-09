import { RESOURCES } from "@/consts/resources";
import ResourcesItem from "./resources-item";

const Resources = () => {
  const itemId = RESOURCES.map(({ title, quote, image, resource, span }) => ({
    title,
    quote,
    image,
    href: `/${resource}`,
    span,
  }));
  return (
    <div className="flex size-full">
      <div className="w-full gap-2 grid grid-cols-12 grid-rows-2">
        {itemId.map((item, index) => (
          <ResourcesItem
            key={index}
            class={`col-span-12 sm:col-span-6 ${item.span}`}
            title={item.title}
            img={item.image}
            alt={`Enlace al recurso de ${item.title}`}
            href={item.href}
          >
            <q className="absolute top-5 left-5 max-w-[calc(100%-40px)] text-base sm:text-sm xl:text-base text-base-color dark:text-white font-normal dark:font-extralight opacity-0 lg:group-hover:opacity-100 invisible lg:group-hover:visible transition-opacity delay-200 duration-500">
              {item.quote}
            </q>
          </ResourcesItem>
        ))}
      </div>
    </div>
  );
};

export default Resources;
