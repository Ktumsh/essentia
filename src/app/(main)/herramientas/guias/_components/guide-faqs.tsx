import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/kit/accordion";
import { Card } from "@/components/kit/card";
import { cn } from "@/lib/utils";

import type { Guide, GuideThemeColors } from "@/consts/guide-data";

interface GuideFaqsProps {
  guide: Guide;
  theme: GuideThemeColors;
}

const GuideFaqs = ({ guide, theme }: GuideFaqsProps) => {
  return (
    <>
      <h2
        className={cn(
          "font-merriweather mb-2 text-lg font-semibold",
          theme.text,
        )}
      >
        Preguntas frecuentes
      </h2>
      <Card
        className={cn(
          "rounded-xl rounded-tl-none border-0 border-l-4 p-4 pt-0 md:p-6",
          theme.bg,
          theme.borderAccent,
        )}
      >
        <Accordion type="single" collapsible className="w-full">
          {guide.faqs?.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={theme.border}
            >
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent className="prose text-foreground/80 text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </>
  );
};

export default GuideFaqs;
