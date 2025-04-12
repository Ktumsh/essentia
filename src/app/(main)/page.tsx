import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getUserProfileData } from "@/utils/profile";

import Home from "./_components/home";

export const metadata: Metadata = {
  title: "Inicio",
};

const MainPage = async () => {
  const session = await auth();
  const userId = session?.user?.id as string;
  const profileData = userId ? await getUserProfileData({ userId }) : null;
  return <Home profileData={profileData} />;
};

export default MainPage;
