"use client";

import * as React from "react";
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

export type RequestChartMode = "area" | "line" | "bar";

type RequestVolumeChartCanvasProps = {
  data: { day: string; requests: number }[];
  chartMode: RequestChartMode;
  showGrid: boolean;
};

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

export function RequestVolumeChartCanvas({ data, chartMode, showGrid }: RequestVolumeChartCanvasProps) {
  if (chartMode === "area") {
    return (
      <ResponsiveContainer width="100%" height="100%">
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
      </ResponsiveContainer>
    );
  }

  if (chartMode === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
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
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
        <ChartAxes showGrid={showGrid} />
        <Bar dataKey="requests" fill="var(--text-primary)" radius={[4, 4, 0, 0]} barSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}
