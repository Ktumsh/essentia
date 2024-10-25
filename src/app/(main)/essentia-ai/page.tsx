import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getMissingKeys } from "@/db/chat-querys";
import { getUserById } from "@/db/user-querys";
import { Chat } from "@/modules/chatbot/components/chat";
import { Session } from "@/types/session";
import { nanoid } from "@/utils/common";
import { getUserProfileData } from "@/utils/profile";
export const metadata: Metadata = {
  title: "Essentia AI ⭐",
};

const AIPage = async () => {
  const id = nanoid();
  const session = (await auth()) as Session;
  const missingKeys = await getMissingKeys();
  const profileData = session ? await getUserProfileData(session) : null;
  const user = session ? await getUserById(session.user.id) : null;
  const isPremium = user?.is_premium ?? null;
  return (
    <Chat
      id={id}
      session={session}
      missingKeys={missingKeys}
      profileData={profileData}
      isPremium={isPremium}
      initialMessages={[]}
    />
  );
};

export default AIPage;
