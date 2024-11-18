import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BetterTooltip } from "@/components/ui/tooltip";
import { GUIDES } from "@/consts/guides";
import { DownloadIcon } from "@/modules/icons/action";
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
    <section className="flex flex-col items-center pb-5 md:p-0">
      <div className="grid w-full grid-cols-12 gap-4">
        {GUIDES.map((guide, index) => (
          <Card
            key={index}
            className="group col-span-12 flex flex-col p-0 sm:col-span-6 lg:col-span-4"
          >
            <CardContent className="flex h-auto flex-auto flex-col p-3">
              <div className="relative mb-3 inline-flex w-full items-center justify-between">
                <h2 className="max-w-[80%] text-balance text-xl font-semibold">
                  {guide.title}
                </h2>
                <BetterTooltip content="Contenido recomendado">
                  {guide.recommended && (
                    <Badge className="bg-light-gradient px-3 py-0 dark:bg-dark-gradient-v2">
                      <StarIcon className="w-3 text-white" />
                    </Badge>
                  )}
                </BetterTooltip>
              </div>
              <p className="text-balance text-sm text-main-h dark:text-main-dark">
                {guide.description}
              </p>
            </CardContent>
            <CardFooter className="z-10 justify-end rounded-none border-t border-gray-200 bg-gray-100 p-3 dark:border-dark dark:bg-dark/50">
              <Button
                onClick={() => downloadFile(guide.link)}
                size="sm"
                radius="lg"
                className="border border-gray-200 bg-white text-sm font-medium text-main shadow-sm dark:border-dark dark:bg-full-dark dark:text-white"
              >
                Descargar
                <DownloadIcon className="size-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
