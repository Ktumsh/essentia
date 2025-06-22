import PageWrapper from "@/components/layout/page-wrapper";

import AdditionalsHeader from "./_components/additionals-header";
import AdditionalsTabs from "./_components/additionals-tabs";

export const experimental_ppr = false;

export default function AdditionalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <AdditionalsHeader />
      <AdditionalsTabs>{children}</AdditionalsTabs>
    </PageWrapper>
  );
}
