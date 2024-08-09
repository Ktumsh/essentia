import { Button, Card, Chip, Tooltip } from "@nextui-org/react";

import Link from "next/link";
import { tooltipStyles } from "@/styles/tooltip-styles";
import { StarIcon } from "@/modules/icons/common";
import { DownloadIcon } from "@/modules/icons/action";

export default function Guides() {
  const guides = [
    {
      title: "Guía de primeros auxilios",
      description:
        "Recurso destacado que proporciona una guía descriptiva y enlaces a videos instructivos RCP, maniobra de Heimlich y otros procedimientos de emergencias.",
      downloadTitle: "Guía-Primeros-Auxilios-2024",
      link: "/pdf/Guia-Primeros-Auxilios-2024.pdf",
      recommended: true,
    },
    {
      title: "Guía de sueño y descanso",
      description:
        "Información sobre la importancia del sueño, técnicas para mejorar la calidad del sueño y hábitos para lograr un descanso óptimo.",
      downloadTitle: "",
      link: "",
      recommended: false,
    },
    {
      title: "Guía de meditación para reducir el estrés",
      description:
        "Técnicas de meditación, información sobre sus beneficios para la reducción del estrés y cómo integrarla en la vida diaria.",
      downloadTitle: "",
      link: "",
      recommended: true,
    },
    {
      title: "Guía de alimentación saludable en el trabajo",
      description:
        "Consejos sobre cómo mantener una dieta balanceada y saludable mientras se trabaja, con recomendaciones de comidas rápidas y saludables.",
      downloadTitle: "",
      link: "",
      recommended: false,
    },
    {
      title: "Guía de yoga para principiantes",
      description:
        "Detalles sobre posturas básicas, técnicas de respiración y sus beneficios para la salud mental y física.",
      downloadTitle: "",
      link: "",
      recommended: false,
    },
    {
      title: "Guía para situaciones de emergencia",
      description:
        "Una guía esencial que proporciona información y pasos a seguir en situaciones de emergencia para brindar primeros auxilios en el hogar.",
      downloadTitle: "",
      link: "",
      recommended: true,
    },
  ];
  return (
    <section className="flex flex-col items-center justify-centersize-full">
      <div className="w-full grid grid-cols-12 grid-rows-12 gap-5">
        {guides.map((guide, index) => (
          <Card
            key={index}
            className="relative size-full bg-white/50 dark:bg-base-full-dark-50 border border-gray-100/50 dark:border-base-full-dark-50 backdrop-blur backdrop-saturate-150 shadow-md rounded-xl col-span-12 sm:col-span-6 row-span-4 text-base-color-h dark:text-base-color-dark !transition-none"
          >
            <div className="bg-noise bg-repeat bg-[length:100px] pointer-events-none absolute inset-0 opacity-5 rounded-xl z-10"></div>
            <div className="flex flex-col size-full items-center justify-center">
              <div className="flex flex-col size-full items-center justify-between px-6 pt-6 pb-2">
                <div className="inline-flex items-center justify-between w-full mb-3">
                  <h2 className="text-2xl font-bold">{guide.title}</h2>
                  <Tooltip
                    content="Contenido recomendado"
                    delay={500}
                    closeDelay={0}
                    classNames={{
                      content: tooltipStyles.content,
                    }}
                  >
                    {guide.recommended && (
                      <Chip
                        variant="shadow"
                        classNames={{
                          base: "w-12 max-w-full justify-center bg-light-gradient dark:bg-dark-gradient-v2",
                          content: "flex justify-center",
                        }}
                      >
                        <StarIcon className="w-4 text-white" />
                      </Chip>
                    )}
                  </Tooltip>
                </div>
                <p className="text-base-color-h dark:text-base-color-dark-h">
                  {guide.description}
                </p>
              </div>
              <div className="w-full h-[72px] pt-3 pb-6 px-6 bg-white dark:bg-base-dark z-10">
                <div className="flex w-full items-center">
                  <Button
                    size="md"
                    variant="flat"
                    color="danger"
                    radius="sm"
                    className="px-0"
                  >
                    <Link
                      download={guide.downloadTitle || undefined}
                      href={guide.link}
                      className="flex items-center justify-center size-full gap-2 px-4"
                    >
                      <span className="">Descargar guía</span>
                      <span>
                        <DownloadIcon className="w-7" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
