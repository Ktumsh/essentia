import { FAQ_PRICING } from "@/consts/faq-pricing";
import FAQItems from "./faq-items";

const FAQ = () => {
  const faqs = FAQ_PRICING;
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-base-dark-50 p-5 md:gap-4 md:px-6 md:py-14">
      <h2 className="hidden text-center text-2xl font-semibold tracking-tighter md:block md:text-4xl">
        Preguntas Frecuentes
      </h2>
      <h2 className="text-center text-2xl font-semibold md:hidden">FAQs</h2>
      <div className="mx-auto w-full max-w-md md:max-w-5xl">
        <FAQItems faqs={faqs} />
      </div>
    </div>
  );
};

export default FAQ;
