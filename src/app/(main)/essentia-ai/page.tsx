import { Metadata } from "next";
import { cookies } from "next/headers";

import { auth } from "@/app/(auth)/auth";
import { DEFAULT_CHAT_MODEL } from "@/modules/chatbot/ai/models";
import { Chat } from "@/modules/chatbot/components/chat";
import { generateUUID } from "@/modules/chatbot/lib/utils";
import { getUserProfileData } from "@/utils/profile";

export const metadata: Metadata = {
  title: "Essentia AI ⭐",
  alternates: {
    canonical: "/essentia-ai",
  },
};

const AIPage = async () => {
  const id = generateUUID();

  const session = await auth();
  const userData = session ? await getUserProfileData({ session }) : null;

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  if (!modelIdFromCookie) {
    return (
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedChatModel={DEFAULT_CHAT_MODEL}
        selectedVisibilityType="private"
        session={session}
        user={userData}
        isReadonly={false}
      />
    );
  }

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      selectedChatModel={modelIdFromCookie.value}
      selectedVisibilityType="private"
      session={session}
      user={userData}
      isReadonly={false}
    />
  );
};

export default AIPage;
