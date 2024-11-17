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
      <div className="flex min-h-dvh w-full flex-col">
        <div className="flex-1">
          <div className="mx-auto size-full max-w-5xl flex-1 border-gray-200 bg-white text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:border md:border-y-0">
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
