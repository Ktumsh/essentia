import Image from "next/image";
import LoginEntry from "./login-entry";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="page_content relative size-full">
      <div className="z-40 w-full min-h-dvh sm:min-h-dvh">
        <div className="flex justify-center items-center w-full min-h-dvh sm:min-h-[calc(100dvh-72px)] backdrop-blur-[2px]">
          <div className="bg-noise bg-repeat bg-[length:100px] pointer-events-none absolute inset-0 z-10 opacity-5"></div>
          <div className="z-20 flex flex-col size-full sm:w-auto overflow-hidden">
            <Link
              className="flex items-center justify-center size-full mt-5 mb-0 sm:mb-5"
              href="/bienvenida"
            >
              <Image
                className="w-32 active:scale-[.97] transition-transform"
                width={128}
                height={83}
                src="/logo-essentia-on-dark.webp"
                alt="Volver a la página de bienvenida"
              />
            </Link>
            <LoginEntry />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
