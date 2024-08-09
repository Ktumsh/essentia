import { siteConfig } from "@/config/site";
import { InstagramIcon, TwitterIcon, GithubIcon } from "@/modules/icons/media";
import Link from "next/link";

const SocialLinks = () => {
  return (
    <div className="flex flex-row justify-center items-center mt-8">
      <div className="flex flex-row items-center gap-6">
        <span className="mr-3 text-center font-medium">Síguenos</span>
        <Link
          className="hover:scale-125 transition-all"
          href={siteConfig.links.instagram}
          target="_blank"
        >
          <InstagramIcon className="size-6" />
        </Link>
        <Link
          className="hover:scale-125 transition-all"
          href={siteConfig.links.twitter}
          target="_blank"
        >
          <TwitterIcon className="size-6" />
        </Link>
        <Link
          className="hover:scale-125 transition-all"
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
