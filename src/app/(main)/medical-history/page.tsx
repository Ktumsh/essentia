import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import PageWrapper from "@/components/ui/layout/page-wrapper";

import MedicalHistory from "./_components/medical-history";
import UnauthenticatedState from "./_components/unauthenticated-state";

export const metadata: Metadata = {
  title: "Historial médico",
  alternates: {
    canonical: "/medical-history",
  },
};

const MedicalHistoryPage = async () => {
  const session = await auth();

  return (
    <PageWrapper className="pt-6 md:pt-0">
      {!session?.user ? (
        <UnauthenticatedState />
      ) : (
        <>
          <h1 className="font-merriweather py-4 text-2xl leading-none font-semibold sm:text-3xl md:pt-11 dark:text-white">
            Historial Médico
          </h1>
          <MedicalHistory />
        </>
      )}
    </PageWrapper>
  );
};

export default MedicalHistoryPage;
