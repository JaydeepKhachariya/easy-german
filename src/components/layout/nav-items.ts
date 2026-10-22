import {
  BookOpenIcon,
  GraduationCapIcon,
  LayersIcon,
  LayoutDashboardIcon,
  NotebookPenIcon,
  SettingsIcon,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

export const NAV_ITEMS: NavItem[] = [
  { href: "/learn/", label: "Learn", icon: BookOpenIcon },
  { href: "/exam/", label: "Exam", icon: GraduationCapIcon },
  { href: "/vocab/review/", label: "Review", icon: LayersIcon },
  { href: "/my-lessons/", label: "My Lessons", icon: NotebookPenIcon },
  { href: "/dashboard/", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/settings/", label: "Settings", icon: SettingsIcon },
];

export function isActive(pathname: string, href: string) {
  const clean = href.replace(/\/$/, "");
  return pathname === clean || pathname.startsWith(`${clean}/`);
}
