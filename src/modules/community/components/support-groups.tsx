import { Image } from "@nextui-org/react";

const SupportGroups = () => {
  const groups = [
    {
      name: "Grupo de Apoyo para la Ansiedad",
      description:
        "Un espacio seguro para compartir y aprender sobre la ansiedad.",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Ansiedad",
      members: "1.2K miembros",
    },
    {
      name: "Grupo de Apoyo para la Depresión",
      description: "Encuentra apoyo y recursos para manejar la depresión.",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Depresión",
      members: "950 miembros",
    },
    {
      name: "Grupo de Apoyo para Cuidadores",
      description: "Conecta con otros cuidadores y comparte experiencias.",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Cuidadores",
      members: "800 miembros",
    },
    {
      name: "Grupo de Apoyo para el Estrés",
      description: "Estrategias y técnicas para manejar el estrés diario.",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Estrés",
      members: "1.5K miembros",
    },
    {
      name: "Grupo de Apoyo para la Autoestima",
      description: "Mejora tu autoestima y confianza personal.",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Autoestima",
      members: "700 miembros",
    },
    {
      name: "Grupo de Apoyo para Trastornos Alimentarios",
      description:
        "Recibe apoyo para enfrentar y superar trastornos alimentarios.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Trastornos+Alimentarios",
      members: "600 miembros",
    },
    {
      name: "Grupo de Apoyo para la Pérdida y el Duelo",
      description: "Encuentra consuelo y apoyo durante el proceso de duelo.",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Pérdida+y+Duelo",
      members: "500 miembros",
    },
    {
      name: "Grupo de Apoyo para la Salud Mental de Jóvenes",
      description: "Espacio para jóvenes que buscan mejorar su salud mental.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Salud+Mental+Jóvenes",
      members: "1.1K miembros",
    },
    {
      name: "Grupo de Apoyo para el Autismo",
      description:
        "Recibe apoyo y recursos para manejar los desafíos del autismo.",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Autismo",
      members: "750 miembros",
    },
    {
      name: "Grupo de Apoyo para el TDAH",
      description: "Conecta con otros que comparten experiencias con el TDAH.",
      imageUrl: "https://via.placeholder.com/800x400.png?text=TDAH",
      members: "680 miembros",
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold px-4 mb-6">Grupos de Apoyo</h2>
      <div className="bg-white/50 bg-bento-gradient dark:bg-none dark:bg-transparent border-y-1 border-gray-100/50 dark:border-base-dark backdrop-blur dark:backdrop-blur-none backdrop-saturate-150 dark:backdrop-saturate-100 shadow-md dark:shadow-none text-base-color dark:text-base-color-dark">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {groups.map((group, index) => (
            <div
              key={index}
              className="group px-4 py-6 border-t-1 [&:nth-child(-n+2)]:border-t-0 border-r-1 even:border-r-0 border-white dark:border-base-dark"
            >
              <Image
                src={group.imageUrl}
                alt={group.name}
                classNames={{
                  wrapper: "!max-w-full",
                }}
                className="w-full h-32 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{group.name}</h3>
              <p className="text-gray-800 dark:text-gray-300 mb-2">
                {group.description}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                {group.members}
              </p>
              <button className="text-blue-500 hover:text-blue-700">
                Únete al grupo
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SupportGroups;
