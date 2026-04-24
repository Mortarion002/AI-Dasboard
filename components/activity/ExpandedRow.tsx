"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { ActivityLog } from "@/lib/mock-data";

type ExpandedRowProps = {
  isExpanded: boolean;
  data: ActivityLog;
};

export function ExpandedRow({ isExpanded, data }: ExpandedRowProps) {
  const [copiedPrompt, setCopiedPrompt] = React.useState(false);
  const [copiedResponse, setCopiedResponse] = React.useState(false);

  const handleCopy = (text: string, type: "prompt" | "response") => {
    navigator.clipboard.writeText(text);
    if (type === "prompt") {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } else {
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
  };

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.tr
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="border-b border-border bg-surface-dim/30 overflow-hidden"
        >
          <td colSpan={6} className="p-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="flex flex-col md:flex-row w-full divide-y md:divide-y-0 md:divide-x divide-border"
            >
              {/* User Prompt Pane */}
              <div className="flex-1 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="label-text text-text-muted">USER PROMPT</h4>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleCopy(data.fullPrompt, "prompt"); }}
                    className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
                  >
                    {copiedPrompt ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    {copiedPrompt ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="bg-surface-dim border border-border rounded-md p-3 max-h-[300px] overflow-y-auto">
                  <pre className="font-mono text-[13px] text-text-primary whitespace-pre-wrap">
                    {data.fullPrompt}
                  </pre>
                </div>
              </div>

              {/* AI Response Pane */}
              <div className="flex-1 p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="label-text text-text-muted">AI RESPONSE</h4>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleCopy(data.fullResponse, "response"); }}
                    className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
                  >
                    {copiedResponse ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    {copiedResponse ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="bg-surface-dim border border-border rounded-md p-3 max-h-[300px] overflow-y-auto flex-1 mb-4">
                  <pre className={cn("font-mono text-[13px] whitespace-pre-wrap", data.isTimeout ? "text-error" : "text-text-primary")}>
                    {data.fullResponse}
                  </pre>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-text-muted">Tokens:</span>
                    <span className="text-text-primary">{data.tokens} / 8192</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-warning shrink-0" />
                    <span className="text-text-muted">Cost:</span>
                    <span className="text-text-primary">{data.cost}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </td>
        </motion.tr>
      )}
    </AnimatePresence>
  );
}
