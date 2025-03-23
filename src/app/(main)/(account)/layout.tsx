import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import PageWrapper from "@/components/ui/layout/page-wrapper";
import { getAllCoursesProgress } from "@/db/querys/progress-query";
import { getUserProfileData } from "@/utils/profile";

import AccountHeader from "./_components/account/account-header";
import AccountTabs from "./_components/account-tabs";

export default async function AccountLayout() {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const userId = session?.user?.id as string;

  const userData = session ? await getUserProfileData({ session }) : null;

  const courses = await getAllCoursesProgress(userId);

  return (
    <PageWrapper>
      <AccountHeader />
      <AccountTabs user={userData} courses={courses} />
    </PageWrapper>
  );
}
