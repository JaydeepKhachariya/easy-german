import Link from "next/link";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { SearchButton } from "./search-button";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4">
        <MobileNav />
        <Link href="/" className="mr-2 font-semibold tracking-tight">
          Deutsch Bridge
        </Link>
        <DesktopNav />
        <div className="ml-auto flex items-center gap-1">
          <SearchButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
