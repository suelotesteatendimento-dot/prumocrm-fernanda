import { AdminShell } from "@/components/app/admin-shell";

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminShell>{children}</AdminShell>;
}
