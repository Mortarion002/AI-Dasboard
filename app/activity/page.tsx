import * as React from "react";
import { fetchDashboardData } from "@/lib/mock-data";
import { ActivityLogsClient } from "@/components/activity/ActivityLogsClient";

export const metadata = {
  title: "Activity Logs | AIOps Command",
};

export default async function ActivityPage() {
  const data = await fetchDashboardData();

  return (
    <div className="p-6 max-w-7xl mx-auto w-full pb-20">
      <ActivityLogsClient allLogs={data.activityLogs} />
    </div>
  );
}
