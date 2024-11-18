import { Button, Card, CardBody, CardFooter, Chip } from "@nextui-org/react";

import { BetterTooltip } from "@/components/ui/tooltip";
import { GUIDES } from "@/consts/guides";
import { DownloadIcon } from "@/modules/icons/action";
import { StarIcon } from "@/modules/icons/common";

export default function Guides() {
  return (
    <section className="flex flex-col items-center pb-5 md:p-0">
      <div className="grid w-full grid-cols-12 gap-4">
        {GUIDES.map((guide, index) => (
          <Card
            key={index}
            radius="sm"
            shadow="none"
            className="group col-span-12 border border-gray-200 bg-white text-main dark:border-dark dark:bg-full-dark dark:text-white sm:col-span-6 md:dark:border-dark lg:col-span-4"
          >
            <CardBody className="z-10">
              <div className="relative mb-3 inline-flex w-full items-center justify-between">
                <h2 className="text-xl font-semibold">{guide.title}</h2>
                <BetterTooltip content="Contenido recomendado">
                  {guide.recommended && (
                    <Chip
                      size="sm"
                      variant="shadow"
                      classNames={{
                        base: "bg-light-gradient dark:bg-dark-gradient-v2",
                      }}
                    >
                      <StarIcon className="w-3 text-white" />
                    </Chip>
                  )}
                </BetterTooltip>
              </div>
              <p className="text-sm text-main-h dark:text-main-dark">
                {guide.description}
              </p>
            </CardBody>
            <CardFooter className="z-10 justify-end rounded-none border-t border-gray-200 bg-gray-100 dark:border-dark dark:bg-dark/50">
              <Button
                as={"a"}
                download={guide.downloadTitle || undefined}
                href={guide.link}
                radius="sm"
                size="sm"
                endContent={<DownloadIcon className="size-4" />}
                className="border border-gray-200 bg-white text-sm font-medium text-main shadow-sm dark:border-dark dark:bg-full-dark dark:text-white"
              >
                Descargar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
