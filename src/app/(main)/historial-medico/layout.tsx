import { auth } from "@/app/(auth)/auth";

import MedicalWrapper from "./_components/medical-wrapper";
import { MedicalDialogsProvider } from "./_hooks/use-medical-dialogs";
import { MedicalFolderDialogProvider } from "./_hooks/use-medical-folder-dialogs";
import { MedicalFoldersProvider } from "./_hooks/use-medical-folders";
import { MultiSelectProvider } from "./_hooks/use-multi-select";

export default async function MedicalHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) return children;

  return (
    <MedicalDialogsProvider>
      <MedicalFolderDialogProvider>
        <MedicalFoldersProvider userId={session.user.id as string}>
          <MultiSelectProvider>
            <MedicalWrapper>{children}</MedicalWrapper>
          </MultiSelectProvider>
        </MedicalFoldersProvider>
      </MedicalFolderDialogProvider>
    </MedicalDialogsProvider>
  );
}
