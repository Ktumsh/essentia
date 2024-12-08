import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getMissingKeys } from "@/db/querys/chat-querys";
import { getSubscription } from "@/db/querys/payment-querys";
import { Chat } from "@/modules/chatbot/components/chat";
import { generateUUID } from "@/modules/chatbot/lib/utils";
import { getUserProfileData } from "@/utils/profile";
export const metadata: Metadata = {
  title: "Essentia AI ⭐",
};

const AIPage = async () => {
  const id = generateUUID();
  const session = await auth();
  const missingKeys = await getMissingKeys();
  const profileData = session ? await getUserProfileData(session) : null;
  const [subscription] = profileData
    ? await getSubscription(session?.user?.id as string)
    : [];
  const isPremium = subscription ? subscription.isPremium : false;
  return (
    <Chat
      id={id}
      initialMessages={[]}
      isReadonly={false}
      missingKeys={missingKeys}
      session={session}
      user={profileData}
      isPremium={isPremium}
    />
  );
};

export default AIPage;
