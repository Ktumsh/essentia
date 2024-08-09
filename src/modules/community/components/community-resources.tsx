import { Image } from "@nextui-org/react";
import Link from "next/link";

const CommunityResources = () => {
  const resources = [
    {
      title: "Centro de Salud Local",
      description:
        "Encuentra tu centro de salud más cercano y accede a servicios de salud esenciales.",
      link: "#",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Centro+de+Salud+Local",
    },
    {
      title: "Grupos de Apoyo en tu Área",
      description:
        "Únete a grupos de apoyo locales para compartir experiencias y obtener apoyo.",
      link: "#",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Grupos+de+Apoyo",
    },
    {
      title: "Clases de Bienestar",
      description: "Participa en clases de bienestar y salud en tu comunidad.",
      link: "#",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Clases+de+Bienestar",
    },
    {
      title: "Programas de Nutrición",
      description:
        "Accede a programas de nutrición para mejorar tu dieta y salud.",
      link: "#",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Programas+de+Nutrición",
    },
    {
      title: "Recursos de Salud Mental",
      description:
        "Encuentra recursos para apoyo en salud mental en tu comunidad.",
      link: "#",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Salud+Mental",
    },
    {
      title: "Talleres de Manejo del Estrés",
      description: "Aprende técnicas de manejo del estrés en talleres locales.",
      link: "#",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Manejo+del+Estrés",
    },
    {
      title: "Centros de Rehabilitación",
      description: "Encuentra centros de rehabilitación cerca de ti.",
      link: "#",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Centros+de+Rehabilitación",
    },
    {
      title: "Programas de Ejercicio",
      description: "Participa en programas de ejercicio y mantente activo.",
      link: "#",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Programas+de+Ejercicio",
    },
    {
      title: "Recursos de Educación Sexual",
      description: "Accede a recursos educativos sobre salud sexual.",
      link: "#",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Educación+Sexual",
    },
    {
      title: "Apoyo para Personas Mayores",
      description:
        "Encuentra recursos y apoyo para personas mayores en tu comunidad.",
      link: "#",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Apoyo+para+Personas+Mayores",
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold px-4 mb-6">Recursos Comunitarios</h2>
      <div className="bg-white/50 bg-bento-gradient dark:bg-none dark:bg-transparent border-y-1 border-gray-100/50 dark:border-base-dark backdrop-blur dark:backdrop-blur-none backdrop-saturate-150 dark:backdrop-saturate-100 shadow-md dark:shadow-none text-base-color dark:text-base-color-dark">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="group px-4 py-6 border-t-1 [&:nth-child(-n+2)]:border-t-0 border-r-1 even:border-r-0 border-white dark:border-base-dark"
            >
              <Image
                src={resource.imageUrl}
                alt={resource.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <div className="px-4 pb-4">
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="mb-2">{resource.description}</p>
                <Link
                  href={resource.link}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Más información
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommunityResources;
