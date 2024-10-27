import { Button, Card, CardBody, CardFooter, Chip } from "@nextui-org/react";

import { GUIDES } from "@/consts/guides";
import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import { DownloadIcon } from "@/modules/icons/action";
import { StarIcon } from "@/modules/icons/common";

export default function Guides() {
  return (
    <section className="flex flex-col items-center py-5 md:py-0 mt-12 md:my-0">
      <div className="w-full grid grid-cols-12 gap-4 px-2 md:px-0">
        {GUIDES.map((guide, index) => (
          <Card
            key={index}
            radius="sm"
            shadow="none"
            className="group col-span-12 sm:col-span-6 lg:col-span-4 bg-white dark:bg-dark/50 md:dark:bg-full-dark border border-gray-300 dark:border-dark md:dark:border-dark text-main dark:text-main-dark"
          >
            <CardBody className="z-10">
              <div className="relative inline-flex items-center justify-between w-full mb-3">
                <h2 className="text-xl font-semibold">{guide.title}</h2>
                <TooltipCTN content="Contenido recomendado">
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
                </TooltipCTN>
              </div>
              <p className="text-sm text-main-h dark:text-main-dark-h">
                {guide.description}
              </p>
            </CardBody>
            <CardFooter className="justify-end z-10 bg-gray-100 dark:bg-dark/50 border-t border-gray-200 dark:border-dark rounded-none">
              <Button
                as={"a"}
                download={guide.downloadTitle || undefined}
                href={guide.link}
                radius="sm"
                size="sm"
                endContent={<DownloadIcon className="size-4 " />}
                className="shadow-sm bg-white dark:bg-full-dark border border-gray-200 dark:border-dark font-medium text-sm text-main dark:text-main-dark"
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
