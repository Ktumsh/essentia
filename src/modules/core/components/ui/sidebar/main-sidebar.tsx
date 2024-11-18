import { SidebarContent } from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site";
import { UserProfileData } from "@/types/session";

import MainNavInfo from "./main-nav-info";
import MainNavMain from "./main-nav-main";
import MainNavResources from "./main-nav-resources";
import MainNavUser from "./main-nav-user";

interface MainSidebarProps {
  user: UserProfileData | null;
}

const MainSidebar = ({ user }: MainSidebarProps) => {
  const mainLinks = siteConfig.navLinks;
  const resourceLinks = siteConfig.asideMenuLinks;
  const infoLinks = siteConfig.desktopFooterLinks.more;

  return (
    <>
      <SidebarContent>
        <MainNavMain items={mainLinks} />
        <MainNavResources items={resourceLinks} />
        <MainNavInfo items={infoLinks} />
      </SidebarContent>
      <MainNavUser user={user} />
    </>
  );
};

export default MainSidebar;
