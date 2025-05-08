import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getUserProfileData } from "@/utils/profile";

import { Chat } from "../_components/chat";
import { generateUUID } from "../_lib/utils";

export const metadata: Metadata = {
  title: "Essentia AI ⭐",
  alternates: {
    canonical: "/essentia-ai",
  },
};

const AIPage = async () => {
  const id = generateUUID();

  const session = await auth();
  const userId = session?.user?.id as string;
  const userData = userId ? await getUserProfileData({ userId }) : null;

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      selectedVisibilityType="private"
      session={session}
      user={userData}
      isReadonly={false}
      autoResume={false}
    />
  );
};

export default AIPage;
