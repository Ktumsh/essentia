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
    <section className="mt-5 flex w-full flex-col text-main-h dark:text-main-dark">
      <div className="mb-2 self-start">
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
            <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-data-[hover=true]:opacity-100" />
          }
          className="h-auto w-fit gap-0 bg-transparent p-0 text-xl font-semibold data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
        >
          <Chip
            color="danger"
            startContent={<ExclamationTriangleIcon className="ml-2 size-3" />}
          >
            <h3>Emergencias de salud sexual</h3>
          </Chip>
        </Button>
      </div>
      <div className="flex max-h-[700px] w-full">
        {info.map((cardInfo, index) => (
          <Card
            key={index}
            radius="sm"
            shadow="none"
            className="border border-gray-200 bg-gray-100 text-main-h dark:border-dark dark:bg-dark/50 dark:text-main-dark md:bg-white md:dark:border-dark md:dark:bg-full-dark"
          >
            <CardBody className="z-10 overflow-hidden">
              <div className="inline-flex w-full items-center justify-between">
                <h3 className="text-lg font-semibold md:text-xl">
                  Emergencias de Salud Sexual
                </h3>
              </div>
              <Divider className="my-3 bg-gray-300 dark:bg-dark md:bg-gray-200" />
              <ol className="custom-scroll flex flex-col space-y-4 overflow-y-auto hover:scrollbar-default md:scrollbar-hide">
                {cardInfo.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="space-y-1.5 text-sm">
                    <ul className="inline-flex">
                      <Chip
                        size="sm"
                        color="danger"
                        classNames={{
                          base: [
                            chipColors.card,
                            "shadow-cerise-red-400/40",
                            "!size-6 min-w-0 max-w-full justify-center mr-2 bg-cyan-500 border border-black/10 dark:border-white/10",
                          ],
                          content: "text-white font-bold",
                        }}
                      >
                        {step.step}
                      </Chip>
                      <li className="mr-2 text-nowrap text-base font-semibold">
                        {step.title}
                      </li>
                    </ul>
                    <ul className="ml-8 space-y-1.5 text-main-h dark:text-main-dark-h">
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
