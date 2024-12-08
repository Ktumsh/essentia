import { auth } from "@/app/(auth)/auth";
import Home from "@/modules/home/components/home";
import { getUserProfileData } from "@/utils/profile";

export const metadata = {
  title: "Inicio",
};

const MainPage = async () => {
  const session = await auth();
  const profileData = session ? await getUserProfileData(session) : null;
  return <Home profileData={profileData} />;
};

export default MainPage;
