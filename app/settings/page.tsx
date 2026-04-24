import * as React from "react";
import { fetchDashboardData } from "@/lib/mock-data";
import { SettingsWorkspace } from "@/components/settings/SettingsWorkspace";
import { getOperatorProfile } from "@/lib/db";

export const metadata = {
  title: "Settings | AIOps Command",
};

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ panel?: string }>;
}) {
  const [data, params, profile] = await Promise.all([
    fetchDashboardData(),
    searchParams,
    Promise.resolve(getOperatorProfile()),
  ]);

  return <SettingsWorkspace apiKeys={data.apiKeys} initialPanel={params.panel ?? "api-keys"} profile={profile} />;
}
