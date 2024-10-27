import { Chip, Card, CardBody, Divider, Button } from "@nextui-org/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { HashIcon } from "@/modules/icons/common";

const SexualityEmergencyCard = () => {
  const info = [
    {
      title: "Emergencias de Salud Sexual",
      steps: [
        {
          step: 1,
          title: "Reconocer la emergencia",
          description: [
            {
              type: "bold",
              content: "Violencia Sexual:",
            },
            {
              type: "text",
              content:
                " Si tú o alguien más ha sido víctima de violencia sexual, busca ayuda inmediatamente.",
            },
            {
              type: "bold",
              content: "Infecciones de Transmisión Sexual (ITS):",
            },
            {
              type: "text",
              content:
                " Síntomas como dolor, secreciones inusuales, erupciones, o llagas pueden ser signos de una ITS que requiere atención urgente.",
            },
            {
              type: "bold",
              content: "Reacción alérgica a métodos anticonceptivos:",
            },
            {
              type: "text",
              content:
                " Si experimentas dificultad para respirar, hinchazón severa o erupciones, busca atención médica de inmediato.",
            },
          ],
        },
        {
          step: 2,
          title: "Qué hacer",
          description: [
            {
              type: "bold",
              content: "Busca ayuda profesional:",
            },
            {
              type: "text",
              content:
                " Contacta a un médico, clínica de salud sexual, o servicio de emergencia local.",
            },
            {
              type: "bold",
              content: "Evita el auto diagnóstico:",
            },
            {
              type: "text",
              content:
                " No te automediques sin la orientación de un profesional.",
            },
            {
              type: "bold",
              content: "Acceso a profilaxis postexposición (PEP):",
            },
            {
              type: "text",
              content:
                " Si crees que has estado expuesto al VIH, es esencial iniciar la PEP dentro de las 72 horas posteriores a la exposición.",
            },
          ],
        },
        {
          step: 3,
          title: "Recursos de emergencia",
          description: [
            {
              type: "bold",
              content: "Línea de apoyo:",
            },
            {
              type: "text",
              content:
                " Contacta a la línea nacional de apoyo para víctimas de violencia sexual o salud sexual.",
            },
            {
              type: "bold",
              content: "Centros de atención:",
            },
            {
              type: "text",
              content:
                " Identifica el centro de salud sexual o sala de emergencias más cercano.",
            },
            {
              type: "bold",
              content: "Acceso a anticoncepción de emergencia:",
            },
            {
              type: "text",
              content:
                " Si necesitas anticoncepción de emergencia, consulta a un profesional de salud o acude a una farmacia.",
            },
          ],
        },
        {
          step: 4,
          title: "Prevención a futuro",
          description: [
            {
              type: "bold",
              content: "Consulta regular:",
            },
            {
              type: "text",
              content:
                " Mantén chequeos regulares con tu profesional de salud para monitorear tu bienestar sexual.",
            },
            {
              type: "bold",
              content: "Educación:",
            },
            {
              type: "text",
              content:
                " Infórmate sobre los métodos de prevención de ITS y violencia sexual.",
            },
            {
              type: "bold",
              content: "Apoyo psicológico:",
            },
            {
              type: "text",
              content:
                " Si has pasado por una emergencia de salud sexual, busca apoyo psicológico para ayudar en tu recuperación emocional.",
            },
          ],
        },
      ],
    },
  ];

  const chipColors = {
    card: "from-cerise-red-500 to-cerise-red-700",
  };

  return (
    <section className="flex flex-col w-full mt-5 text-main-h dark:text-main-dark">
      <div className="self-start mb-2">
        <Button
          as={Link}
          id="emergencias-de-salud-sexual"
          data-id="emergencias-de-salud-sexual"
          data-name="Emergencias de salud sexual"
          href="#emergencias-de-salud-sexual"
          disableRipple
          radius="none"
          variant="flat"
          endContent={
            <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
          }
          className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
        >
          <Chip
            color="danger"
            startContent={<ExclamationTriangleIcon className="size-3 ml-2" />}
          >
            <h3>Emergencias de salud sexual</h3>
          </Chip>
        </Button>
      </div>
      <div className="flex w-full">
        {info.map((cardInfo, index) => (
          <Card
            key={index}
            radius="sm"
            className="shadow-none md:shadow-md bg-gray-100 md:bg-white dark:bg-dark/50 md:dark:bg-full-dark border border-gray-300 md:border-gray-200 dark:border-dark md:dark:border-dark text-main-h dark:text-main-dark"
          >
            <CardBody className="z-10">
              <div className="inline-flex items-center justify-between w-full">
                <h3 className="text-lg md:text-xl font-semibold">
                  Emergencias de Salud Sexual
                </h3>
              </div>
              <Divider className="bg-gray-300 md:bg-gray-200 dark:bg-dark my-3" />
              <ol className="flex flex-col space-y-4">
                {cardInfo.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-sm space-y-1.5">
                    <ul className="inline-flex">
                      <Chip
                        size="sm"
                        color="danger"
                        classNames={{
                          base: [
                            chipColors.card,
                            "shadow-cerise-red-400/40",
                            "!size-6 min-w-0 max-w-full justify-center mr-2 bg-gradient-to-br border border-black/10 dark:border-white/10",
                          ],
                          content:
                            "drop-shadow shadow-black text-white font-bold",
                        }}
                      >
                        {step.step}
                      </Chip>
                      <li className="text-base font-semibold mr-2 text-nowrap">
                        {step.title}
                      </li>
                    </ul>
                    <ul className="ml-8 text-main-h dark:text-main-dark-h space-y-1.5">
                      {step.description.map((desc, i) => (
                        <li key={i}>
                          {desc.type === "bold" ? (
                            <strong className="mr-2">{desc.content}</strong>
                          ) : (
                            desc.content
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SexualityEmergencyCard;
