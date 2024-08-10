import { Metadata } from "next";

import { getMissingKeys } from "./actions";
import { AI } from "@/modules/chatbot/chat/actions";
import { nanoid } from "@/utils/common";
import { auth } from "@@/auth";
import { Chat } from "@/modules/chatbot/componentes/chat";
export const metadata: Metadata = {
  title: "Essentia AI",
};

const AIPage = async () => {
  const id = nanoid();
  const session = await auth();
  const missingKeys = await getMissingKeys();
  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} session={session as any} missingKeys={missingKeys} />
    </AI>
  );
};

export default AIPage;
