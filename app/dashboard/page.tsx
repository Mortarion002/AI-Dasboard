import * as React from "react";
import { fetchDashboardData } from "@/lib/mock-data";
import { KPICard } from "@/components/dashboard/KPICard";
import { RequestVolumeChart } from "@/components/dashboard/RequestVolumeChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { SystemHealthGrid } from "@/components/dashboard/SystemHealthGrid";
import { ProviderStatusPanel } from "@/components/dashboard/ProviderStatusPanel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, ChevronDown, Layers, Activity, AlertCircle, Clock } from "lucide-react";
import { getLiveProviderStatuses } from "@/lib/provider-status";

export const metadata = {
  title: "Dashboard | AIOps Command",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [data, providerStatuses] = await Promise.all([
    fetchDashboardData(),
    getLiveProviderStatuses(),
  ]);

  return (
    <div className="p-6 max-w-7xl mx-auto w-full pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="headline-lg text-text-primary">Overview</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-sm font-normal text-text-muted transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Calendar className="mr-1 h-4 w-4" />
            Last 7 Days
            <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem>Today</DropdownMenuItem>
            <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
            <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
            <DropdownMenuItem>All Time</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <KPICard
          index={0}
          title="TOTAL REQUESTS"
          value={data.kpiMetrics.totalRequests}
          icon={<Layers size={16} />}
          badge={<span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-success/10 text-success ml-2">+12%</span>}
        />
        <KPICard
          index={1}
          title="TOKEN USAGE"
          value={data.kpiMetrics.tokenUsage}
          icon={<Activity size={16} />}
          sparklineData={data.weeklyChartData.map(d => ({ value: d.requests }))}
        />
        <KPICard
          index={2}
          title="AVG LATENCY"
          value={data.kpiMetrics.avgLatency}
          valueClassName="text-text-primary"
          icon={<Clock size={16} />}
        />
        <KPICard
          index={3}
          title="ERROR RATE"
          value={data.kpiMetrics.errorRate}
          icon={<AlertCircle size={16} />}
        />
      </div>

      <SystemHealthGrid />
      <ProviderStatusPanel statuses={providerStatuses} />
      <RequestVolumeChart data={data.weeklyChartData} />
      <RecentActivity items={data.recentActivity} />
    </div>
  );
}
