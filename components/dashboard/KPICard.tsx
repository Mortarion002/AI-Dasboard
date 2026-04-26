"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const SparklineArea = dynamic(
  () => import("@/components/dashboard/SparklineArea").then((mod) => mod.SparklineArea),
  {
    ssr: false,
    loading: () => <div className="h-full w-full rounded bg-surface-dim/50" />,
  }
);

type KPICardProps = {
  title: string;
  value: string;
  index: number;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  valueClassName?: string;
  sparklineData?: { value: number }[];
  tooltip?: React.ReactNode;
};

export function KPICard({ title, value, index, badge, icon, valueClassName, sparklineData, tooltip }: KPICardProps) {
  const card = (
    <Card className="p-5 h-[120px] flex flex-col justify-between border-border bg-surface-raised transition-colors hover:bg-surface-dim/70 cursor-default">
      <div className="flex justify-between items-start">
        <h3 className="label-text text-text-muted">{title}</h3>
        <div className="text-text-muted">{icon}</div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className={cn("text-[28px] font-semibold leading-none", valueClassName)}>
            {value}
          </span>
          {badge && <div className="mb-1">{badge}</div>}
        </div>

        {sparklineData && (
          <div className="w-[80px] h-[36px]">
            <SparklineArea data={sparklineData} />
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
    >
      {tooltip ? (
        <Tooltip>
          <TooltipTrigger asChild>{card}</TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={6}
            className="bg-surface border border-border text-text-primary shadow-lg p-0 rounded-lg overflow-hidden max-w-[220px]"
          >
            {tooltip}
          </TooltipContent>
        </Tooltip>
      ) : (
        card
      )}
    </motion.div>
  );
}
