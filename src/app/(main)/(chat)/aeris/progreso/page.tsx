import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import PageTitle from "@/components/ui/layout/page-title";
import PageWrapper from "@/components/ui/layout/page-wrapper";
import { getGroupedChatToolsByUser } from "@/db/querys/chat-querys";
import { getSubscriptionType } from "@/db/querys/payment-querys";

import ToolList from "./_components/tool-list";

export const metadata: Metadata = {
  title: "Hábitos y progreso",
  description:
    "Consulta tu progreso y hábitos por uso de herramientas de Chat con Aeris.",
};

export default async function ProgressPage() {
  const session = await auth();

  const userId = session?.user?.id as string;

  if (!userId) return null;

  const subscriptionType = session ? await getSubscriptionType(userId) : null;

  if (subscriptionType?.type !== "premium-plus") {
    redirect("/aeris");
  }

  const toolsGroup = await getGroupedChatToolsByUser(userId);

  return (
    <PageWrapper classNameContainer="w-full">
      <PageTitle className="mb-6">Hábitos y progreso</PageTitle>
      <ToolList toolsGroup={toolsGroup} />
    </PageWrapper>
  );
}
