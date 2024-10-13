import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
} from "@nextui-org/react";
import { StarIcon } from "@/modules/icons/common";
import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import { GUIDES } from "@/consts/guides";
import { DownloadIcon } from "@/modules/icons/action";

export default function Guides() {
  return (
    <section className="flex flex-col items-center py-5 pb-5 md:pb-0 md:py-0 mt-12 md:my-0">
      <div className="w-full grid grid-cols-12 gap-4 px-2 md:px-0">
        {GUIDES.map((guide, index) => (
          <Card
            key={index}
            radius="sm"
            className="shadow-none md:shadow-md group col-span-12 sm:col-span-6 lg:col-span-4 bg-white dark:bg-base-dark-50 md:dark:bg-base-full-dark border border-gray-300 md:border-gray-200 dark:border-base-dark md:dark:border-base-dark text-base-color dark:text-base-color-dark"
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
              <p className="text-sm text-base-color-h dark:text-base-color-dark-h">
                {guide.description}
              </p>
            </CardBody>
            <CardFooter className="justify-end z-10 bg-gray-100 dark:bg-base-dark-50 border-t border-gray-200 dark:border-base-dark rounded-none">
              <Button
                as={"a"}
                download={guide.downloadTitle || undefined}
                href={guide.link}
                radius="sm"
                size="sm"
                endContent={<DownloadIcon className="size-4 " />}
                className="shadow-sm bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark font-medium text-sm text-base-color dark:text-base-color-dark"
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
