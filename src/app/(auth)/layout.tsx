import AuthWrapper from "./_components/auth-wrapper";

export const experimental_ppr = true;

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
