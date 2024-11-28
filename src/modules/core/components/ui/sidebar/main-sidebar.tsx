import { siteConfig } from "@/config/site";

import MainNavInfo from "./main-nav-info";
import MainNavMain from "./main-nav-main";
import MainNavResources from "./main-nav-resources";

interface MainSidebarProps {
  isCollapsed?: boolean;
}

const MainSidebar = ({ isCollapsed }: MainSidebarProps) => {
  const mainLinks = siteConfig.navLinks;
  const resourceLinks = siteConfig.asideMenuLinks;
  const infoLinks = siteConfig.footerLinks.more;

  return (
    <>
      <MainNavMain items={mainLinks} />
      <MainNavResources items={resourceLinks} isCollapsed={isCollapsed} />
      <MainNavInfo items={infoLinks} isCollapsed={isCollapsed} />
    </>
  );
};

export default MainSidebar;
