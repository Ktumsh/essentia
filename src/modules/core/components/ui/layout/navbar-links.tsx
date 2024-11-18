import { Button } from "@nextui-org/react";
import Link from "next/link";
import {
  useEffect,
  useState,
  useRef,
  FC,
  CSSProperties,
  type JSX,
  ComponentRef,
} from "react";

import { BetterTooltip } from "@/components/ui/tooltip";
import { IconSvgProps } from "@/types/common";
import { cn } from "@/utils/common";

interface Page {
  name: string;
  href: string;
  icon: (props: IconSvgProps) => JSX.Element;
  activeIcon: (props: IconSvgProps) => JSX.Element;
  active: boolean;
}

interface NavbarLinksProps {
  pages: Page[];
}

const NavbarLinks: FC<NavbarLinksProps> = ({ pages }) => {
  const [underlineStyle, setUnderlineStyle] = useState<CSSProperties>({
    width: 0,
    left: 0,
  });

  const linkRefs = useRef<(ComponentRef<"li"> | null)[]>([]);

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
    } else {
      if (underlineStyle.width !== 0 || underlineStyle.left !== 0) {
        setUnderlineStyle({
          width: 0,
          left: 0,
        });
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
        aria-hidden="true"
        style={underlineStyle}
        className="absolute bottom-0 h-1 border-none bg-bittersweet-400 transition-all duration-300 ease-in-out dark:bg-cerise-red-600"
      />
      {pages.map(
        ({ name, href, icon: Icon, activeIcon: ActiveIcon, active }, key) => (
          <BetterTooltip key={key} content={name}>
            <li
              ref={(el) => {
                linkRefs.current[key] = el;
              }}
              className="relative flex h-full w-20 items-center justify-center py-1 lg:w-28"
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
                  "!h-full max-h-12 max-w-[112px] text-gray-500 data-[hover=true]:bg-gray-200 dark:text-gray-400 dark:data-[hover=true]:bg-dark",
                  "pointer-events-auto px-3 hover:text-bittersweet-400 dark:hover:text-cerise-red-600",
                  active &&
                    "rounded-b-none text-bittersweet-400 data-[hover=true]:bg-transparent dark:text-cerise-red-600 dark:data-[hover=true]:bg-transparent",
                )}
              >
                {active ? (
                  <ActiveIcon className="size-6" aria-hidden="true" />
                ) : (
                  <Icon className="size-6" aria-hidden="true" />
                )}
              </Button>
            </li>
          </BetterTooltip>
        ),
      )}
    </>
  );
};

export default NavbarLinks;
