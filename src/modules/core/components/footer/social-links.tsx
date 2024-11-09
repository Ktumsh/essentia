import Link from "next/link";

import { siteConfig } from "@/config/site";
import { InstagramIcon, TwitterIcon, GithubIcon } from "@/modules/icons/media";

const SocialLinks = () => {
  return (
    <div className="mt-8 flex flex-row items-center justify-center">
      <div className="flex flex-row items-center gap-6">
        <span className="mr-3 text-center font-medium">Síguenos</span>
        <Link
          className="transition-all hover:scale-125"
          href={siteConfig.links.instagram}
          target="_blank"
        >
          <InstagramIcon className="size-6" />
        </Link>
        <Link
          className="transition-all hover:scale-125"
          href={siteConfig.links.twitter}
          target="_blank"
        >
          <TwitterIcon className="size-6" />
        </Link>
        <Link
          className="transition-all hover:scale-125"
          href={siteConfig.links.github}
          target="_blank"
        >
          <GithubIcon className="size-[26px]" />
        </Link>
      </div>
    </div>
  );
};

export default SocialLinks;
