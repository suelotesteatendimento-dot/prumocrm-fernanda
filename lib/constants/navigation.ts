import type { Route } from "next";
import { ChartColumnIncreasing, LayoutDashboard, LogOut, Users } from "lucide-react";

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
    title: "Sair",
    href: "/login" as Route,
    icon: LogOut
  }
];
