import { tooltipStyles } from "@/styles/tooltip-styles";
import { IconSvgProps } from "@/types/common";
import { cn } from "@/utils/common";
import { Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

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
  const [underlineStyle, setUnderlineStyle] = useState<React.CSSProperties>({
    width: 0,
    left: 0,
  });

  // Refs para cada elemento <li>
  const linkRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const activePageIndex = pages.findIndex((page) => page.active);

    if (activePageIndex !== -1 && linkRefs.current[activePageIndex]) {
      const activeElement = linkRefs.current[activePageIndex];
      if (activeElement) {
        const newStyle = {
          width: activeElement.clientWidth,
          left: activeElement.offsetLeft,
        };

        if (
          newStyle.width !== underlineStyle.width ||
          newStyle.left !== underlineStyle.left
        ) {
          setUnderlineStyle(newStyle);
        }
      }
    }
  }, [pages, underlineStyle]);

  const handleNavItemClick = (index: number) => {
    const activeElement = linkRefs.current[index];
    if (activeElement) {
      setUnderlineStyle({
        width: activeElement.clientWidth,
        left: activeElement.offsetLeft,
      });
    }
  };

  return (
    <>
      <hr
        style={underlineStyle}
        className="absolute bottom-0 h-1 bg-bittersweet-400 dark:bg-cerise-red-600 transition-all duration-300 ease-in-out"
      />
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
              ref={(el) => {
                linkRefs.current[key] = el;
              }}
              className="relative flex items-center justify-center h-full w-20 lg:w-28 py-1"
            >
              <Button
                as={Link}
                id={`navbar_link_${key + 1}`}
                aria-label={"Ir a " + name}
                variant="light"
                color="danger"
                radius="sm"
                fullWidth
                href={href}
                onPress={() => handleNavItemClick}
                className={cn(
                  "!h-full max-h-12 data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-gray-500 dark:text-gray-400 max-w-[112px]",
                  "px-3 pointer-events-auto hover:text-bittersweet-400 dark:hover:text-cerise-red-600",
                  active &&
                    "rounded-b-none text-bittersweet-400 dark:text-cerise-red-600 data-[hover=true]:bg-transparent dark:data-[hover=true]:bg-transparent"
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
