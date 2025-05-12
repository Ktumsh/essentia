import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import PageTitle from "@/components/ui/layout/page-title";
import PageWrapper from "@/components/ui/layout/page-wrapper";
import { getGroupedChatToolsByUser } from "@/db/querys/chat-querys";

import ToolList from "./_components/tool-list";

export const metadata: Metadata = {
  title: "Hábitos y progreso",
  description:
    "Consulta tu progreso y hábitos por uso de herramientas de Essentia AI.",
};

export default async function ProgressPage() {
  const session = await auth();

  if (!session?.user?.id) return null;

  const toolsGroup = await getGroupedChatToolsByUser(session.user.id);

  return (
    <PageWrapper classNameContainer="w-full">
      <PageTitle className="mb-6">Hábitos y progreso</PageTitle>
      <ToolList toolsGroup={toolsGroup} />
    </PageWrapper>
  );
}
