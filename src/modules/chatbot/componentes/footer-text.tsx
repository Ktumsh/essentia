import { LinkIcon } from "@/modules/icons/action";
import { cn } from "@/utils/common";
import Link from "next/link";

const FooterText = ({ className }: { className?: string }) => {
  return (
    <p
      className={cn(
        "text-base-color-d dark:text-base-color-dark-d px-2 text-center text-xs leading-normal hidden sm:block font-dmsans",
        className
      )}
    >
      Impulsado por el modelo {""}
      <Link
        href="https://cohere.com/command"
        target="_blank"
        className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline"
      >
        <span>command-r-plus</span>
        <LinkIcon />
      </Link>
      de {""}
      <Link
        href="https://cohere.com/"
        target="_blank"
        className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline"
      >
        <span>Cohere</span>
        <LinkIcon />
      </Link>
      .
    </p>
  );
};

export default FooterText;
