"use client";

import { ReactNode } from "react";
import { StreamableValue } from "ai/rsc";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Avatar } from "@nextui-org/react";
import { cn } from "@/utils/common";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { useStreamableText } from "../hooks/use-streamable-text";
import { MemoizedReactMarkdown } from "@/modules/core/components/markdown";
import { spinner } from "./spinner";
import { useSession } from "next-auth/react";
import { CodeBlock } from "@/modules/core/components/ui/codeblock";

export function UserMessage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { data: session } = useSession();
  return (
    <div
      className={cn(
        "group relative flex items-start md:-mr-12 sm:self-end sm:flex-row-reverse",
        className
      )}
    >
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 shadow-md overflow-hidden">
        {session?.user?.image ? (
          <Image
            width="15"
            height="15"
            src={session.user.image}
            alt={`Imagen de usuario de: ${session.user.name}`}
          />
        ) : (
          <Avatar
            showFallback
            src="https://images.unsplash.com/broken"
            size="sm"
            icon={<AvatarIcon className="size-4" />}
            classNames={{
              icon: "text-base-color-m dark:text-base-color-dark-m",
              base: "bg-gray-300 dark:bg-gray-800 rounded-none",
              name: "font-medium text-base-color-h dark:text-base-color-dark-h",
            }}
          />
        )}
      </div>
      <div className="flex-1 ml-4 pl-2 sm:mr-4 sm:pr-2 space-y-2 overflow-hidden sm:text-end text-base-color-h dark:text-base-color-dark">
        {children}
      </div>
    </div>
  );
}

export function BotMessage({
  content,
  className,
}: {
  content: string | StreamableValue<string>;
  className?: string;
}) {
  const text = useStreamableText(content);

  return (
    <div className={cn("group relative flex items-start md:-ml-12", className)}>
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 shadow-md overflow-hidden">
        <Image
          width="15"
          height="15"
          src="/e-logomark-on-dark.webp"
          alt="Essentia AI"
        />
      </div>
      <div className="flex-1 ml-4 pl-2 sm:mr-4 sm:pr-2 space-y-2 overflow-hidden text-base-color-h dark:text-base-color-dark">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({
              inline,
              className,
              children,
              ...props
            }: {
              inline?: boolean;
              className?: string;
              children?: React.ReactNode;
              [key: string]: any;
            }) {
              if (children && typeof children === "string") {
                if (children.startsWith("▍")) {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  );
                }

                children = (children as string).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className || "");

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            },
          }}
        >
          {text}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 shadow-md overflow-hidden">
        <Image
          width="15"
          height="15"
          src="/e-logomark-on-dark.webp"
          alt="Essentia AI"
        />
      </div>
      <div className="ml-4 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  );
}
