import Link from "next/link";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/utils";

const ListItem = ({
  className,
  title,
  href,
  children,
  ...props
}: {
  className?: string;
  title: string;
  href: string;
  children?: React.ReactNode;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default ListItem;
