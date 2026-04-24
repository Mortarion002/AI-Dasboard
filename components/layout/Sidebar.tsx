"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, LayoutDashboard, List, PanelLeftClose, PanelLeftOpen, Settings, Sparkles, SquareTerminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/useUIStore";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/activity", label: "Activity Logs", icon: List },
  { href: "/insights", label: "Insights", icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <motion.aside
      layout
      initial={false}
      animate={{ width: isSidebarCollapsed ? 64 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex flex-col h-full bg-surface border-r border-border shrink-0 z-20"
    >
      <div className="flex items-center h-16 shrink-0 px-3 border-b border-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground shrink-0 shadow-sm">
          <SquareTerminal size={18} />
        </div>
        <AnimatePresence initial={false}>
          {!isSidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="ml-3 overflow-hidden whitespace-nowrap"
            >
              <div className="font-semibold text-sm leading-tight text-text-primary">Core Systems</div>
              <div className="font-mono text-[10px] text-text-muted mt-0.5">v2.4.1-stable</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isSidebarCollapsed && (
        <div className="mx-3 mt-3 rounded-lg border border-border bg-surface-raised p-3">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase text-text-muted">
            <Activity size={13} />
            Live System
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="font-mono text-text-primary">99.98%</div>
              <div className="text-[10px] text-text-muted">uptime</div>
            </div>
            <div>
              <div className="font-mono text-text-primary">21ms</div>
              <div className="text-[10px] text-text-muted">edge p95</div>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 py-3 flex flex-col gap-1 overflow-hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className="px-2 block">
              <div
                className={cn(
                  "flex items-center h-10 px-2 rounded-lg transition-colors relative group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-text-muted hover:bg-surface-dim hover:text-text-primary"
                )}
              >
                <div className="flex items-center justify-center w-6 shrink-0">
                  <item.icon size={18} className={cn(isActive ? "text-primary-foreground" : "text-text-muted group-hover:text-text-primary", "transition-colors")} />
                </div>
                
                <AnimatePresence initial={false}>
                  {!isSidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="ml-3 label-text overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && !isSidebarCollapsed && (
                  <motion.div layoutId="sidebar-active" className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary-foreground" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-2 shrink-0 border-t border-border">
        <button
          onClick={toggleSidebar}
          className="flex items-center h-10 px-2 w-full rounded-lg text-text-muted hover:bg-surface-dim hover:text-text-primary transition-colors"
        >
          <div className="flex items-center justify-center w-6 shrink-0">
            {isSidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </div>
          <AnimatePresence initial={false}>
            {!isSidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="ml-3 label-text overflow-hidden whitespace-nowrap"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
