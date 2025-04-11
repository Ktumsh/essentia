import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import {
  getFeedbackPaginated,
  getFeedbackCount,
  getUserById,
} from "@/db/querys/user-querys";

import FeedbackDashboard from "./_components/feedback-dashboard";

export default async function AdminFeedbackPage() {
  const session = await auth();

  const [user] = await getUserById(session?.user?.id as string);

  if (!session || user.role !== "admin") {
    redirect("/");
  }

  const [feedback, totalCount] = await Promise.all([
    getFeedbackPaginated({ limit: 1000 }),
    getFeedbackCount(),
  ]);

  return <FeedbackDashboard feedback={feedback} totalCount={totalCount} />;
}
