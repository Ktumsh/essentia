import { getStripeCustomerById } from "@/db/actions";
import BillingTabs from "@/modules/account/components/billing-tabs";
import DesktopFooter from "@/modules/core/components/ui/layout/desktop-footer";
import {
  createSetupIntent,
  getUserBillingDetails,
} from "@/modules/payment/pay/actions";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";
import { auth } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as Session;

  if (!session) {
    return redirect("/");
  }

  const customer = session
    ? await getStripeCustomerById(session.user.id)
    : null;

  const billingDetails = customer
    ? await getUserBillingDetails(customer)
    : null;

  const clientSecret =
    billingDetails && customer ? await createSetupIntent(customer) : null;

  const profileData = session ? await getUserProfileData(session) : null;

  return (
    <>
      <div className="flex flex-col min-h-dvh w-full pt-14">
        <main className="flex-1">
          <div className="flex-1 size-full max-w-5xl mx-auto text-base-color dark:text-base-color-dark bg-white dark:bg-base-full-dark border border-y-0 border-gray-200 dark:border-base-dark">
            {children}
            <BillingTabs
              profileData={profileData}
              billingDetails={billingDetails}
              clientSecret={clientSecret}
            />
          </div>
        </main>
      </div>
      <DesktopFooter />
    </>
  );
}
