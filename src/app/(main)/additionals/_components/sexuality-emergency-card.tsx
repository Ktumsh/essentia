import { Badge } from "@/components/kit/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { ScrollArea } from "@/components/kit/scroll-area";
import { Separator } from "@/components/kit/separator";
import { SEXUALITY_EMERGENCY } from "@/consts/sexuality-emergency";

import SectionTitleWarning from "./section-title-warning";

const SexualityEmergencyCard = () => {
  return (
    <section className="mt-5 flex w-full flex-col">
      <SectionTitleWarning
        title="Emergencias de salud sexual"
        hash="emergencias-de-salud-sexual"
      />
      <div className="flex max-h-[700px] w-full">
        {SEXUALITY_EMERGENCY.map((cardInfo, index) => (
          <Card
            key={index}
            className="text-foreground dark:bg-accent/30 flex h-auto cursor-pointer flex-col bg-slate-50"
          >
            <CardHeader isSecondary>
              <CardTitle className="text-base md:text-lg">
                Emergencias de Salud Sexual
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col overflow-hidden p-0">
              <ScrollArea className="overflow-y-auto p-3 pr-5">
                <ol className="space-y-4">
                  {cardInfo.steps.map((step, stepIndex) => (
                    <li
                      key={stepIndex}
                      className="prose-sm space-y-1.5 text-start"
                    >
                      <ul className="inline-flex pl-0">
                        <Badge
                          variant="primary"
                          className="mr-2 flex size-6! max-w-full min-w-0 justify-center bg-pink-600! text-white! hover:bg-pink-600/80!"
                        >
                          {step.step}
                        </Badge>
                        <li className="mr-2 text-sm font-semibold text-nowrap md:text-base">
                          {step.title}
                        </li>
                      </ul>
                      {step.description.map((desc, i) => (
                        <p
                          key={i}
                          className="text-foreground/80 ml-8 space-y-1.5"
                        >
                          {desc.type === "bold" ? (
                            <strong className="text-foreground mr-2 font-semibold">
                              {desc.content}
                            </strong>
                          ) : (
                            desc.content
                          )}
                        </p>
                      ))}
                    </li>
                  ))}
                </ol>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SexualityEmergencyCard;
