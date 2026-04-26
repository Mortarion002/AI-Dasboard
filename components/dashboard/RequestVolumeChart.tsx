"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { BarChart3, Download, Grid2X2, LineChart as LineChartIcon, MoreVertical, Waves } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  function exportCsv() {
    const csv = ["day,requests", ...data.map((item) => `${item.day},${item.requests}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "request-volume-week.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card className="w-full flex flex-col p-0 overflow-hidden border border-border mt-4">
      <div className="relative z-10 flex items-center justify-between p-5 pb-0">
        <div>
          <h3 className="label-text text-text-muted">REQUEST VOLUME (WEEK)</h3>
          <p className="mt-1 text-xs text-text-muted">
            Viewing {chartMode} chart {showGrid ? "with" : "without"} gridlines
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Open chart options"
            className="inline-flex size-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-dim hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MoreVertical size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Chart view</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => setChartMode("area")}
              className={chartMode === "area" ? "font-semibold" : ""}
            >
              <Waves className="mr-2 h-4 w-4" />
              Area chart
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setChartMode("line")}
              className={chartMode === "line" ? "font-semibold" : ""}
            >
              <LineChartIcon className="mr-2 h-4 w-4" />
              Line chart
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setChartMode("bar")}
              className={chartMode === "bar" ? "font-semibold" : ""}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Bar chart
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
              <Grid2X2 className="mr-2 h-4 w-4" />
              Gridlines
            </DropdownMenuCheckboxItem>
            <DropdownMenuItem onClick={exportCsv}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative z-0 h-[320px] min-h-[320px] w-full min-w-0 p-5 pt-4">
        <RequestVolumeChartCanvas data={data} chartMode={chartMode} showGrid={showGrid} />
      </div>
    </Card>
  );
}
