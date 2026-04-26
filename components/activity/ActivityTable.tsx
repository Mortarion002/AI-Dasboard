"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { StatusDot } from "@/components/shared/StatusDot";
import { ExpandedRow } from "@/components/activity/ExpandedRow";
import { ActivityLog } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type ActivityTableProps = {
  data: ActivityLog[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export function ActivityTable({ data, totalCount, currentPage, pageSize, onPrevPage, onNextPage }: ActivityTableProps) {
  const [expandedRowId, setExpandedRowId] = React.useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  const startEntry = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalCount);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (!data || data.length === 0) {
    return (
      <div className="w-full">
        <div className="w-full flex items-center justify-center py-12 text-sm text-text-muted">
          No activity logs found.
        </div>
        <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-surface-dim/30">
          <div className="text-xs text-text-muted">Showing 0 entries</div>
          <div className="flex items-center gap-2">
            <button type="button" disabled className="px-3 py-1.5 rounded border border-border bg-surface text-xs font-medium text-text-primary hover:bg-surface-dim transition-colors disabled:opacity-50">
              Previous
            </button>
            <button type="button" disabled className="px-3 py-1.5 rounded border border-border bg-surface text-xs font-medium text-text-primary hover:bg-surface-dim transition-colors disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-border bg-surface text-text-muted text-[13px] font-medium">
              <th className="px-5 py-3 font-medium w-[80px]">Status</th>
              <th className="px-5 py-3 font-medium">Req ID</th>
              <th className="px-5 py-3 font-medium">Prompt Snippet</th>
              <th className="px-5 py-3 font-medium">Model</th>
              <th className="px-5 py-3 font-medium">Latency</th>
              <th className="px-5 py-3 font-medium text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="bg-surface">
            {data.map((item, index) => {
              const isExpanded = expandedRowId === item.id;

              return (
                <React.Fragment key={item.id}>
                  <motion.tr
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onClick={() => toggleRow(item.id)}
                    className={cn(
                      "border-b border-border hover:bg-surface-dim/50 cursor-pointer transition-colors group",
                      isExpanded && "bg-surface-dim/30 border-b-transparent"
                    )}
                  >
                    <td className="px-5 py-3.5">
                      <StatusDot status={item.status} />
                    </td>
                    <td className={cn("px-5 py-3.5 font-mono text-[13px]", isExpanded ? "font-bold text-text-primary" : "text-text-primary")}>
                      {item.reqId}
                    </td>
                    <td className="px-5 py-3.5 text-text-primary max-w-[250px] truncate">
                      {item.promptSnippet}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-surface-dim border border-border text-[12px] font-medium text-text-primary">
                        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0",
                          item.model.includes("GPT") ? "bg-text-primary" :
                          item.model.includes("Claude") ? "bg-text-muted" : "bg-success"
                        )} />
                        {item.model}
                      </div>
                    </td>
                    <td className={cn("px-5 py-3.5 font-mono text-[13px]", item.isTimeout ? "text-error" : "text-text-primary")}>
                      {item.latency}
                    </td>
                    <td className="px-5 py-3.5 text-right text-text-muted text-[13px]">
                      {item.timestamp}
                    </td>
                  </motion.tr>
                  <ExpandedRow isExpanded={isExpanded} data={item} />
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-surface-dim/30">
        <div className="text-xs text-text-muted">
          {totalCount === 0
            ? "No entries"
            : `Showing ${startEntry} to ${endEntry} of ${totalCount} ${totalCount === 1 ? "entry" : "entries"}`}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevPage}
            disabled={currentPage <= 1}
            className="px-3 py-1.5 rounded border border-border bg-surface text-xs font-medium text-text-primary hover:bg-surface-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNextPage}
            disabled={currentPage >= totalPages}
            className="px-3 py-1.5 rounded border border-border bg-surface text-xs font-medium text-text-primary hover:bg-surface-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
