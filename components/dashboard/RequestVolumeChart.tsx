"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { BarChart3, Download, Grid2X2, LineChart as LineChartIcon, MoreVertical, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RequestChartMode } from "@/components/dashboard/RequestVolumeChartCanvas";

const RequestVolumeChartCanvas = dynamic(
  () => import("@/components/dashboard/RequestVolumeChartCanvas").then((mod) => mod.RequestVolumeChartCanvas),
  {
    ssr: false,
    loading: () => <div className="h-full w-full rounded-lg bg-surface-dim/40" />,
  }
);

type ChartProps = {
  data: { day: string; requests: number }[];
};

export function RequestVolumeChart({ data }: ChartProps) {
  const [chartMode, setChartMode] = React.useState<RequestChartMode>("area");
  const [showGrid, setShowGrid] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);

  function exportCsv() {
    const csv = ["day,requests", ...data.map((item) => `${item.day},${item.requests}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "request-volume-week.csv";
    link.click();
    URL.revokeObjectURL(url);
    setMenuOpen(false);
  }

  function selectMode(mode: RequestChartMode) {
    setChartMode(mode);
    setMenuOpen(false);
  }

  return (
    <Card className="w-full flex flex-col p-0 overflow-hidden border border-border mt-4">
      <div className="flex items-center justify-between p-5 pb-0">
        <div>
          <h3 className="label-text text-text-muted">REQUEST VOLUME (WEEK)</h3>
          <p className="mt-1 text-xs text-text-muted">
            Viewing {chartMode} chart {showGrid ? "with" : "without"} gridlines
          </p>
        </div>
        <div className="relative">
          <button
            type="button"
            aria-label="Open chart options"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-dim hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <MoreVertical size={16} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 z-20 w-48 rounded-lg border border-border bg-popover p-1 text-sm text-popover-foreground shadow-lg">
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Chart view</div>
              <ChartMenuButton onClick={() => selectMode("area")}>
                <Waves className="mr-2 h-4 w-4" />
                Area chart
              </ChartMenuButton>
              <ChartMenuButton onClick={() => selectMode("line")}>
                <LineChartIcon className="mr-2 h-4 w-4" />
                Line chart
              </ChartMenuButton>
              <ChartMenuButton onClick={() => selectMode("bar")}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Bar chart
              </ChartMenuButton>
              <div className="-mx-1 my-1 h-px bg-border" />
              <ChartMenuButton onClick={() => setShowGrid((value) => !value)}>
                <Grid2X2 className="mr-2 h-4 w-4" />
                {showGrid ? "Hide" : "Show"} gridlines
              </ChartMenuButton>
              <ChartMenuButton onClick={exportCsv}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </ChartMenuButton>
            </div>
          )}
        </div>
      </div>
      <div className="h-[320px] min-h-[320px] w-full min-w-0 p-5 pt-4">
        <RequestVolumeChartCanvas data={data} chartMode={chartMode} showGrid={showGrid} />
      </div>
    </Card>
  );
}

function ChartMenuButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {children}
    </button>
  );
}
