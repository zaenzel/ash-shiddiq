// src/domain/shared/constants/navigation-links.ts

import {
  Dock,
  LayoutDashboardIcon,
  LucideProps,
} from "lucide-react";
import { ROUTES } from "../routes/index";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface NavigationLink {
  label: string;
  href: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >; // optional: nama icon yang akan digunakan
  badge?: number; // optional: untuk notifikasi count
}

export const NAVIGATION_LINKS: NavigationLink[] = [
  {
    label: "DASHBOARD",
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboardIcon,
  },
  {
    label: "KEUANGAN",
    href: ROUTES.FINANCIAL_RECORD,
    icon: Dock,
  },
];

// Helper function untuk get navigation berdasarkan role
export const getNavigationLinks = (): NavigationLink[] => {
  return NAVIGATION_LINKS;
};

// Helper function untuk check active link
export const isActiveLink = (
  currentPath: string,
  linkHref: string,
): boolean => {
  // Exact match
  if (currentPath === linkHref) {
    return true;
  }

  return false;
};
