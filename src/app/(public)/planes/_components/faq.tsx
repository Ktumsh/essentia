import { FAQ_PRICING_DATA } from "@/db/data/faq-pricing-data";

import FAQItems from "./faq-items";

const FAQ = () => {
  const faqs = FAQ_PRICING_DATA;
  return (
    <div className="border-border bg-background mt-16 flex flex-col border-t p-5 md:gap-4 md:px-6 md:py-14">
      <h2 className="font-merriweather mb-3 hidden text-center text-3xl font-bold md:block">
        Preguntas Frecuentes
      </h2>
      <h2 className="font-merriweather text-center text-2xl font-semibold md:hidden">
        FAQs
      </h2>
      <div className="mx-auto w-full max-w-md md:max-w-5xl">
        <FAQItems faqs={faqs} />
      </div>
    </div>
  );
};

export default FAQ;
