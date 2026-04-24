"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { ArrowRight, History, Key, Moon, Search, Settings, Sparkles, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useUIStore } from "@/store/useUIStore";

const itemClass =
  "relative flex cursor-default select-none items-center rounded-lg px-2 py-2.5 text-sm outline-none aria-selected:bg-primary aria-selected:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 group transition-colors";

export function CommandPalette() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const isOpen = useUIStore((state) => state.isCommandPaletteOpen);
  const setOpen = useUIStore((state) => state.setCommandPaletteOpen);

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
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/45 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.16 }}
        className="z-50 w-full max-w-[600px]"
      >
        <Command className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl" loop>
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-text-muted" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
              onKeyDown={(event) => {
                if (event.key === "Escape") setOpen(false);
              }}
            />
            <kbd className="ml-2 pointer-events-none inline-flex h-5 items-center rounded border border-border bg-surface-dim px-1.5 font-mono text-[10px] font-medium text-text-muted">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-text-muted">No results found.</Command.Empty>

            <Command.Group heading="Recent searches" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-text-muted mb-2">
              <Command.Item onSelect={() => setOpen(false)} className={itemClass}>
                <History className="mr-3 h-4 w-4 text-text-muted group-aria-selected:text-primary-foreground" />
                <span className="flex-1 font-medium">node-cluster-us-east-1</span>
                <span className="text-[10px] text-text-muted group-aria-selected:text-primary-foreground/70">Resource</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
              <Command.Item onSelect={() => setOpen(false)} className={itemClass}>
                <History className="mr-3 h-4 w-4 text-text-muted group-aria-selected:text-primary-foreground" />
                <span className="flex-1 font-medium">Error Rate &gt; 5%</span>
                <span className="text-[10px] text-text-muted group-aria-selected:text-primary-foreground/70">Alert rule</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Quick actions" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-text-muted">
              <Command.Item onSelect={() => { router.push("/settings?panel=api-keys"); setOpen(false); }} className={itemClass}>
                <Key className="mr-3 h-4 w-4" />
                <span className="flex-1 font-medium">Create API Key</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
              <Command.Item onSelect={() => { router.push("/insights"); setOpen(false); }} className={itemClass}>
                <Sparkles className="mr-3 h-4 w-4" />
                <span className="flex-1 font-medium">Go to Insights</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
              <Command.Item onSelect={() => { router.push("/settings?panel=preferences"); setOpen(false); }} className={itemClass}>
                <Settings className="mr-3 h-4 w-4" />
                <span className="flex-1 font-medium">Open Preferences</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
              <Command.Item onSelect={() => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); }} className={itemClass}>
                <Moon className="mr-3 h-4 w-4" />
                <span className="flex-1 font-medium">Toggle Dark Mode</span>
                <kbd className="ml-2 pointer-events-none inline-flex h-5 items-center rounded border border-border bg-surface-dim px-1.5 font-mono text-[10px] font-medium text-text-muted group-aria-selected:border-primary-foreground/30 group-aria-selected:bg-primary-foreground/10 group-aria-selected:text-primary-foreground">
                  Ctrl D
                </kbd>
              </Command.Item>
              <Command.Item onSelect={() => setOpen(false)} className={itemClass}>
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
