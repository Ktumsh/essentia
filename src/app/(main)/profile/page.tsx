import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

const ProfilePage = async () => {
  const session = (await auth()) as Session;

  if (!session) {
    return redirect("/");
  }

  const profileData = await getUserProfileData(session);

  redirect("/profile/" + profileData.username);
};

export default ProfilePage;
