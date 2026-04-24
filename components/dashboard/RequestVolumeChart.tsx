"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Grid2X2, LineChart as LineChartIcon, MoreVertical, Waves } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartProps = {
  data: { day: string; requests: number }[];
};

type ChartMode = "area" | "line" | "bar";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value?: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-border shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-lg p-3 text-sm">
        <div className="text-text-muted mb-1 text-xs">{label}</div>
        <div className="font-semibold text-primary">
          {payload[0].value?.toLocaleString()} requests
        </div>
      </div>
    );
  }

  return null;
}

function ChartAxes({ showGrid }: { showGrid: boolean }) {
  return (
    <>
      {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />}
      <XAxis
        dataKey="day"
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 11, fill: "var(--text-muted)" }}
        dy={10}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 11, fill: "var(--text-muted)" }}
        tickFormatter={(value) => (value === 0 ? "0" : `${Number(value) / 1000}k`)}
        domain={[0, 20000]}
        ticks={[0, 5000, 10000, 15000, 20000]}
      />
      <RechartsTooltip content={<ChartTooltip />} />
    </>
  );
}

export function RequestVolumeChart({ data }: ChartProps) {
  const [chartMode, setChartMode] = React.useState<ChartMode>("area");
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
      <div className="flex items-center justify-between p-5 pb-0">
        <div>
          <h3 className="label-text text-text-muted">REQUEST VOLUME (WEEK)</h3>
          <p className="mt-1 text-xs text-text-muted">
            Viewing {chartMode} chart {showGrid ? "with" : "without"} gridlines
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Open chart options">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Chart view</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setChartMode("area")}>
              <Waves className="mr-2 h-4 w-4" />
              Area chart
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setChartMode("line")}>
              <LineChartIcon className="mr-2 h-4 w-4" />
              Line chart
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setChartMode("bar")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Bar chart
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowGrid((value) => !value)}>
              <Grid2X2 className="mr-2 h-4 w-4" />
              {showGrid ? "Hide" : "Show"} gridlines
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportCsv}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="h-[320px] w-full p-5 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartMode === "area" ? (
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--text-primary)" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="var(--text-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <ChartAxes showGrid={showGrid} />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="var(--text-primary)"
                fillOpacity={1}
                fill="url(#colorRequests)"
                strokeWidth={2}
                activeDot={{ r: 4, strokeWidth: 0, fill: "var(--text-primary)" }}
              />
            </AreaChart>
          ) : chartMode === "line" ? (
            <LineChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <ChartAxes showGrid={showGrid} />
              <Line
                type="monotone"
                dataKey="requests"
                stroke="var(--text-primary)"
                strokeWidth={2}
                dot={{ r: 3, fill: "var(--surface)", stroke: "var(--text-primary)", strokeWidth: 1.5 }}
                activeDot={{ r: 4, strokeWidth: 0, fill: "var(--text-primary)" }}
              />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <ChartAxes showGrid={showGrid} />
              <Bar dataKey="requests" fill="var(--text-primary)" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
