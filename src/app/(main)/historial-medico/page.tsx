import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";

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

  if (!session?.user) {
    return <UnauthenticatedState />;
  }

  return <MedicalHistory />;
};

export default MedicalHistoryPage;
