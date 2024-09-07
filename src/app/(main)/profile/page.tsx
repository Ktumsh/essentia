import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";
import { auth } from "@@/auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = (await auth()) as Session;

  if (!session) {
    return redirect("/bienvenida");
  }

  const profileData = getUserProfileData(session);

  redirect("/profile/" + (await profileData).username);
};

export default ProfilePage;
