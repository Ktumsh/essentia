import { ArrowDownToLine } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BetterTooltip } from "@/components/ui/tooltip";
import { GUIDES } from "@/consts/guides";
import { StarIcon } from "@/modules/icons/common";

export default function Guides() {
  const downloadFile = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="flex flex-col items-center">
      <div className="grid w-full grid-cols-12 gap-4">
        {GUIDES.map((guide, index) => (
          <Card
            key={index}
            className="group col-span-12 flex flex-col text-main shadow-none dark:text-white sm:col-span-6 lg:col-span-4"
          >
            <CardHeader isSecondary>
              <div className="inline-flex w-full items-start justify-between gap-2">
                <CardTitle className="text-lg">{guide.title}</CardTitle>
                <BetterTooltip content="Contenido recomendado">
                  {guide.recommended && (
                    <Badge className="cursor-help bg-light-gradient px-3 py-0 dark:bg-dark-gradient-v2">
                      <StarIcon className="w-3 text-white" />
                    </Badge>
                  )}
                </BetterTooltip>
              </div>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
            <CardFooter isSecondary className="!justify-end">
              <BetterTooltip content="Descargar PDF">
                <Button
                  onClick={() => downloadFile(guide.link)}
                  size="icon"
                  radius="lg"
                  variant="outline"
                  className="size-8"
                >
                  <span className="sr-only">Descargar</span>
                  <ArrowDownToLine className="!size-3.5" />
                </Button>
              </BetterTooltip>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
