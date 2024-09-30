"use client";

import { ReactNode } from "react";
import { StreamableValue } from "ai/rsc";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Avatar } from "@nextui-org/react";
import { cn } from "@/utils/common";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { useStreamableText } from "../../hooks/use-streamable-text";
import { MemoizedReactMarkdown } from "@/modules/core/components/ui/renderers/markdown";
import { spinner } from "./spinner";
import { CodeBlock } from "@/modules/core/components/ui/renderers/codeblock";
import { UserProfileData } from "@/types/session";
import MessageActions from "./message-actions";

export function UserMessage({
  children,
  className,
  profileData,
}: {
  children: ReactNode;
  className?: string;
  profileData: UserProfileData | null;
}) {
  return (
    <div
      role="user"
      className={cn(
        "group relative flex items-start md:-mr-12 self-end flex-row-reverse",
        className
      )}
    >
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 shadow-md overflow-hidden">
        {profileData && profileData?.profile_image ? (
          <Image
            width={23}
            height={25}
            src={profileData.profile_image}
            alt={`Avatar de ${profileData.username}`}
            className="object-cover object-center"
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
      <div className="ml-4 mr-2 space-y-2 max-w-[70%] rounded-ee-xl rounded-s-xl px-5 py-2.5 bg-white dark:bg-base-full-dark overflow-hidden text-base-color-h dark:text-base-color-dark">
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
    <div
      role="assistant"
      className={cn("group relative flex items-start md:-ml-12", className)}
    >
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 shadow-md overflow-hidden">
        <Image
          width={18}
          height={18}
          src="/logo-essentia.webp"
          alt="Avatar de Essentia AI"
          className="object-cover object-center aspect-auto self-center align-middle mr-px"
        />
      </div>
      <div className="group/message flex-1 ml-2 md:ml-6 sm:mr-6 space-y-2 overflow-hidden text-base-color-h dark:text-base-color-dark">
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
        <MessageActions content={text} />
      </div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div role="bot-card" className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          "flex size-[25px] shrink-0 select-none items-center justify-center rounded-md bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 shadow-md overflow-hidden",
          !showAvatar && "invisible"
        )}
      >
        <Image
          width={18}
          height={18}
          src="/logo-essentia.webp"
          alt="Avatar de Essentia AI"
          className="object-cover object-center aspect-auto self-center align-middle mr-px"
        />
      </div>
      <div className="group/message ml-2 md:ml-6 flex-1 space-y-2">
        {children}
        <MessageActions />
      </div>
    </div>
  );
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 shadow-md overflow-hidden">
        <Image
          width={12}
          height={18}
          src="/logo-essentia.webp"
          alt="Essentia AI"
          className="object-cover object-center aspect-auto self-center align-middle mr-px"
        />
      </div>
      <div className="ml-4 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  );
}
