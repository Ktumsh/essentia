import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getDocumentsByFolderId } from "@/db/querys/medical-folder-querys";

import DocumentsView from "../_components/documents-view";

interface FolderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FolderPage({ params }: FolderPageProps) {
  const { id } = await params;

  if (!id) redirect("/historial-medico");

  const session = await auth();

  const userId = session?.user?.id as string;

  if (!userId) {
    redirect("/historial-medico");
  }

  const documents = await getDocumentsByFolderId({ userId, folderId: id });

  if (!documents) redirect("/historial-medico");

  return <DocumentsView docs={documents} folderId={id} />;
}
