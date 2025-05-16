import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getDocumentsByFolderId } from "@/db/querys/medical-folder-querys";

import MedicalFolderCardList from "../_components/medical-folder-card-list";

interface FolderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FolderPage(props: FolderPageProps) {
  const params = await props.params;
  const { id } = params;

  if (!id) {
    redirect("/historial-medico");
  }

  const session = await auth();

  const userId = session?.user?.id as string;

  if (!userId) {
    redirect("/historial-medico");
  }

  const documents = await getDocumentsByFolderId({ userId, folderId: id });

  if (!documents) {
    redirect("/historial-medico");
  }

  return <MedicalFolderCardList documents={documents} />;
}
