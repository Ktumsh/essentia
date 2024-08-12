"use client";

import { StreamableValue, readStreamableValue } from "ai/rsc";
import { useEffect, useState } from "react";

export const useStreamableText = (
  content: string | StreamableValue<string>
) => {
  const [rawContent, setRawContent] = useState(
    typeof content === "string" ? content : ""
  );

  useEffect(() => {
    (async () => {
      if (typeof content === "object") {
        for await (const delta of readStreamableValue(content)) {
          try {
            if (delta) {
              // Intenta hacer el parse solo si delta parece ser un JSON
              if (
                delta.trim().startsWith("{") ||
                delta.trim().startsWith("[")
              ) {
                const jsonData = JSON.parse(delta);
                setRawContent((value) => value + JSON.stringify(jsonData));
              } else {
                setRawContent((value) => value + delta);
              }
            }
          } catch (error) {
            console.error("Fragmento no es JSON válido:", delta);
          }
        }
      }
    })();
  }, [content]);

  return rawContent;
};
