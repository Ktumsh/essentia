import Link from "next/link";

import { LinkIcon } from "@/components/ui/icons/action";
import { cn } from "@/lib/utils";

const FooterText = ({ className }: { className?: string }) => {
  return (
    <p
      className={cn(
        "font-dmsans text-muted-foreground px-2 text-center text-xs leading-normal",
        className,
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
