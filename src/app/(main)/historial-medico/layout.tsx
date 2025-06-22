import { cookies } from "next/headers";

import { auth } from "@/app/(auth)/auth";

import MedicalWrapper from "./_components/medical-wrapper";
import { MedicalDialogsProvider } from "./_hooks/use-medical-dialogs";
import { MedicalFolderDialogProvider } from "./_hooks/use-medical-folder-dialogs";
import { MedicalFoldersProvider } from "./_hooks/use-medical-folders";
import { MultiSelectProvider } from "./_hooks/use-multi-select";
import { ViewModeProvider } from "./_hooks/use-view-mode";

export default async function MedicalHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) return children;

  const cookieStore = await cookies();

  const medicalMode =
    (cookieStore.get("view_mode")?.value as "grid" | "list") || "grid";

  return (
    <ViewModeProvider initialMode={medicalMode}>
      <MedicalDialogsProvider>
        <MedicalFolderDialogProvider>
          <MedicalFoldersProvider userId={session.user.id as string}>
            <MultiSelectProvider>
              <MedicalWrapper>{children}</MedicalWrapper>
            </MultiSelectProvider>
          </MedicalFoldersProvider>
        </MedicalFolderDialogProvider>
      </MedicalDialogsProvider>
    </ViewModeProvider>
  );
}
