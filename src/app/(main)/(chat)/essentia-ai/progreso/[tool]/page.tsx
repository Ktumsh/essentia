import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { SLUG_TO_TOOL, TOOL_NAME_LABELS } from "@/consts/tools";
import { getToolsByUserAndToolName } from "@/db/querys/chat-querys";
import { getSubscriptionType } from "@/db/querys/payment-querys";

import GroupedTool from "../_components/gruped-tool";

interface ToolPageProps {
  params: Promise<{
    tool: string;
  }>;
}

export async function generateMetadata(
  props: ToolPageProps,
): Promise<Metadata> {
  const params = await props.params;
  const { tool } = params;

  const decodedTool = SLUG_TO_TOOL[decodeURIComponent(tool)];

  const toolName = TOOL_NAME_LABELS[decodedTool];

  return {
    title: toolName,
  };
}

export default async function ToolPage(props: ToolPageProps) {
  const params = await props.params;
  const { tool } = params;

  const session = await auth();

  const userId = session?.user?.id as string;

  if (!userId) {
    redirect("/essentia-ai");
  }

  const subscriptionType = session ? await getSubscriptionType(userId) : null;

  if (subscriptionType?.type !== "premium-plus") {
    redirect("/essentia-ai");
  }

  const toolName = SLUG_TO_TOOL[decodeURIComponent(tool)];

  if (!toolName) {
    redirect("/essentia-ai");
  }

  const invocations = await getToolsByUserAndToolName({
    userId,
    toolName,
  });

  return <GroupedTool toolName={toolName} invocations={invocations} />;
}
