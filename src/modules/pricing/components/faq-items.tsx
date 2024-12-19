import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQPrincing } from "@/types/common";

interface FAQItemProps {
  faqs: FAQPrincing[];
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
          <AccordionContent className="prose-sm !pt-0 pb-4 pr-10 text-left text-main-h dark:text-main-dark-h md:px-6 md:pr-12">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQItems;
