import { Card, CardBody, Chip, Divider } from "@nextui-org/react";
import { useGlowingEffect } from "../hooks/use-glowing-effect";
import { Chevron } from "@/modules/icons/navigation";
import { Fragment } from "react";
import { generateChipColors } from "../lib/utils";

const EmergencySteps = () => {
  const { handleMouseMove, setRef } = useGlowingEffect();

  const info = [
    {
      title: "¿Qué hacer ante una emergencia?",
      steps: [
        {
          step: 1,
          title: "Evalúa la situación",
          description: "Mantén la calma y analiza lo que sucede.",
        },
        {
          step: 2,
          title: "Llama por ayuda",
          description:
            "Contacta a los servicios de emergencia o a quien pueda asistir.",
        },
        {
          step: 3,
          title: "Sigue los pasos adecuados",
          description:
            "Actúa de manera segura, guiándote por las mejores prácticas para cada situación.",
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
        },
        {
          step: 5,
          title: "Reporte y Documentación",
          description: "Informa a las autoridades y registra lo sucedido.",
        },
        {
          step: 6,
          title: "Cuida tu Bienestar",
          description:
            "Tómate un momento para procesar lo ocurrido y cuida de tu salud emocional.",
        },
      ],
    },
  ];

  const colors = [
    { clr: "#a855f7", clrDark: "#a855f7" },
    { clr: "#16a34a", clrDark: "#16a34a" },
  ];

  const chipColors = {
    firstCard: generateChipColors("from-purple-500 to-indigo-500", 3),
    secondCard: generateChipColors(
      "from-green-400 to-lime-700 dark:from-green-600 dark:to-lime-900",
      3
    ),
  };

  return (
    <section className="flex items-center w-full pr-6 md:pr-0 mx-3 md:mx-0 mb-5 overflow-x-auto scrollbar-hide">
      {info.map((card, index) => (
        <Fragment key={index}>
          <Card
            ref={(el) => setRef(el, index)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            className="card h-full min-w-[87%] md:min-w-0 max-w-lg bg-white dark:bg-base-full-dark dark:border dark:border-base-dark text-base-color-h dark:text-base-color-dark"
            style={
              {
                "--clr": colors[index % colors.length].clr,
                "--clr-dark": colors[index % colors.length].clrDark,
              } as React.CSSProperties
            }
          >
            <CardBody className="z-10">
              <div className="inline-flex items-center justify-between w-full">
                <h3 className="text-xl font-semibold">{card.title}</h3>
              </div>
              <Divider className="bg-gray-200 dark:bg-base-dark my-3" />
              <ol className="flex flex-col space-y-4">
                {card.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-sm">
                    <Chip
                      size="sm"
                      variant="shadow"
                      color="danger"
                      classNames={{
                        base: [
                          index === 0
                            ? chipColors.firstCard[stepIndex]
                            : chipColors.secondCard[stepIndex],
                          index === 0
                            ? "shadow-purple-500/40"
                            : "shadow-green-600/40",
                          "!size-6 min-w-0 max-w-full justify-center mr-2 bg-gradient-to-br",
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

                    <p className="ml-8 text-base-color-h dark:text-base-color-dark-h">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
          {index < info.length - 1 && (
            <div className="motion-safe:animate-[pulse_4s_cubic-bezier(0.4,_0,_0.6,_1)_infinite]">
              <Chevron className="size-16 text-base-color-m dark:text-base-color-dark-m rotate-180" />
            </div>
          )}
        </Fragment>
      ))}
    </section>
  );
};

export default EmergencySteps;
