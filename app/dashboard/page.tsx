import * as React from "react";
import { fetchDashboardData } from "@/lib/mock-data";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { RequestVolumeChart } from "@/components/dashboard/RequestVolumeChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { SystemHealthGrid } from "@/components/dashboard/SystemHealthGrid";
import { ProviderStatusPanel } from "@/components/dashboard/ProviderStatusPanel";
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

  const weeklySparkline = data.weeklyChartData.map((d) => ({ value: d.requests }));

  return (
    <div className="p-6 max-w-7xl mx-auto w-full pb-20">
      <DashboardClient weeklySparkline={weeklySparkline}>
        <SystemHealthGrid />
        <ProviderStatusPanel statuses={providerStatuses} />
        <RequestVolumeChart data={data.weeklyChartData} />
        <RecentActivity items={data.recentActivity} />
      </DashboardClient>
    </div>
  );
}
