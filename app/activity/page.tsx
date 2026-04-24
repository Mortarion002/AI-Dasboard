import * as React from "react";
import { fetchDashboardData } from "@/lib/mock-data";
import { ActivityTable } from "@/components/activity/ActivityTable";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const metadata = {
  title: "Activity Logs | AIOps Command",
};

export default async function ActivityPage() {
  const data = await fetchDashboardData();

  return (
    <div className="p-6 max-w-7xl mx-auto w-full pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="headline-lg text-text-primary">Activity Logs</h1>
          <p className="text-text-muted text-sm mt-1">Real-time inference and transaction history</p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-sm font-normal text-text-primary transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Status: All
              <ChevronDown className="ml-1 h-4 w-4 text-text-muted" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Success</DropdownMenuItem>
              <DropdownMenuItem>Error</DropdownMenuItem>
              <DropdownMenuItem>Timeout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-sm font-normal text-text-primary transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Model: All
              <ChevronDown className="ml-1 h-4 w-4 text-text-muted" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>GPT-4 Turbo</DropdownMenuItem>
              <DropdownMenuItem>Claude-3 Opus</DropdownMenuItem>
              <DropdownMenuItem>Llama-3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="h-9 font-normal text-text-primary bg-surface border-border w-[140px] justify-start">
            <Calendar className="mr-2 h-4 w-4 text-text-muted" />
            <span className="text-text-muted">mm/dd/yyyy</span>
          </Button>

          <Button size="sm" className="h-9 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <ActivityTable data={data.activityLogs} />
      </div>
    </div>
  );
}
