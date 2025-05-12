import { useEffect } from "react";

import type { UIMessage } from "ai";

export function useTrackTasks(
  parts: UIMessage["parts"],
  addTask: (t: any) => void,
) {
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
