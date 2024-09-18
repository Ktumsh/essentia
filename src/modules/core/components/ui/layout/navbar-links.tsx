import { tooltipStyles } from "@/styles/tooltip-styles";
import { IconSvgProps } from "@/types/common";
import { cn } from "@/utils/common";
import { Button, Link, Tooltip } from "@nextui-org/react";

interface Page {
  name: string;
  href: string;
  icon: (props: IconSvgProps) => JSX.Element;
  fillIcon: (props: IconSvgProps) => JSX.Element;
  active: boolean;
}

interface NavbarLinksProps {
  pages: Page[];
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ pages }) => {
  return (
    <>
      {pages.map(
        ({ name, href, icon: Icon, fillIcon: FillIcon, active }, key) => (
          <Tooltip
            key={key}
            content={name}
            delay={500}
            closeDelay={0}
            classNames={{
              content: tooltipStyles.content,
            }}
          >
            <li
              className={cn(
                active ? "!pb-0" : "",
                "relative flex items-center justify-center h-full w-20 lg:w-28 py-1"
              )}
            >
              <Button
                as={Link}
                id={`navbar_link_${key + 1}`}
                aria-label={"Ir a " + name}
                variant="light"
                color="danger"
                radius="sm"
                href={href}
                className={cn(
                  "!h-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-current after:scale-x-0 data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-gray-500 dark:text-gray-400 max-w-[112px]",
                  active
                    ? "current-page rounded-b-none text-bittersweet-400 dark:text-cerise-red-600 after:bg-bittersweet-400 dark:after:bg-cerise-red-600 after:scale-x-100 data-[hover=true]:bg-transparent dark:data-[hover=true]:bg-transparent"
                    : "not-current",
                  "relative flex items-center justify-center size-full px-3 pointer-events-auto navbar_link hover:text-bittersweet-400 dark:hover:text-cerise-red-600"
                )}
              >
                {active ? (
                  <FillIcon className="size-6" aria-hidden="true" />
                ) : (
                  <Icon className="size-6" aria-hidden="true" />
                )}
              </Button>
            </li>
          </Tooltip>
        )
      )}
    </>
  );
};

export default NavbarLinks;
