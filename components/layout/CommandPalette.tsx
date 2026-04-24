"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, History, Key, Sparkles, Moon, UserPlus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useUIStore } from "@/store/useUIStore";

export function CommandPalette() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const isOpen = useUIStore((state) => state.isCommandPaletteOpen);
  const setOpen = useUIStore((state) => state.setCommandPaletteOpen);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "d" && (e.metaKey || e.ctrlKey) && isOpen) {
        e.preventDefault();
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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-[600px] z-50"
      >
        <Command 
          className="bg-surface rounded-xl shadow-2xl overflow-hidden border border-border"
          loop
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <div className="flex items-center border-b border-border px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 text-primary" />
            <Command.Input 
              autoFocus 
              placeholder="Type a command or search..." 
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-50 text-text-primary"
            />
            <kbd className="ml-2 pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-border bg-surface-dim px-1.5 font-mono text-[10px] font-medium text-text-muted opacity-100">
              <span className="text-xs">ESC</span>
            </kbd>
          </div>
          
          <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-text-muted">
              No results found.
            </Command.Empty>

            <Command.Group heading="RECENT SEARCHES" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-text-muted [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider mb-2">
              <Command.Item 
                onSelect={() => setOpen(false)}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-[#E2DFFF] aria-selected:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 group transition-colors"
              >
                <History className="mr-3 h-4 w-4 text-text-muted group-aria-selected:text-primary" />
                <span className="flex-1 text-text-primary group-aria-selected:text-primary font-medium">node-cluster-us-east-1</span>
                <span className="text-[10px] text-text-muted group-aria-selected:text-primary/70">Resource</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-aria-selected:opacity-100 text-primary transition-opacity" />
              </Command.Item>
              <Command.Item 
                onSelect={() => setOpen(false)}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-[#E2DFFF] aria-selected:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 group transition-colors"
              >
                <History className="mr-3 h-4 w-4 text-text-muted group-aria-selected:text-primary" />
                <span className="flex-1 text-text-primary group-aria-selected:text-primary font-medium">Error Rate &gt; 5%</span>
                <span className="text-[10px] text-text-muted group-aria-selected:text-primary/70">Alert Rule</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-aria-selected:opacity-100 text-primary transition-opacity" />
              </Command.Item>
            </Command.Group>

            <Command.Group heading="QUICK ACTIONS" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-text-muted [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
              <Command.Item 
                onSelect={() => { router.push('/settings'); setOpen(false); }}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-[#E2DFFF] aria-selected:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 group transition-colors"
              >
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded bg-surface-dim text-text-muted group-aria-selected:bg-primary group-aria-selected:text-primary-foreground transition-colors">
                  <Key className="h-3.5 w-3.5" />
                </div>
                <span className="flex-1 text-text-primary group-aria-selected:text-primary font-medium">Create API Key</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-aria-selected:opacity-100 text-primary transition-opacity" />
              </Command.Item>
              
              <Command.Item 
                onSelect={() => { router.push('/insights'); setOpen(false); }}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-[#E2DFFF] aria-selected:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 group transition-colors"
              >
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded bg-surface-dim text-text-muted group-aria-selected:bg-primary group-aria-selected:text-primary-foreground transition-colors">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span className="flex-1 text-text-primary group-aria-selected:text-primary font-medium">Go to Insights</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-aria-selected:opacity-100 text-primary transition-opacity" />
              </Command.Item>
              
              <Command.Item 
                onSelect={() => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); }}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-[#E2DFFF] aria-selected:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 group transition-colors"
              >
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded bg-surface-dim text-text-muted group-aria-selected:bg-primary group-aria-selected:text-primary-foreground transition-colors">
                  <Moon className="h-3.5 w-3.5" />
                </div>
                <span className="flex-1 text-text-primary group-aria-selected:text-primary font-medium">Toggle Dark Mode</span>
                <kbd className="ml-2 pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-border bg-surface-dim px-1.5 font-mono text-[10px] font-medium text-text-muted opacity-100 group-aria-selected:border-primary/20">
                  ⌘D
                </kbd>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-aria-selected:opacity-100 text-primary transition-opacity" />
              </Command.Item>

              <Command.Item 
                onSelect={() => { 
                  // In a real app, this would trigger a toast
                  console.log("Invite Team Member"); 
                  setOpen(false); 
                }}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-[#E2DFFF] aria-selected:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 group transition-colors"
              >
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded bg-surface-dim text-text-muted group-aria-selected:bg-primary group-aria-selected:text-primary-foreground transition-colors">
                  <UserPlus className="h-3.5 w-3.5" />
                </div>
                <span className="flex-1 text-text-primary group-aria-selected:text-primary font-medium">Invite Team Member</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-aria-selected:opacity-100 text-primary transition-opacity" />
              </Command.Item>
            </Command.Group>
          </Command.List>
          
          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[10px] text-text-muted">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1"><kbd className="bg-surface-dim px-1 rounded border border-border">↑</kbd> <kbd className="bg-surface-dim px-1 rounded border border-border">↓</kbd> to navigate</span>
              <span className="flex items-center gap-1"><kbd className="bg-surface-dim px-1 rounded border border-border">↵</kbd> to select</span>
            </div>
            <div className="font-semibold text-primary">AIOps Command</div>
          </div>
        </Command>
      </motion.div>
    </div>
  );
}
