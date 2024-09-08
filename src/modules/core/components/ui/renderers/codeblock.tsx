"use client";

import { FC, memo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Button, useDisclosure } from "@nextui-org/react";
import { useCopyToClipboard } from "../../../hooks/use-copy-to-clipboard";
import { CopyIcon } from "@/modules/icons/action";
import { CheckIcon } from "@/modules/icons/common";
import { DownloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import FileNameModal from "../modals/file-name-modal";

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
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [fileName, setFileName] = useState<string | undefined>();
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const fileExtension = programmingLanguages[language] || ".file";
  const suggestedFileName = `archivo-${generateRandomString(
    3,
    true
  )}${fileExtension}`;

  const downloadAsFile = () => {
    setFileName(suggestedFileName);
    onOpen();
  };

  const handleModalSubmit = () => {
    const baseName = fileName?.replace(/\.[^/.]+$/, "");
    const finalFileName = `${baseName}${fileExtension}`;
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
    onClose();
  };

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(value);
    toast.success("Código copiado");
  };

  return (
    <>
      <div className="relative w-full font-sans codeblock bg-gray-950 border border-gray-50 border-white/10 rounded-lg">
        <div className="flex items-center justify-between w-full px-6 py-2 pr-4 text-base-color-dark-h border-b border-white/10">
          <span className="text-xs lowercase">{language}</span>
          <div className="flex items-center space-x-1">
            <Button
              size="sm"
              isIconOnly
              variant="light"
              className="text-xs text-base-color-dark-h data-[hover=true]:bg-white/5"
              onPress={downloadAsFile}
            >
              <DownloadIcon className="size-4" />
              <span className="sr-only">Descargar</span>
            </Button>
            <Button
              size="sm"
              isIconOnly
              variant="light"
              className="text-xs text-base-color-dark-m data-[hover=true]:bg-white/5"
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
      <FileNameModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        fileName={fileName}
        setFileName={setFileName}
        onSubmit={handleModalSubmit}
      />
    </>
  );
});
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
