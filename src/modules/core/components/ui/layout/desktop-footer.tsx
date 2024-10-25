import Link from "next/link";

import { siteConfig } from "@/config/site";

import Logo from "../../footer/logo";

const DesktopFooter = () => {
  const links = siteConfig.footerLinks.more;
  return (
    <footer className="fixed bottom-0 left-0 mx-auto z-50 hidden lg:inline-flex items-center justify-between h-12 px-4 pt-1 text-base-color dark:text-base-color-dark pb-2">
      <nav className="flex items-center gap-2.5 rounded-full text-xs font-medium">
        <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 shadow-md overflow-hidden">
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
