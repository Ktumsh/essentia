import {
  AlertTriangle,
  BriefcaseMedical,
  Pill,
  Stethoscope,
  Syringe,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/kit/accordion";
import { Badge } from "@/components/kit/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { MEDICINE_COLOR, MEDICINE_DATA } from "@/db/data/medicine-data";
import { cn } from "@/lib/utils";

import SectionTitleWarning from "../../_components/section-title-warning";

const Medicines = () => {
  return (
    <section className="mt-5 flex flex-col">
      <SectionTitleWarning
        title="Medicamentos para un botiquín"
        hash="medicamentos-para-un-botiquin"
        color="text-blue-600 dark:text-blue-400"
        icon={
          <BriefcaseMedical className="size-5 text-blue-600 dark:text-blue-400" />
        }
      />
      <Card className="rounded-tl-none border-l-4 border-blue-200 border-l-blue-500! p-4 pt-0 md:p-6 dark:border-blue-900/50">
        <Accordion type="multiple" className="w-full space-y-2">
          {MEDICINE_DATA.map((category, index) => {
            const theme =
              MEDICINE_COLOR[category.id as keyof typeof MEDICINE_COLOR] ||
              MEDICINE_COLOR[1];
            return (
              <AccordionItem key={category.id} value={`item-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col gap-1">
                    <span className="font-merriweather text-sm font-semibold hover:underline md:text-base">
                      {category.category}
                    </span>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      {category.description}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  {category.items.map((med, i) => (
                    <Card
                      key={i}
                      className={cn("rounded-none border-0", theme.border)}
                    >
                      <CardHeader
                        className={cn(
                          "border-l-4 p-0 px-2",
                          theme.borderAccent,
                        )}
                      >
                        <CardTitle className="text-sm md:text-base">
                          {med.name}
                        </CardTitle>
                        <p className="text-muted-foreground text-xs md:text-sm">
                          {med.description}
                        </p>
                      </CardHeader>
                      <CardContent className="grid gap-2 px-0 py-4 text-xs md:text-sm">
                        <div className="flex gap-2">
                          <span className="text-foreground/80 flex w-24 items-center gap-1.5 md:w-32">
                            <Stethoscope className={cn("size-3", theme.text)} />
                            Uso
                          </span>
                          <span className="flex-1">{med.usage}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-foreground/80 flex w-24 items-center gap-1.5 md:w-32">
                            <Syringe className={cn("size-3", theme.text)} />
                            Dosis
                          </span>
                          <span className="flex-1">{med.dosage}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-foreground/80 flex w-24 items-center gap-1.5 md:w-32">
                            <Pill className={cn("size-3", theme.text)} />
                            Presentación
                          </span>
                          <span className="flex-1">{med.type}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-foreground/80 flex w-24 items-center gap-1.5 md:w-32">
                            <AlertTriangle
                              className={cn("size-3", theme.text)}
                            />
                            Advertencias
                          </span>
                          <span className="flex-1">{med.warnings}</span>
                        </div>
                        {med.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {med.tags.map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xxs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Card>
    </section>
  );
};

export default Medicines;
