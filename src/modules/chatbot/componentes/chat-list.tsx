import { Separator } from "@/modules/core/components/ui/separator";
import { UIState } from "../chat/actions";

export interface ChatList {
  messages: UIState;
}

const ChatList = ({ messages }: ChatList) => {
  if (!messages.length) {
    return null;
  }
  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={message.id}>
          {message.display}
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
