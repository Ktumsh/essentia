import { siteConfig } from "@/config/site";

import Copyright from "../../footer/copyright";
import LinkList from "../../footer/link-list";
import Logo from "../../footer/logo";
import SocialLinks from "../../footer/social-links";

const FullFooter = () => {
  const resources = siteConfig.footerLinks.resources;
  const additionalresources = siteConfig.footerLinks.additionalresources;
  const more = siteConfig.footerLinks.more;

  return (
    <div
      id="footer"
      className="static w-full bg-gray-100 font-light text-main dark:bg-dark dark:text-white"
    >
      <footer className="mx-auto flex max-w-[1250px] flex-col px-5 py-10">
        <div className="mb-10 grid max-w-7xl grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
          <Logo />
          <LinkList href="/recursos" title="Recursos" links={resources} />
          <LinkList
            href="/adicionales"
            title="Recursos Adicionales"
            links={additionalresources}
          />
          <LinkList title="Más" links={more} />
        </div>
        <SocialLinks />
      </footer>
      <Copyright />
    </div>
  );
};

export default FullFooter;
