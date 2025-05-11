import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/kit/accordion";

import type { FAQPricing } from "@/consts/faq-pricing";

interface FAQItemProps {
  faqs: FAQPricing[];
}

const FAQItems = ({ faqs }: FAQItemProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={`question-${faq.id}`}
          aria-label={faq.question}
          className="py-2 md:py-4"
        >
          <AccordionTrigger className="py-4 underline-offset-2 md:px-6">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="prose-sm text-foreground/80 pt-0! pr-10 pb-4 text-left md:px-6 md:pr-12">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQItems;
