import { AdminShell } from "@/components/app/admin-shell";
import { getCurrentProfile } from "@/lib/profiles/queries";

export default async function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getCurrentProfile();

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
