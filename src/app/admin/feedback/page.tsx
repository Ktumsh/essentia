import { auth } from "@/app/(auth)/auth";
import {
  getFeedbackPaginated,
  getFeedbackCount,
  getUserById,
} from "@/db/querys/user-querys";

import FeedbackDashboard from "./_components/feedback-dashboard";

export const experimental_ppr = true;

export default async function AdminFeedbackPage() {
  const session = await auth();

  const userId = session?.user?.id as string;

  const [user] = userId ? await getUserById(userId) : [];

  if (!user || user.role !== "admin") {
    throw new Error("No autorizado");
  }

  const [feedback, totalCount] = await Promise.all([
    getFeedbackPaginated({ limit: 1000 }),
    getFeedbackCount(),
  ]);

  return <FeedbackDashboard feedback={feedback} totalCount={totalCount} />;
}
