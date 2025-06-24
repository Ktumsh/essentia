import { redirect } from "next/navigation";
import { Suspense } from "react";

import { auth } from "@/app/(auth)/auth";
import PageTitle from "@/components/layout/page-title";
import PageWrapper from "@/components/layout/page-wrapper";
import { getGroupedChatToolsByUser } from "@/db/querys/chat-querys";
import { getSubscriptionType } from "@/db/querys/payment-querys";

import ToolList from "./_components/tool-list";
import ToolListLoading from "./_components/tool-list-loading";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hábitos y progreso",
  description:
    "Consulta tu progreso y hábitos por uso de herramientas con Aeris.",
};

export default async function ProgressPage() {
  const session = await auth();

  const userId = session?.user?.id as string;

  if (!userId) redirect("/aeris");

  const subscriptionType = userId ? await getSubscriptionType(userId) : null;

  if (subscriptionType?.type !== "premium-plus") redirect("/aeris");

  const toolsGroup = getGroupedChatToolsByUser(userId);

  return (
    <PageWrapper classNameContainer="w-full">
      <PageTitle className="mb-6">Hábitos y progreso</PageTitle>
      <Suspense fallback={<ToolListLoading />}>
        <ToolList toolsGroup={toolsGroup} />
      </Suspense>
    </PageWrapper>
  );
}
