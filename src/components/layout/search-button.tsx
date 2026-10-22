"use client";

import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

// Placeholder. The search dialog (Fuse.js over concepts, user lessons and vocab) arrives in phase 4.
export function SearchButton() {
  return (
    <Button variant="ghost" size="icon" aria-label="Search" disabled>
      <SearchIcon />
    </Button>
  );
}
