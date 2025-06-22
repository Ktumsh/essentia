import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getToolsByUserAndToolName } from "@/db/querys/chat-querys";
import { getSubscriptionType } from "@/db/querys/payment-querys";

import {
  SLUG_TO_TOOL,
  TOOL_NAME_LABELS,
  TOOL_SLUGS,
} from "../../../_lib/tool-helper";
import GroupedTool from "../_components/gruped-tool";

import type { Metadata } from "next";

interface ToolPageProps {
  params: Promise<{
    tool: string;
  }>;
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { tool } = await params;

  const decodedTool = SLUG_TO_TOOL[decodeURIComponent(tool)];

  const toolName = TOOL_NAME_LABELS[decodedTool];

  return {
    title: toolName,
  };
}

export async function generateStaticParams() {
  return Object.values(TOOL_SLUGS).map((tool) => ({
    tool,
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { tool } = await params;

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
