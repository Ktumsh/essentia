"use client";

import { FAQPrincing } from "@/types/common";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface FAQItemProps {
  faqs: FAQPrincing[];
}

const FAQItems = ({ faqs }: FAQItemProps) => {
  return (
    <Accordion
      dividerProps={{
        className: "bg-gray-300 dark:bg-white/10",
      }}
      itemClasses={{
        base: "py-2 md:py-4",
        trigger: "py-4 md:px-6 data-[hover=true]:underline underline-offset-2",
        title: "text-sm font-medium text-base-color dark:text-base-color-dark",
        content: "pb-4 !pt-0",
      }}
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          aria-label={faq.question}
          title={faq.question}
          HeadingComponent={"h3"}
        >
          <p className="prose-sm pr-10 text-left text-base-color-h dark:text-base-color-dark-h md:px-6 md:pr-12">
            {faq.answer}
          </p>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQItems;
