import Aside from "@/modules/community/components/aside";
import CommunityHeader from "@/modules/community/components/header";
import { Session } from "@/types/session";
import { cn } from "@/utils/common";
import { getUserProfileData } from "@/utils/profile";
import { auth } from "@@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Comunidad de Essentia",
  },
};

export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as Session;
  const profileData = session ? await getUserProfileData(session) : null;
  return (
    <>
      <div
        className={cn(
          "z-[-1]",
          "before:absolute before:top-0 before:left-1/2 before:h-[800px] before:w-full sm:before:w-[1080px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-tr from-gray-50 to-[#c0c6e6] before:blur-[80px] before:content-['']",
          "before:dark:h-[600px] before:dark:w-[980px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-[#ff7373] before:dark:opacity-20",
          "after:absolute after:top-[10%] after:left-[20%] after:z-10 after:h-[580px] after:w-full sm:after:w-[540px] after:bg-gradient-to-tr after:from-[#f8b6cc] after:to-transparent after:blur-[80px] after:content-[''] after:rounded-full after:opacity-50",
          "after:dark:top-1/4 after:dark:left-2/3 after:dark:h-[180px] after:dark:w-[260px] after:dark:bg-gradient-to-br after:dark:from-base-full-dark after:dark:via-[#ff7373] after:dark:opacity-50 after:dark:blur-3xl after:dark:rounded-none"
        )}
      ></div>
      <div className="flex justify-center max-h-dvh w-full">
        <CommunityHeader profileData={profileData} />
        <main className="relative flex grow shrink items-start w-full max-w-[1310px] min-h-dvh overflow-y-auto">
          <div className="relative flex grow shrink items-stretch justify-between w-full max-w-[1050px]">
            <div className="flex items-stretch justify-center lg:justify-between min-h-full">
              <div className="w-full xl:min-w-[600px] max-w-[600px] min-h-dvh grow mx-0 py-6 border-x-1 border-white dark:border-base-dark text-base-color dark:text-base-color-dark">
                {children}
              </div>
              <Aside />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
