"use client";

import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose } from "lucide-react";
import { navigationItems, secondaryNavigationItems } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/app/logo-mark";
import { Button } from "@/components/ui/button";

type SidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside className="relative z-10 hidden w-[292px] shrink-0 border-r border-white/10 bg-[linear-gradient(180deg,#111111_0%,#1A1A1A_100%)] px-5 py-6 lg:flex lg:flex-col">
        <SidebarContent pathname={pathname} />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar navegação"
            className="absolute inset-0 bg-black/30"
            onClick={onClose}
          />

          <aside className="relative z-10 h-full w-[292px] border-r border-white/10 bg-[linear-gradient(180deg,#111111_0%,#1A1A1A_100%)] px-5 py-6 shadow-lg">
            <div className="mb-6 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-brand-100 hover:bg-white/10 hover:text-brand-100"
                onClick={onClose}
              >
                <PanelLeftClose className="h-4 w-4" />
                Fechar
              </Button>
            </div>
            <SidebarContent pathname={pathname} />
          </aside>
        </div>
      ) : null}
    </>
  );
}

const SidebarContent = memo(function SidebarContent({
  pathname
}: {
  pathname: string;
}) {
  return (
    <>
      <LogoMark inverted />

      <div className="mt-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-brand-300/80">
          Navegação
        </p>
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition-all",
                  active
                    ? "bg-brand-500 text-brand-950 shadow-[0_18px_30px_-24px_rgba(200,176,138,0.85)]"
                    : "text-brand-300 hover:bg-white/10 hover:text-brand-100"
                )}
              >
                <Icon className="h-4 w-4 opacity-85" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto pt-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-brand-300/80">
          Sessão
        </p>
        <nav className="space-y-2">
          {secondaryNavigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm text-brand-300 transition-all hover:bg-white/10 hover:text-brand-100"
              >
                <Icon className="h-4 w-4 opacity-85" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
});
