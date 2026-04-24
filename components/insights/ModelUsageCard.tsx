"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

import { ModelUsageData } from "@/lib/mock-data";

type ModelUsageProps = {
  data: ModelUsageData;
};

export function ModelUsageCard({ data }: ModelUsageProps) {
  return (
    <Card className="p-5 flex flex-col h-full hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-shadow">
      <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
        <h3 className="label-text text-text-muted">MODEL USAGE</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="flex-1 flex flex-col items-center justify-center p-4 bg-primary/5 rounded-xl border border-primary/10 relative overflow-hidden">
          <div className="text-[32px] font-semibold text-primary mb-1">
            {data.total}
          </div>
          <div className="text-[11px] text-text-muted uppercase tracking-wider font-semibold">
            Reqs
          </div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20"></div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="h-[50px] w-full mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.weeklyData}>
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="#3525CD"
                  fill="#3525CD"
                  fillOpacity={0.15}
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="inline-flex self-start px-2 py-1 bg-primary-light text-primary text-[11px] font-semibold rounded-full">
            +8.4% vs prior week
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        {data.breakdown.map((item, i) => (
          <div key={i} className="bg-surface-dim rounded px-3 py-2 border border-border">
            <div className="text-[11px] text-text-muted mb-1 truncate">{item.name}</div>
            <div className="flex items-end justify-between">
              <span className="font-semibold text-sm text-text-primary">{item.count}</span>
              <span className="text-[10px] text-text-muted font-medium">{item.percent}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
