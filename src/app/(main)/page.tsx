import Home from "@/modules/home/components/home";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";
import { auth } from "@@/auth";

export const metadata = {
  title: "Inicio",
};

const MainPage = async () => {
  const session = (await auth()) as Session;
  const profileData = session ? await getUserProfileData(session) : null;
  return <Home profileData={profileData} />;
};

export default MainPage;
