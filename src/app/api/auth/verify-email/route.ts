import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import {
  getVerificationToken,
  updateEmailVerified,
  deleteVerificationToken,
} from "@/db/email-querys";
import { getUserById } from "@/db/user-querys";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return new Response("Token not found", { status: 400 });
  }

  const verification = await getVerificationToken(token);

  if (!verification) {
    return new Response("Invalid token", { status: 400 });
  }

  if (verification.expires_at < new Date()) {
    return new Response("Token expired", { status: 400 });
  }

  const user = await getUserById(verification.user_id);

  if (user?.email_verified) {
    return new Response("Email already verified", { status: 400 });
  }

  const userId = user?.id || "";

  await updateEmailVerified(userId);

  await deleteVerificationToken(token);

  redirect(`/login?verified=true&id=${userId}`);
}
