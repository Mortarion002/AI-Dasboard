import * as React from "react";
import { fetchDashboardData } from "@/lib/mock-data";
import { AlertBanner } from "@/components/insights/AlertBanner";
import { ExecutiveSummary } from "@/components/insights/ExecutiveSummary";
import { ModelUsageCard } from "@/components/insights/ModelUsageCard";
import { TopicsChart } from "@/components/insights/TopicsChart";
import { ExportButton } from "@/components/insights/ExportButton";

export const metadata = {
  title: "System Insights | AIOps Command",
};

export default async function InsightsPage() {
  const data = await fetchDashboardData();

  return (
    <div className="p-6 max-w-7xl mx-auto w-full pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="headline-lg text-text-primary">System Insights</h1>
        <ExportButton data={data} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <AlertBanner 
          type={data.insightAlerts[0].type as "error" | "success"} 
          title={data.insightAlerts[0].title} 
          description={data.insightAlerts[0].description} 
        />
        <AlertBanner 
          type={data.insightAlerts[1].type as "error" | "success"} 
          title={data.insightAlerts[1].title} 
          description={data.insightAlerts[1].description} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ExecutiveSummary />
        <ModelUsageCard data={data.modelUsage} />
      </div>

      <TopicsChart data={data.topTopics} />
    </div>
  );
}
