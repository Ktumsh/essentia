import { Card, CardBody, Chip, Divider } from "@nextui-org/react";
import { Fragment } from "react";

import { Chevron } from "@/modules/icons/navigation";

const EmergencySteps = () => {
  const info = [
    {
      title: "¿Qué hacer ante una emergencia?",
      steps: [
        {
          step: 1,
          title: "Evalúa la situación",
          description: "Mantén la calma y analiza lo que sucede.",
          color: "bg-violet-600",
        },
        {
          step: 2,
          title: "Llama por ayuda",
          description:
            "Contacta a los servicios de emergencia o a quien pueda asistir.",
          color: "bg-violet-600",
        },
        {
          step: 3,
          title: "Sigue los pasos adecuados",
          description:
            "Actúa de manera segura, guiándote por las mejores prácticas para cada situación.",
          color: "bg-violet-600",
        },
      ],
    },
    {
      title: "Después de la emergencia",
      steps: [
        {
          step: 4,
          title: "Evalúa el Resultado",
          description: "Asegúrate de que la situación esté bajo control.",
          color: "bg-emerald-600",
        },
        {
          step: 5,
          title: "Reporte y Documentación",
          description: "Informa a las autoridades y registra lo sucedido.",
          color: "bg-emerald-600",
        },
        {
          step: 6,
          title: "Cuida tu Bienestar",
          description:
            "Tómate un momento para procesar lo ocurrido y cuida de tu salud emocional.",
          color: "bg-emerald-600",
        },
      ],
    },
  ];

  return (
    <section className="flex items-center justify-between w-full max-w-6xl md:mx-0 overflow-x-scroll scrollbar-hide">
      {info.map((card, index) => (
        <Fragment key={index}>
          <Card
            radius="sm"
            shadow="none"
            className="h-full min-w-[87%] md:min-w-0 max-w-lg my-5 bg-gray-100 md:bg-white dark:bg-dark/50 md:dark:bg-full-dark border border-gray-300 dark:border-dark md:dark:border-dark text-main-h dark:text-main-dark"
          >
            <CardBody className="z-10">
              <div className="inline-flex items-center justify-between w-full">
                <h3 className="text-lg md:text-xl font-semibold">
                  {card.title}
                </h3>
              </div>
              <Divider className="bg-gray-300 md:bg-gray-200 dark:bg-dark my-3" />
              <ol className="flex flex-col space-y-4">
                {card.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-sm">
                    <Chip
                      size="sm"
                      color="danger"
                      classNames={{
                        base: [
                          "!size-6 min-w-0 max-w-full justify-center mr-2",
                          step.color,
                        ],
                        content:
                          "flex justify-center drop-shadow shadow-black text-white font-bold",
                      }}
                    >
                      {step.step}
                    </Chip>
                    <span className="font-semibold mr-4 text-nowrap">
                      {step.title}
                    </span>

                    <p className="ml-8 text-main-h dark:text-main-dark-h">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
          {index < info.length - 1 && (
            <div className="motion-safe:animate-[pulse_4s_cubic-bezier(0.4,_0,_0.6,_1)_infinite]">
              <Chevron className="size-16 text-main-m dark:text-main-dark-m rotate-180" />
            </div>
          )}
        </Fragment>
      ))}
    </section>
  );
};

export default EmergencySteps;
