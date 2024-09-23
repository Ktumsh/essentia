import { Metadata } from "next";

import { getMissingKeys } from "./actions";
import { AI } from "@/modules/chatbot/chat/actions";
import { nanoid } from "@/utils/common";
import { auth } from "@@/auth";
import { Chat } from "@/modules/chatbot/componentes/chat";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";
import { getUserById } from "@/db/actions";
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
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat
        id={id}
        session={session}
        missingKeys={missingKeys}
        profileData={profileData}
        isPremium={isPremium}
      />
    </AI>
  );
};

export default AIPage;
