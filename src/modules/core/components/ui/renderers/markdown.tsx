import Link from "next/link";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CodeBlock } from "@/modules/core/components/ui/renderers/codeblock";
import { cn } from "@/utils/common";

const NonMemoizedMarkdown = ({
  children,
  prose,
}: {
  children: string;
  prose?: string;
}) => {
  const components = {
    p({ children }: any) {
      return <p className="mb-2 last:mb-0">{children}</p>;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    a: ({ node, children, ...props }: any) => {
      return (
        <Link
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noreferrer"
          {...props}
        >
          {children}
        </Link>
      );
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
          return <span className="mt-1 animate-pulse cursor-default">▍</span>;
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
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
      className={cn(
        "prose break-words text-sm !text-main-h dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 dark:!text-main-dark md:text-base",
        prose,
      )}
    >
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);
