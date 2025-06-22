import { auth } from "@/app/(auth)/auth";
import PageWrapper from "@/components/layout/page-wrapper";

import MedicalHistoryTabs from "./_components/medical-history-tabs";
import UnauthenticatedState from "./_components/unauthenticated-state";
import MedicalFoldersPanel from "./carpetas/_components/medical-folders";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historial médico",
  alternates: {
    canonical: "/historial-medico",
  },
};

export default async function MedicalHistoryPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <PageWrapper>
        <UnauthenticatedState />
      </PageWrapper>
    );
  }

  return (
    <>
      <MedicalFoldersPanel />
      <MedicalHistoryTabs />
    </>
  );
}
