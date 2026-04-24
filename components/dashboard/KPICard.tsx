"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Info, PieChart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

type KPICardProps = {
  title: string;
  value: string;
  index: number;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  valueClassName?: string;
  sparklineData?: { value: number }[];
};

export function KPICard({ title, value, index, badge, icon, valueClassName, sparklineData }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
    >
      <Card className="p-5 h-[120px] flex flex-col justify-between hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-shadow">
        <div className="flex justify-between items-start">
          <h3 className="label-text text-text-muted">{title}</h3>
          <div className="text-text-muted">
            {icon}
          </div>
        </div>
        
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={cn("text-[28px] font-semibold leading-none", valueClassName)}>
              {value}
            </span>
            {badge && (
              <div className="mb-1">
                {badge}
              </div>
            )}
          </div>
          
          {sparklineData && (
            <div className="w-[80px] h-[36px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3525CD"
                    fill="#3525CD"
                    fillOpacity={0.15}
                    strokeWidth={1.5}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
