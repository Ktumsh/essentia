import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex col-span-2 md:col-span-1 justify-center md:justify-start justify-items-start mb-6">
      <Link title="Essentia Logo" href="/" aria-label="Essentia Logo">
        <div className="w-28 h-auto">
          <Image
            className="size-auto dark:hidden"
            width={1500}
            height={1500}
            src="/logo-essentia-on-light.webp"
            alt="Essentia Logo"
          />
          <Image
            className="size-auto hidden dark:block"
            width={1500}
            height={1500}
            src="/logo-essentia-on-dark.webp"
            alt="Essentia Logo"
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
