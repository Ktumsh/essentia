import { SearchIcon } from "@/modules/icons/action";
import { Button } from "@nextui-org/react";

const Aside = () => {
  const trends = [
    {
      category: "Salud Mental",
      topic: "Estrategias para Reducir el Estrés",
      posts: "8.842 posts",
    },
    {
      category: "Nutrición",
      topic: "Dietas Equilibradas",
      posts: "12.7K posts",
    },
    {
      category: "Ejercicio",
      topic: "Rutinas de Ejercicio en Casa",
      posts: "2.100 posts",
    },
    {
      category: "Bienestar",
      topic: "Meditación y Mindfulness",
      posts: "22.5K posts",
    },
    {
      category: "Salud General",
      topic: "Importancia del Sueño",
      posts: "5.467 posts",
    },
    {
      category: "Salud Reproductiva",
      topic: "Cuidado de la Salud Reproductiva",
      posts: "296 posts",
    },
  ];

  return (
    <aside className="hidden lg:block sticky top-0 right-0 grow p-2 w-full max-w-[350px] max-h-dvh mr-16 text-base-color dark:text-base-color-dark">
      <form className="relative w-full mb-3">
        <div className="flex items-center bg-white dark:bg-base-dark rounded-full">
          <div className="flex w-11 text-base-color-m dark:text-base-color-dark-m pointer-events-none">
            <SearchIcon className="ml-5 size-5" />
          </div>
          <input
            type="text"
            placeholder="Buscar"
            className="w-full h-11 px-5 bg-transparent text-sm placeholder:text-base-color-m dark:placeholder:-text-base-color-dark-m outline-none ring-0 border-0 focus:outline-none focus:ring-0"
          />
        </div>
      </form>
      <div className="mb-6 bg-white/50 bg-bento-gradient dark:bg-none dark:bg-transparent border border-gray-100/50 dark:border-base-dark backdrop-blur dark:backdrop-blur-none backdrop-saturate-150 dark:backdrop-saturate-100 shadow-md dark:shadow-none text-base-color dark:text-base-color-dark rounded-xl overflow-hidden">
        <div className="w-full px-4 py-3">
          <h3 className="text-xl font-black text-base-color dark:text-white">
            Tendencias para ti
          </h3>
        </div>
        {trends.map((trend, index) => (
          <Button
            className="flex-col items-start h-full py-3 data-[pressed=true]:scale-100"
            color="danger"
            key={index}
            radius="none"
            variant="light"
            fullWidth
          >
            <p className="text-base-color-m dark:text-base-color-dark-m text-sm">
              {trend.category}
            </p>
            <p className="text-base-color dark:text-base-color-dark font-semibold">
              {trend.topic}
            </p>
            <p className="text-base-color-m dark:text-base-color-dark-m  text-sm">
              {trend.posts}
            </p>
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default Aside;
