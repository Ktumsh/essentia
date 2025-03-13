import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getUserProfileData } from "@/utils/profile";

import Home from "./_components/home";

export const metadata: Metadata = {
  title: "Inicio",
};

const MainPage = async () => {
  const session = await auth();
  const profileData = session ? await getUserProfileData({ session }) : null;
  return <Home profileData={profileData} />;
};

export default MainPage;
