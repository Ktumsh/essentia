import Link from "next/link";

import { LinkIcon } from "@/components/ui/icons/action";
import { cn } from "@/lib/utils";

const FooterText = ({ className }: { className?: string }) => {
  return (
    <p
      className={cn(
        "px-2 text-center font-dmsans text-xs leading-normal text-main-l dark:text-main-dark-l",
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
