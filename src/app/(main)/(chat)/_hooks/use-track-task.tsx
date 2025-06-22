import { useEffect } from "react";

import { useTasks } from "@/hooks/use-task";

import type { UIMessage } from "ai";

export function useTrackTasks({ parts }: { parts: UIMessage["parts"] }) {
  const { addTask } = useTasks();

  useEffect(() => {
    parts.forEach((p) => {
      if (
        p.type === "tool-invocation" &&
        p.toolInvocation.state === "result" &&
        p.toolInvocation.toolName === "trackTask" &&
        p.toolInvocation.result?.task
      ) {
        addTask(p.toolInvocation.result.task);
      }
    });
  }, [parts, addTask]);
}
