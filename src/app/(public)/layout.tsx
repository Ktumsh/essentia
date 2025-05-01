import { auth } from "../(auth)/auth";
import PublicWrapper from "./_components/public-wrapper";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return <PublicWrapper session={session}>{children}</PublicWrapper>;
}
