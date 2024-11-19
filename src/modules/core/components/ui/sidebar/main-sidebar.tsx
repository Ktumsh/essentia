import { SidebarContent } from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site";

import MainNavInfo from "./main-nav-info";
import MainNavMain from "./main-nav-main";
import MainNavResources from "./main-nav-resources";

const MainSidebar = () => {
  const mainLinks = siteConfig.navLinks;
  const resourceLinks = siteConfig.asideMenuLinks;

  return (
    <>
      <SidebarContent>
        <MainNavMain items={mainLinks} />
        <MainNavResources items={resourceLinks} />
        <MainNavInfo items={siteConfig.footerLinks.more} />
      </SidebarContent>
    </>
  );
};

export default MainSidebar;
