"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { isActive, NAV_ITEMS } from "./nav-items";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
      {NAV_ITEMS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
            isActive(pathname, href) && "text-foreground",
          )}
          aria-current={isActive(pathname, href) ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
