import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
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

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      isReadonly={false}
      selectedVisibilityType="private"
      session={session}
      user={userData}
    />
  );
};

export default AIPage;
