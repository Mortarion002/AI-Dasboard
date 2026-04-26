"use client";

import * as React from "react";
import { Download, Calendar, ChevronDown, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ActivityTable } from "@/components/activity/ActivityTable";
import { ActivityLog } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;

type StatusFilter = "all" | "success" | "error" | "timeout";

const STATUS_LABELS: Record<StatusFilter, string> = {
  all: "All",
  success: "Success",
  error: "Error",
  timeout: "Timeout",
};

export function ActivityLogsClient({ allLogs }: { allLogs: ActivityLog[] }) {
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");
  const [modelFilter, setModelFilter] = React.useState<string>("all");
  const [dateFilter, setDateFilter] = React.useState<string>("");
  const [page, setPage] = React.useState(1);

  const models = React.useMemo(
    () => Array.from(new Set(allLogs.map((l) => l.model))).sort(),
    [allLogs]
  );

  const filtered = React.useMemo(() => {
    return allLogs.filter((log) => {
      if (statusFilter === "success" && log.status !== "success") return false;
      if (statusFilter === "error" && (log.status !== "error" || log.isTimeout)) return false;
      if (statusFilter === "timeout" && !log.isTimeout) return false;
      if (modelFilter !== "all" && log.model !== modelFilter) return false;
      if (dateFilter && log.date !== dateFilter) return false;
      return true;
    });
  }, [allLogs, statusFilter, modelFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  React.useEffect(() => {
    setPage(1);
  }, [statusFilter, modelFilter, dateFilter]);

  const handleExport = () => {
    const headers = ["Req ID", "Status", "Model", "Latency", "Date", "Timestamp", "Tokens", "Cost", "Prompt Snippet"];
    const rows = filtered.map((l) => [
      l.reqId,
      l.isTimeout ? "timeout" : l.status,
      l.model,
      l.latency,
      l.date,
      l.timestamp,
      l.tokens,
      l.cost,
      l.promptSnippet,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "activity-logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const triggerClass =
    "inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-sm font-normal text-text-primary transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="headline-lg text-text-primary">Activity Logs</h1>
          <p className="text-text-muted text-sm mt-1">Real-time inference and transaction history</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Status filter */}
          <DropdownMenu>
            <DropdownMenuTrigger className={triggerClass}>
              Status: {STATUS_LABELS[statusFilter]}
              <ChevronDown className="ml-1 h-4 w-4 text-text-muted" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(Object.keys(STATUS_LABELS) as StatusFilter[]).map((s) => (
                <DropdownMenuItem
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(statusFilter === s && "font-semibold")}
                >
                  {STATUS_LABELS[s]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Model filter */}
          <DropdownMenu>
            <DropdownMenuTrigger className={triggerClass}>
              Model: {modelFilter === "all" ? "All" : modelFilter}
              <ChevronDown className="ml-1 h-4 w-4 text-text-muted" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setModelFilter("all")}
                className={cn(modelFilter === "all" && "font-semibold")}
              >
                All
              </DropdownMenuItem>
              {models.map((m) => (
                <DropdownMenuItem
                  key={m}
                  onClick={() => setModelFilter(m)}
                  className={cn(modelFilter === m && "font-semibold")}
                >
                  {m}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Date filter */}
          <div className="relative h-9">
            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none z-10" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={cn(
                "h-9 rounded-md border border-border bg-surface text-sm font-normal text-text-primary",
                "pl-8 focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer",
                dateFilter ? "pr-7 w-[170px]" : "pr-2 w-[155px]",
                !dateFilter && "text-text-muted"
              )}
            />
            {dateFilter && (
              <button
                type="button"
                onClick={() => setDateFilter("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                aria-label="Clear date"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Export */}
          <Button
            type="button"
            size="sm"
            onClick={handleExport}
            className="h-9 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <ActivityTable
          data={paginated}
          totalCount={filtered.length}
          currentPage={safePage}
          pageSize={PAGE_SIZE}
          onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
          onNextPage={() => setPage((p) => Math.min(totalPages, p + 1))}
        />
      </div>
    </>
  );
}
