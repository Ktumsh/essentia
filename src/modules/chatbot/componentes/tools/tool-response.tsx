import { sleep } from "@/utils/common";
import { nanoid } from "nanoid";
import { AIState } from "../../chat/actions";
import { BotCard } from "../stocks/message";
import ErrorMessage from "../stocks/error-message";

type ValueOrUpdater<T> = T | ((current: T) => T);

export type MutableAIState<AIState> = {
  get: () => AIState;
  update: (newState: ValueOrUpdater<AIState>) => void;
  done: ((newState: AIState) => void) | (() => void);
};

export const generateToolResponse = async (
  aiState: MutableAIState<AIState>,
  toolName: string,
  args: any,
  resultComponent: React.ReactNode
): Promise<React.ReactNode> => {
  try {
    const toolCallId = nanoid();

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: "assistant",
          content: [
            {
              type: "tool-call",
              toolName,
              toolCallId,
              args,
            },
          ],
        },
        {
          id: nanoid(),
          role: "tool",
          content: [
            {
              type: "tool-result",
              toolName,
              toolCallId,
              result: args,
            },
          ],
        },
      ],
    });

    await sleep(1000);

    return <BotCard>{resultComponent}</BotCard>;
  } catch (error) {
    console.error(
      `Error generando la respuesta de IA para la herramienta ${toolName}:`,
      error
    );
    return (
      <BotCard>
        <ErrorMessage />
      </BotCard>
    );
  }
};
