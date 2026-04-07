"use client";

import { Bell, Menu } from "lucide-react";
import type { ProfileSummary } from "@/lib/types/profile";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  title: string;
  description: string;
  onOpenSidebar: () => void;
  profile: ProfileSummary | null;
};

export function Header({ title, description, onOpenSidebar, profile }: HeaderProps) {
  const displayName = profile?.fullName ?? "Dra Fernanda";

  return (
    <header className="glass-panel flex flex-col gap-4 rounded-[22px] px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" className="lg:hidden" onClick={onOpenSidebar}>
          <Menu className="h-4 w-4" />
          Menu
        </Button>
        <div>
          <p className="text-[28px] font-semibold tracking-[-0.03em] text-brand-950">{title}</p>
          <p className="mt-1 text-sm text-brand-600">{description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <Button variant="secondary" size="sm">
          <Bell className="h-4 w-4" />
          Clinica
        </Button>
        <div className="flex items-center gap-3 rounded-xl border border-brand-300/55 bg-white/80 px-3 py-2.5 shadow-[0_12px_28px_-24px_rgba(17,17,17,0.25)]">
          <Avatar name={displayName} src={profile?.avatarUrl} />
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-brand-950">{displayName}</p>
            <p className="text-xs text-brand-600">MBW Integrativo</p>
          </div>
        </div>
      </div>
    </header>
  );
}
