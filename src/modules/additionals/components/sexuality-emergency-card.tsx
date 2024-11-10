import { Chip, Card, CardBody, Divider, Button } from "@nextui-org/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { SEXUALITY_EMERGENCY } from "@/consts/sexuality-emergency";
import { HashIcon } from "@/modules/icons/common";

const SexualityEmergencyCard = () => {
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
        {SEXUALITY_EMERGENCY.map((cardInfo, index) => (
          <Card
            key={index}
            radius="sm"
            shadow="none"
            className="border border-gray-200 bg-gray-100 text-main dark:border-dark dark:bg-dark/50 dark:text-white"
          >
            <CardBody className="z-10 overflow-hidden">
              <div className="inline-flex w-full items-center justify-between">
                <h3 className="text-lg font-semibold md:text-xl">
                  Emergencias de Salud Sexual
                </h3>
              </div>
              <Divider className="my-3 bg-gray-300 dark:bg-accent-dark" />
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
                            <strong className="mr-2 text-main dark:text-white">
                              {desc.content}
                            </strong>
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
