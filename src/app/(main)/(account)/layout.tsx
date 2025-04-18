import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import PageWrapper from "@/components/ui/layout/page-wrapper";
import { getAllRoutesProgress } from "@/db/querys/progress-querys";

import AccountHeader from "./_components/account-header";
import AccountTabs from "./_components/account-tabs";

export default async function AccountLayout() {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const userId = session?.user?.id as string;

  const routes = await getAllRoutesProgress(userId);

  return (
    <PageWrapper>
      <AccountHeader />
      <AccountTabs routes={routes} />
    </PageWrapper>
  );
}
