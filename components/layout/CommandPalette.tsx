"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Command } from "cmdk";
import {
  Activity,
  ArrowRight,
  Key,
  LayoutDashboard,
  Moon,
  Search,
  Settings,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useUIStore } from "@/store/useUIStore";

const itemClass =
  "relative flex cursor-default select-none items-center rounded-lg px-2 py-2.5 text-sm outline-none aria-selected:bg-primary aria-selected:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 group transition-colors";

const groupHeadingClass =
  "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-text-muted mb-2";

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const isOpen = useUIStore((state) => state.isCommandPaletteOpen);
  const setOpen = useUIStore((state) => state.setCommandPaletteOpen);

  // Close palette whenever the route actually changes
  React.useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  // Navigate on pointer down — before cmdk can call preventDefault and swallow the click
  const go = React.useCallback(
    (href: string, e?: React.PointerEvent) => {
      e?.preventDefault();
      router.push(href);
    },
    [router]
  );

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "d" && (event.metaKey || event.ctrlKey) && isOpen) {
        event.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen, isOpen, setTheme, theme]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/45 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.16 }}
        className="z-50 w-full max-w-[600px]"
      >
        <Command
          className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
          loop
        >
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-text-muted" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
              }}
            />
            <kbd className="ml-2 pointer-events-none inline-flex h-5 items-center rounded border border-border bg-surface-dim px-1.5 font-mono text-[10px] font-medium text-text-muted">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-text-muted">
              No results found.
            </Command.Empty>

            {/* ── Navigate ── */}
            <Command.Group heading="Navigate" className={groupHeadingClass}>
              <Command.Item
                value="dashboard home overview"
                onSelect={() => go("/dashboard")}
                onPointerDown={(e) => go("/dashboard", e)}
                className={itemClass}
              >
                <LayoutDashboard className="mr-3 h-4 w-4 text-text-muted group-aria-selected:text-primary-foreground" />
                <span className="flex-1 font-medium">Dashboard</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
              <Command.Item
                value="activity logs requests inference history"
                onSelect={() => go("/activity")}
                onPointerDown={(e) => go("/activity", e)}
                className={itemClass}
              >
                <Activity className="mr-3 h-4 w-4 text-text-muted group-aria-selected:text-primary-foreground" />
                <span className="flex-1 font-medium">Activity Logs</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
              <Command.Item
                value="insights analytics alerts ai"
                onSelect={() => go("/insights")}
                onPointerDown={(e) => go("/insights", e)}
                className={itemClass}
              >
                <Sparkles className="mr-3 h-4 w-4 text-text-muted group-aria-selected:text-primary-foreground" />
                <span className="flex-1 font-medium">Insights</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
              <Command.Item
                value="settings preferences account profile billing"
                onSelect={() => go("/settings")}
                onPointerDown={(e) => go("/settings", e)}
                className={itemClass}
              >
                <Settings className="mr-3 h-4 w-4 text-text-muted group-aria-selected:text-primary-foreground" />
                <span className="flex-1 font-medium">Settings</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
            </Command.Group>

            {/* ── Quick actions ── */}
            <Command.Group heading="Quick actions" className={groupHeadingClass}>
              <Command.Item
                value="create api key generate token"
                onSelect={() => go("/settings?panel=api-keys")}
                onPointerDown={(e) => go("/settings?panel=api-keys", e)}
                className={itemClass}
              >
                <Key className="mr-3 h-4 w-4" />
                <span className="flex-1 font-medium">Create API Key</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
              <Command.Item
                value="go to insights analytics sparkles"
                onSelect={() => go("/insights")}
                onPointerDown={(e) => go("/insights", e)}
                className={itemClass}
              >
                <Sparkles className="mr-3 h-4 w-4" />
                <span className="flex-1 font-medium">Go to Insights</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
              <Command.Item
                value="open preferences settings configuration"
                onSelect={() => go("/settings?panel=preferences")}
                onPointerDown={(e) => go("/settings?panel=preferences", e)}
                className={itemClass}
              >
                <Settings className="mr-3 h-4 w-4" />
                <span className="flex-1 font-medium">Open Preferences</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
              <Command.Item
                value="toggle dark mode light theme"
                onSelect={() => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); }}
                onPointerDown={() => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); }}
                className={itemClass}
              >
                <Moon className="mr-3 h-4 w-4" />
                <span className="flex-1 font-medium">Toggle Dark Mode</span>
                <kbd className="ml-2 pointer-events-none inline-flex h-5 items-center rounded border border-border bg-surface-dim px-1.5 font-mono text-[10px] font-medium text-text-muted group-aria-selected:border-primary-foreground/30 group-aria-selected:bg-primary-foreground/10 group-aria-selected:text-primary-foreground">
                  Ctrl D
                </kbd>
              </Command.Item>
              <Command.Item
                value="invite team member user add"
                onSelect={() => go("/settings?panel=profile")}
                onPointerDown={(e) => go("/settings?panel=profile", e)}
                className={itemClass}
              >
                <UserPlus className="mr-3 h-4 w-4" />
                <span className="flex-1 font-medium">Invite Team Member</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[10px] text-text-muted">
            <span>Use arrow keys to navigate and Enter to select</span>
            <div className="font-semibold text-text-primary">AIOps Command</div>
          </div>
        </Command>
      </motion.div>
    </div>
  );
}
