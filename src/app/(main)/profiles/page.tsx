import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getUserData } from "@/utils/profile";

const ProfilesPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const userId = session?.user?.id as string;

  const profileData = userId ? await getUserData({ userId }) : null;

  redirect("/profiles/" + profileData?.username);
};

export default ProfilesPage;
