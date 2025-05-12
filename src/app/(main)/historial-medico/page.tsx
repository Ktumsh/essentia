import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import PageTitle from "@/components/ui/layout/page-title";
import PageWrapper from "@/components/ui/layout/page-wrapper";

import MedicalHistory from "./_components/medical-history";
import UnauthenticatedState from "./_components/unauthenticated-state";

export const metadata: Metadata = {
  title: "Historial médico",
  alternates: {
    canonical: "/historial-medico",
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
          <PageTitle>Historial Médico</PageTitle>
          <MedicalHistory />
        </>
      )}
    </PageWrapper>
  );
};

export default MedicalHistoryPage;
