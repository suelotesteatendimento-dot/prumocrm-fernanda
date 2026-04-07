import type { Route } from "next";
import { ChartColumnIncreasing, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard" as Route,
    icon: LayoutDashboard
  },
  {
    title: "Leads",
    href: "/leads" as Route,
    icon: Users
  },
  {
    title: "Pipeline",
    href: "/pipeline" as Route,
    icon: ChartColumnIncreasing
  }
];

export const secondaryNavigationItems = [
  {
    title: "Perfil",
    href: "/perfil" as Route,
    icon: Settings
  },
  {
    title: "Sair",
    href: "/login" as Route,
    icon: LogOut
  }
];
