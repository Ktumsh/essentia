import { auth } from "@/app/(auth)/auth";
import Home from "@/modules/home/components/home";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

export const metadata = {
  title: "Inicio",
};

const MainPage = async () => {
  const session = (await auth()) as Session;
  const profileData = session ? await getUserProfileData(session) : null;
  return <Home profileData={profileData} />;
};

export default MainPage;
