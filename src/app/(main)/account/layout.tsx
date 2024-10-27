import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getStripeCustomerById } from "@/db/payment-querys";
import BillingTabs from "@/modules/account/components/billing-tabs";
import DesktopFooter from "@/modules/core/components/ui/layout/desktop-footer";
import {
  createSetupIntent,
  getUserBillingDetails,
} from "@/modules/payment/pay/actions";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

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
        <div className="flex-1">
          <div className="flex-1 size-full max-w-5xl mx-auto text-main dark:text-main-dark bg-white dark:bg-full-dark border border-y-0 border-gray-200 dark:border-dark">
            {children}
            <BillingTabs
              profileData={profileData}
              billingDetails={billingDetails}
              clientSecret={clientSecret as string}
            />
          </div>
        </div>
      </div>
      <DesktopFooter />
    </>
  );
}
