import { navConfig } from "@/config/nav.config";

import MainNavInfo from "./main-nav-info";
import MainNavMain from "./main-nav-main";
import MainNavResources from "./main-nav-resources";

interface MainSidebarProps {
  isCollapsed?: boolean;
  isPremium: boolean;
}

const MainSidebar = ({ isCollapsed, isPremium }: MainSidebarProps) => {
  const mainLinks = navConfig.navLinks;
  const resourceLinks = navConfig.asideMenuLinks;
  const infoLinks = navConfig.menuFooterLinks.extras;

  return (
    <>
      <MainNavMain
        items={mainLinks}
        isPremium={isPremium}
        isCollapsed={isCollapsed}
      />
      <MainNavResources items={resourceLinks} isCollapsed={isCollapsed} />
      <MainNavInfo items={infoLinks} isCollapsed={isCollapsed} />
    </>
  );
};

export default MainSidebar;
