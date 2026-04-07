"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ProfileSummary } from "@/lib/types/profile";
import { Header } from "@/components/app/header";
import { Sidebar } from "@/components/app/sidebar";

const pageMeta: Record<string, { title: string; description: string }> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Visao geral comercial da MBW Espaco Integrativo."
  },
  "/leads": {
    title: "Leads e clientes",
    description: "Cadastro centralizado com busca e acompanhamento."
  },
  "/pipeline": {
    title: "Pipeline comercial",
    description: "Organize etapas e acompanhe oportunidades em tempo real."
  },
  "/perfil": {
    title: "Perfil",
    description: "Atualize apenas sua foto e nome de exibicao."
  }
};

export function AdminShell({
  children,
  profile
}: {
  children: React.ReactNode;
  profile: ProfileSummary | null;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const meta = pageMeta[pathname] ?? {
    title: "CRM MBW",
    description: "Plataforma premium da clinica."
  };

  const handleOpenSidebar = useCallback(() => {
    setMobileOpen(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <div className="shell flex min-h-screen">
      <Sidebar mobileOpen={mobileOpen} onClose={handleCloseSidebar} profile={profile} />
      <div className="relative z-0 flex min-h-screen flex-1 flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-6 xl:px-10">
        <Header
          title={meta.title}
          description={meta.description}
          onOpenSidebar={handleOpenSidebar}
          profile={profile}
        />
        <main className="flex-1 py-6 lg:py-7">{children}</main>
      </div>
    </div>
  );
}
