import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
} from "@nextui-org/react";
import { StarIcon } from "@/modules/icons/common";
import TooltipCTN from "@/modules/core/components/ui/tooltip-ctn";
import { DownloadIcon } from "@radix-ui/react-icons";
import { GUIDES } from "@/consts/guides";
import { useGlowingEffect } from "../hooks/use-glowing-effect";

export default function Guides() {
  const { handleMouseMove, setRef } = useGlowingEffect();

  return (
    <section className="flex flex-col items-center py-5 md:py-0 mb-14 mt-12 md:my-0">
      <div className="w-full grid grid-cols-12 gap-2 px-3 md:px-0">
        {GUIDES.map((guide, index) => (
          <Card
            key={index}
            ref={(el) => setRef(el, index)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            className="card group col-span-12 sm:col-span-4 bg-white dark:bg-base-full-dark dark:border dark:border-base-dark text-base-color dark:text-base-color-dark"
            style={
              {
                "--clr": "#f2709c",
                "--clr-dark": "#ff7373",
              } as React.CSSProperties
            }
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
            <Divider className="w-auto mx-3 bg-gray-200 dark:bg-base-dark z-10" />
            <CardFooter className="justify-end z-10">
              <Button
                as={"a"}
                download={guide.downloadTitle || undefined}
                href={guide.link}
                size="sm"
                variant="flat"
                color="danger"
                endContent={<DownloadIcon className="w-3" />}
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
