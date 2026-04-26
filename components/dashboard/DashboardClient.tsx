"use client";

import * as React from "react";
import { Calendar, ChevronDown, Layers, Activity, AlertCircle, Clock } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { KPICard } from "@/components/dashboard/KPICard";
import { kpiByRange, KPIRange, KPISnapshot } from "@/lib/mock-data";

const RANGES: { key: KPIRange; label: string }[] = [
  { key: "today",   label: "Today"       },
  { key: "last7",   label: "Last 7 Days" },
  { key: "last30",  label: "Last 30 Days"},
  { key: "allTime", label: "All Time"    },
];

function RequestsTooltip({ snap }: { snap: KPISnapshot }) {
  return (
    <div className="p-3 space-y-1.5 text-xs">
      <div className="font-semibold text-text-primary">Total Requests</div>
      <div className="text-text-muted">{snap.requestsDetail}</div>
      {snap.requestsChange && (
        <div className="text-success font-medium">{snap.requestsChange} vs prior period</div>
      )}
    </div>
  );
}

function TokenTooltip({ snap }: { snap: KPISnapshot }) {
  return (
    <div className="p-3 space-y-1.5 text-xs">
      <div className="font-semibold text-text-primary">Token Usage</div>
      <div className="text-text-muted">{snap.tokenDetail}</div>
      {snap.tokenChange && (
        <div className="text-success font-medium">{snap.tokenChange} vs prior period</div>
      )}
    </div>
  );
}

function LatencyTooltip({ snap }: { snap: KPISnapshot }) {
  return (
    <div className="p-3 space-y-1.5 text-xs">
      <div className="font-semibold text-text-primary">Latency Breakdown</div>
      <div className="flex justify-between gap-4">
        <span className="text-text-muted">p50</span>
        <span className="font-mono text-text-primary">{snap.latencyP50}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-text-muted">p95</span>
        <span className="font-mono text-text-primary">{snap.latencyP95}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-text-muted">p99</span>
        <span className="font-mono text-text-primary">{snap.latencyP99}</span>
      </div>
    </div>
  );
}

function ErrorTooltip({ snap }: { snap: KPISnapshot }) {
  return (
    <div className="p-3 space-y-1.5 text-xs">
      <div className="font-semibold text-text-primary">Error Breakdown</div>
      <div className="flex justify-between gap-4">
        <span className="text-text-muted">Errors</span>
        <span className="font-mono text-text-primary">{snap.errorCount}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-text-muted">Timeouts</span>
        <span className="font-mono text-text-primary">{snap.timeoutCount}</span>
      </div>
    </div>
  );
}

type Props = {
  weeklySparkline: { value: number }[];
  children: React.ReactNode;
};

export function DashboardClient({ weeklySparkline, children }: Props) {
  const [range, setRange] = React.useState<KPIRange>("last7");
  const snap = kpiByRange[range];
  const currentLabel = RANGES.find((r) => r.key === range)?.label ?? "Last 7 Days";

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="headline-lg text-text-primary">Overview</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-sm font-normal text-text-muted transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Calendar className="mr-1 h-4 w-4" />
            {currentLabel}
            <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            {RANGES.map(({ key, label }) => (
              <DropdownMenuItem
                key={key}
                onClick={() => setRange(key)}
                className={range === key ? "font-semibold" : ""}
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <KPICard
          index={0}
          title="TOTAL REQUESTS"
          value={snap.totalRequests}
          icon={<Layers size={16} />}
          badge={
            snap.requestsChange ? (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-success/10 text-success ml-2">
                {snap.requestsChange}
              </span>
            ) : undefined
          }
          tooltip={<RequestsTooltip snap={snap} />}
        />
        <KPICard
          index={1}
          title="TOKEN USAGE"
          value={snap.tokenUsage}
          icon={<Activity size={16} />}
          sparklineData={weeklySparkline}
          badge={
            snap.tokenChange ? (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-success/10 text-success ml-2">
                {snap.tokenChange}
              </span>
            ) : undefined
          }
          tooltip={<TokenTooltip snap={snap} />}
        />
        <KPICard
          index={2}
          title="AVG LATENCY"
          value={snap.avgLatency}
          valueClassName="text-text-primary"
          icon={<Clock size={16} />}
          tooltip={<LatencyTooltip snap={snap} />}
        />
        <KPICard
          index={3}
          title="ERROR RATE"
          value={snap.errorRate}
          icon={<AlertCircle size={16} />}
          tooltip={<ErrorTooltip snap={snap} />}
        />
      </div>

      {children}
    </>
  );
}
