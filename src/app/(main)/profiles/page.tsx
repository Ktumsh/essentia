import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getUserData } from "@/utils/profile";

export default async function ProfilesPage() {
  const session = await auth();

  if (!session) redirect("/");

  const userId = session?.user?.id as string;

  const profileData = userId ? await getUserData({ userId }) : null;

  redirect("/profiles/" + profileData?.username);
}
