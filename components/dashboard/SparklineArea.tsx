"use client";

import * as React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

type SparklineAreaProps = {
  data: { value: number }[];
  strokeWidth?: number;
  fillOpacity?: number;
};

export function SparklineArea({ data, strokeWidth = 1.5, fillOpacity = 0.08 }: SparklineAreaProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--text-primary)"
          fill="var(--text-primary)"
          fillOpacity={fillOpacity}
          strokeWidth={strokeWidth}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
