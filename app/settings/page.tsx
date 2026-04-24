import * as React from "react";
import { fetchDashboardData } from "@/lib/mock-data";
import { APIKeysTable } from "@/components/settings/APIKeysTable";
import { PreferencesCard } from "@/components/settings/PreferencesCard";
import { User, Key, Settings as SettingsIcon, CreditCard } from "lucide-react";

export const metadata = {
  title: "Settings | AIOps Command",
};

export default async function SettingsPage() {
  const data = await fetchDashboardData();

  return (
    <div className="flex h-full min-h-[calc(100vh-48px)]">
      {/* Secondary Nav */}
      <div className="w-[180px] shrink-0 border-r border-border bg-surface-dim/30 p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-4 px-2">Control Panel</h3>
        <nav className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-text-muted hover:text-text-primary hover:bg-surface-dim transition-colors">
            <User size={16} />
            Profile
          </button>
          <button className="flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium bg-primary-light text-primary transition-colors">
            <Key size={16} />
            API Keys
          </button>
          <button className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-text-muted hover:text-text-primary hover:bg-surface-dim transition-colors">
            <SettingsIcon size={16} />
            Preferences
          </button>
          <button className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-text-muted hover:text-text-primary hover:bg-surface-dim transition-colors">
            <CreditCard size={16} />
            Billing
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 pb-20 max-w-4xl">
        <APIKeysTable keys={data.apiKeys} />
        <PreferencesCard />
      </div>
    </div>
  );
}
