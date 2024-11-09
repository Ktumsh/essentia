import Link from "next/link";

import { siteConfig } from "@/config/site";

import Logo from "../../footer/logo";

const DesktopFooter = () => {
  const links = siteConfig.footerLinks.more;
  return (
    <footer className="fixed bottom-0 left-0 z-50 mx-auto hidden h-12 items-center justify-between px-4 pb-2 pt-1 text-main dark:text-main-dark lg:inline-flex">
      <nav className="flex items-center gap-2.5 rounded-full text-xs font-medium">
        <div className="flex size-[25px] shrink-0 select-none items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-white shadow-md dark:border-white/10 dark:bg-dark">
          <Logo />
        </div>
        {links.map((link, index) => (
          <Link key={index} href={link.href} className="hover:underline">
            {link.text}
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default DesktopFooter;
