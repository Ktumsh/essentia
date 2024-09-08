import { siteConfig } from "@/config/site";
import Logo from "../../footer/logo";
import Copyright from "../../footer/copyright";
import LinkList from "../../footer/link-list";
import SocialLinks from "../../footer/social-links";

const Footer = () => {
  const resources = siteConfig.footerLinks.resources;
  const additionalresources = siteConfig.footerLinks.additionalresources;
  const comunidad = siteConfig.footerLinks.comunidad;
  const more = siteConfig.footerLinks.more;

  return (
    <div
      id="footer"
      className="w-full static bg-white dark:bg-base-dark text-base-color dark:text-white font-light"
    >
      <footer className="flex flex-col max-w-[1250px] py-10 px-5 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-12 gap-y-8 max-w-7xl mb-10">
          <Logo />
          <LinkList href="/recursos" title="Recursos" links={resources} />
          <LinkList
            href="/adicionales"
            title="Recursos Adicionales"
            links={additionalresources}
          />
          <LinkList href="/comunidad" title="Comunidad" links={comunidad} />
          <LinkList title="Más" links={more} />
        </div>
        <SocialLinks />
      </footer>
      <Copyright />
    </div>
  );
};

export default Footer;
