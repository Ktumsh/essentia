import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getUserData } from "@/utils/profile";

import { Chat } from "../_components/chat";
import { generateUUID } from "../_lib/utils";

export const metadata: Metadata = {
  title: "Aeris ⭐",
  alternates: {
    canonical: "/aeris",
  },
};

const AIPage = async () => {
  const id = generateUUID();

  const session = await auth();
  const userId = session?.user?.id as string;
  const userData = userId ? await getUserData({ userId }) : null;

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      initialVisibilityType="private"
      session={session}
      user={userData}
      isReadonly={false}
      autoResume={false}
    />
  );
};

export default AIPage;
