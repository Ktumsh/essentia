import Link from "next/link";
import { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

const components: Partial<Components> = {
  pre: ({ children }) => <>{children}</>,
  p({ children }) {
    return <p className="mb-2 last:mb-0">{children}</p>;
  },
  a: ({ node, children, ...props }: any) => {
    return (
      <Link
        className="text-blue-500 no-underline hover:underline"
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

    if (inline) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  },
};

const remarkPlugins = [remarkGfm];

const NonMemoizedMarkdown = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      components={components}
      className={cn(
        "prose text-foreground/80 dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 prose-headings:font-semibold! prose-hr:border-muted-foreground break-words md:text-base",
        className,
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
