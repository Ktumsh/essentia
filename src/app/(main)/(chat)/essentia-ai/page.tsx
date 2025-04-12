import { Metadata } from "next";
import { cookies } from "next/headers";

import { auth } from "@/app/(auth)/auth";
import { getUserProfileData } from "@/utils/profile";

import { Chat } from "../_components/chat";
import { DEFAULT_CHAT_MODEL } from "../_lib/ai/models";
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
