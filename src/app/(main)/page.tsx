import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getUserData } from "@/utils/profile";

import Home from "./_components/home";

export const metadata: Metadata = {
  title: "Inicio",
};

const MainPage = async () => {
  const session = await auth();
  const userId = session?.user?.id as string;
  const userData = userId ? await getUserData({ userId }) : null;
  return <Home userData={userData} />;
};

export default MainPage;
