"use client";

import { UpgradeButton } from "@/components/button-kit/upgrade-button";
import { Card, CardContent } from "@/components/kit/card";
import PaymentModal from "@/components/ui/payment/payment-modal";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn } from "@/lib/utils";

import ActivityFullView from "./activity-full-view";
import ActivityPreview from "./activity-preview";
import DocumentViewDialog from "./document-view-dialog";
import StorageLimitIndicator from "./storage-limit-indicator";
import StorageLimitLoading from "./storage-limit-loading";
import { useMedicalHistoryLogic } from "../_hooks/use-medical-history-logic";

const MedicalHistoryAside = () => {
  const { subscription } = useUserSubscription();

  const isPremium = subscription?.plan?.id === "premium";
  const isPremiumPlus = subscription?.plan?.id === "premium-plus";

  const {
    dialogs,
    setDialogs,
    currentItem,
    handleRestore,
    documentViewHandlers,
    handleViewDocumentFromActivity,
    isTrialUsed,
    loading,
    medicalHistory,
    activities,
    hasNewActivity,
    setPremiumFeatureType,
    listHandlers,
  } = useMedicalHistoryLogic();

  return (
    <>
      <section className="col-span-1 hidden xl:block">
        <Card className="bg-muted sticky top-20 flex flex-col rounded-xl border-0">
          <CardContent className="flex flex-col p-5 text-base">
            <header className="flex items-center justify-between">
              <h3 className="font-medium">Resumen</h3>
              {!isPremiumPlus && (
                <UpgradeButton
                  size="sm"
                  variant="gradient"
                  onClick={() => {
                    setPremiumFeatureType("upload-limit");
                    setDialogs((prev) => ({ ...prev, isPremiumModal: true }));
                  }}
                  className={cn(
                    "text-xs hover:text-white active:text-white [&>svg]:size-3.5!",
                    isPremium && "bg-premium-plus!",
                  )}
                >
                  Mejorar plan
                </UpgradeButton>
              )}
            </header>

            {loading ? (
              <StorageLimitLoading />
            ) : (
              medicalHistory && (
                <StorageLimitIndicator totalDocuments={medicalHistory.length} />
              )
            )}
            <ActivityPreview
              activities={activities}
              hasNewActivity={hasNewActivity}
              onViewAll={() =>
                setDialogs((prev) => ({
                  ...prev,
                  isActivityFullViewOpen: true,
                }))
              }
            />
          </CardContent>
        </Card>
      </section>

      <ActivityFullView
        isOpen={dialogs.isActivityFullViewOpen}
        onClose={() =>
          setDialogs((prev) => ({ ...prev, isActivityFullViewOpen: false }))
        }
        activities={activities}
        onViewDocument={handleViewDocumentFromActivity}
        onRestoreDocument={handleRestore}
      />

      <DocumentViewDialog
        isOpen={dialogs.isViewDialogOpen}
        onClose={() =>
          setDialogs((prev) => ({ ...prev, isViewDialogOpen: false }))
        }
        onDownload={listHandlers.onDownload}
        currentItem={currentItem}
        {...documentViewHandlers}
      />

      <PaymentModal
        featureType="upload-limit"
        isOpen={dialogs.isPremiumModal}
        setIsOpen={(isOpen) =>
          setDialogs((prev) => ({ ...prev, isPremiumModal: isOpen }))
        }
        mode={!isTrialUsed ? "trial" : "upgrade"}
      />
    </>
  );
};

export default MedicalHistoryAside;
