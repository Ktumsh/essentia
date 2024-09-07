import Image from "next/image";
import Link from "next/link";

const AuthHeader = () => {
  return (
    <div role="banner" className="z-[100] fixed top-0 w-full">
      <div className="flex items-center w-full px-4 h-14 gap-5">
        <div className="flex items-center gap-2">
          <Link
            className="relative flex items-center justify-center w-7 active:scale-95 transition-transform rounded-full"
            href="/"
            aria-label="Página de inicio"
          >
            <Image
              className="h-10 w-auto transition-all ease-in-out"
              width={27}
              height={40}
              quality={100}
              src="/logo-essentia.webp"
              alt="Logo de Essentia"
            />
          </Link>
          <Link
            href="/"
            className="hidden xl:block font-grotesk text-base-color dark:text-white/95"
          >
            Essentia®️
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
