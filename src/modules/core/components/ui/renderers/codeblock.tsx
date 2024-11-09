"use client";

import { Button } from "@nextui-org/react";
import { FC, memo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toast } from "sonner";

import { CopyIcon, DownloadIcon } from "@/modules/icons/action";
import { CheckIcon } from "@/modules/icons/common";

import { useCopyToClipboard } from "../../../hooks/use-copy-to-clipboard";

interface Props {
  language: string;
  value: string;
}

interface languageMap {
  [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
};

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const fileExtension = programmingLanguages[language] || ".file";
  const suggestedFileName = `essentia-ai-${generateRandomString(
    3,
    true,
  )}${fileExtension}`;

  const downloadAsFile = () => {
    handleSubmit(suggestedFileName);
  };

  const handleSubmit = (finalFileName: string) => {
    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = finalFileName;
    link.href = url;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(value);
    toast.success("Código copiado");
  };

  return (
    <div className="codeblock relative w-full border border-gray-50 bg-gray-950 font-sans dark:border-white/10">
      <div className="flex w-full items-center justify-between border-b border-white/10 px-6 py-2 pr-4 text-main-dark-h">
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center space-x-1">
          <Button
            size="sm"
            isIconOnly
            variant="light"
            className="text-xs text-main-dark-h data-[hover=true]:bg-white/5"
            onPress={downloadAsFile}
          >
            <DownloadIcon className="size-4" />
            <span className="sr-only">Descargar</span>
          </Button>
          <Button
            size="sm"
            isIconOnly
            variant="light"
            className="text-xs text-main-dark-m data-[hover=true]:bg-white/5"
            onPress={onCopy}
          >
            {isCopied ? (
              <CheckIcon className="size-4" />
            ) : (
              <CopyIcon className="size-4" />
            )}
            <span className="sr-only">Copiar código</span>
          </Button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          width: "100%",
          background: "transparent",
          padding: "1.5rem 1rem",
        }}
        lineNumberStyle={{
          userSelect: "none",
        }}
        codeTagProps={{
          style: {
            fontSize: "0.9rem",
            fontFamily: "var(--font-mono)",
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
