import Link from "next/link";

import { LinkIcon } from "@/modules/icons/action";
import { cn } from "@/utils/common";

const FooterText = ({ className }: { className?: string }) => {
  return (
    <p
      className={cn(
        "text-base-color-d dark:text-base-color-dark-d px-2 text-center text-xs leading-normal font-dmsans",
        className
      )}
    >
      Essentia AI impulsado por{" "}
      <Link
        href="https://openai.com/"
        target="_blank"
        className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline"
      >
        <span>OpenAI</span>
        <LinkIcon />
      </Link>
      .
    </p>
  );
};

export default FooterText;
