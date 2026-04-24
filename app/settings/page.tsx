import * as React from "react";
import { fetchDashboardData } from "@/lib/mock-data";
import { SettingsWorkspace } from "@/components/settings/SettingsWorkspace";

export const metadata = {
  title: "Settings | AIOps Command",
};

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ panel?: string }>;
}) {
  const [data, params] = await Promise.all([fetchDashboardData(), searchParams]);

  return <SettingsWorkspace apiKeys={data.apiKeys} initialPanel={params.panel ?? "api-keys"} />;
}
