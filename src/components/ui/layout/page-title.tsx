import { cn } from "@/lib/utils";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle = ({ children, className }: PageTitleProps) => {
  return (
    <h1
      className={cn(
        "font-merriweather py-4 text-2xl leading-none font-semibold sm:text-3xl md:pt-11 dark:text-white",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
