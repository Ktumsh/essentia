import { ArrowDownToLine } from "lucide-react";

import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { BetterTooltip } from "@/components/kit/tooltip";
import { StarIcon } from "@/components/ui/icons/common";
import { GUIDES } from "@/consts/guides";

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
            className="group text-foreground col-span-12 flex flex-col shadow-none sm:col-span-6 lg:col-span-4"
          >
            <CardHeader isSecondary>
              <div className="inline-flex w-full items-start justify-between gap-2">
                <CardTitle className="text-lg">{guide.title}</CardTitle>
                <BetterTooltip content="Contenido recomendado">
                  {guide.recommended && (
                    <Badge className="from-gradient-from via-gradient-via to-gradient-to cursor-help bg-gradient-to-r px-3 py-1 dark:from-[-100%]">
                      <StarIcon className="w-3 text-white" />
                    </Badge>
                  )}
                </BetterTooltip>
              </div>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
            <CardFooter isSecondary className="justify-end!">
              <BetterTooltip content="Descargar PDF">
                <Button
                  onClick={() => downloadFile(guide.link)}
                  size="icon"
                  variant="outline"
                  className="bg-background size-8"
                >
                  <span className="sr-only">Descargar</span>
                  <ArrowDownToLine className="size-3.5!" />
                </Button>
              </BetterTooltip>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
