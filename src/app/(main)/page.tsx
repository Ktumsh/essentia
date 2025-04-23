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
  const userData = userId ? await getUserProfileData({ userId }) : null;
  return <Home userData={userData} />;
};

export default MainPage;
