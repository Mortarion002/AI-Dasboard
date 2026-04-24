"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

type ChartProps = {
  data: { day: string; requests: number }[];
};

export function RequestVolumeChart({ data }: ChartProps) {
  return (
    <Card className="w-full flex flex-col p-0 overflow-hidden border border-border mt-4">
      <div className="flex items-center justify-between p-5 pb-0">
        <h3 className="label-text text-text-muted">REQUEST VOLUME (WEEK)</h3>
        <button className="text-text-muted hover:text-text-primary transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>
      <div className="h-[300px] w-full p-5 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3525CD" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#3525CD" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              tickFormatter={(value) => value === 0 ? '0' : `${value / 1000}k`}
              domain={[0, 20000]}
              ticks={[0, 5000, 10000, 15000, 20000]}
            />
            <RechartsTooltip 
              content={({ active, payload, label }) => {
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
              }}
            />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="#3525CD"
              fillOpacity={1}
              fill="url(#colorRequests)"
              strokeWidth={2}
              activeDot={{ r: 4, strokeWidth: 0, fill: "#3525CD" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
