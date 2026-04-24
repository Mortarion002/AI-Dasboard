"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, User } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export function Topbar() {
  const pathname = usePathname();
  const setCommandPaletteOpen = useUIStore((state) => state.setCommandPaletteOpen);
  
  const pageName = pathname === "/dashboard" ? "Dashboard" 
    : pathname === "/activity" ? "Activity"
    : pathname === "/insights" ? "Insights"
    : pathname === "/settings" ? "Settings"
    : "Overview";

  return (
    <header className="h-12 border-b border-border bg-surface flex items-center px-4 justify-between shrink-0 z-10">
      <div className="flex-1 flex items-center">
        <div className="text-sm text-text-muted">
          AIOps Command <span className="mx-1">&gt;</span> <span className="text-text-primary font-medium">{pageName}</span>
        </div>
      </div>

      <div className="flex-1 flex justify-center max-w-md w-full">
        <div 
          className="relative w-full cursor-text"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={14} className="text-text-muted" />
          </div>
          <div className="block w-full h-8 pl-9 pr-3 rounded bg-surface-dim border border-border text-sm text-text-muted flex items-center justify-between hover:border-text-muted/30 transition-colors">
            <span>Search resources...</span>
            <div className="flex items-center gap-1 opacity-70">
              <kbd className="font-sans text-[10px] bg-background border border-border rounded px-1.5 py-0.5 shadow-sm">⌘</kbd>
              <kbd className="font-sans text-[10px] bg-background border border-border rounded px-1.5 py-0.5 shadow-sm">K</kbd>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end gap-4">
        <button className="relative text-text-muted hover:text-text-primary transition-colors">
          <Bell size={18} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full ring-2 ring-surface" />
        </button>
        <div className="w-8 h-8 rounded-full bg-surface-dim border border-border flex items-center justify-center text-text-muted overflow-hidden">
          {/* Using a placeholder avatar color/icon */}
          <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
