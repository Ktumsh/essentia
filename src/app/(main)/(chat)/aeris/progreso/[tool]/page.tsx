import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getToolsByUserAndToolName } from "@/db/querys/chat-querys";
import { getSubscriptionType } from "@/db/querys/payment-querys";

import { SLUG_TO_TOOL, TOOL_NAME_LABELS } from "../../../_lib/tool-helper";
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
    redirect("/aeris");
  }

  const subscriptionType = session ? await getSubscriptionType(userId) : null;

  if (subscriptionType?.type !== "premium-plus") {
    redirect("/aeris");
  }

  const toolName = SLUG_TO_TOOL[decodeURIComponent(tool)];

  if (!toolName) {
    redirect("/aeris");
  }

  const invocations = await getToolsByUserAndToolName({
    userId,
    toolName,
  });

  return <GroupedTool toolName={toolName} invocations={invocations} />;
}
