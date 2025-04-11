import PageWrapper from "@/components/ui/layout/page-wrapper";

import AdditionalsTabs from "./_components/additionals-tabs";

export default function AdditionalsLayout() {
  return (
    <PageWrapper>
      <h1 className="font-merriweather py-4 text-2xl leading-none font-semibold sm:text-3xl md:pt-11 dark:text-white">
        Recursos Adicionales
      </h1>
      <AdditionalsTabs />
    </PageWrapper>
  );
}
