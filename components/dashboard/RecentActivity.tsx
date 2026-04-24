"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { StatusDot } from "@/components/shared/StatusDot";
import { ActivityItem } from "@/lib/mock-data";

type RecentActivityProps = {
  items: ActivityItem[];
};

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card className="w-full flex flex-col p-0 overflow-hidden border border-border mt-4">
      <div className="p-5 pb-3 border-b border-border">
        <h3 className="label-text text-text-muted">RECENT ACTIVITY</h3>
      </div>
      <div className="flex flex-col">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
            className="flex items-center justify-between p-4 px-5 border-b border-border last:border-0 hover:bg-surface-dim/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <StatusDot status={item.type} />
              <div className="text-sm text-text-primary flex items-center flex-wrap gap-1">
                {item.message.split(item.tag || "").map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && item.tag && (
                      <span className="font-mono text-[11px] bg-surface-dim border border-border px-1.5 py-0.5 rounded text-text-muted">
                        {item.tag}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="text-xs text-text-muted shrink-0 ml-4">
              {item.timestamp}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
