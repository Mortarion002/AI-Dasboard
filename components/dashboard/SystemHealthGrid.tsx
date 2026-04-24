"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Database, Gauge, Route } from "lucide-react";
import { Card } from "@/components/ui/card";

const systems = [
  { name: "Gateway", value: "99.98%", detail: "21ms edge p95", icon: Route },
  { name: "Vector DB", value: "84%", detail: "cache hit ratio", icon: Database },
  { name: "Workers", value: "312", detail: "active queues", icon: Cpu },
  { name: "Budget", value: "$2.1K", detail: "month to date", icon: Gauge },
];

const routes = [
  ["us-east-1", "54.2K reqs", "healthy"],
  ["eu-west-1", "38.7K reqs", "healthy"],
  ["ap-south-1", "31.6K reqs", "watch"],
];

export function SystemHealthGrid() {
  return (
    <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_360px]">
      <Card className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="label-text text-text-muted">SYSTEM HEALTH</h3>
          <span className="font-mono text-[11px] text-text-muted">live sample</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {systems.map((system, index) => {
            const Icon = system.icon;

            return (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.24 }}
                className="rounded-lg border border-border bg-surface-dim/50 p-4"
              >
                <div className="flex items-center justify-between text-text-muted">
                  <Icon className="h-4 w-4" />
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
                <div className="mt-5 font-mono text-2xl text-text-primary">{system.value}</div>
                <div className="mt-1 text-xs text-text-muted">{system.detail}</div>
                <div className="mt-3 text-sm font-medium text-text-primary">{system.name}</div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="label-text text-text-muted">ROUTING LANES</h3>
          <span className="h-2 w-2 rounded-full bg-success" />
        </div>
        <div className="space-y-3">
          {routes.map(([region, requests, status]) => (
            <div key={region} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-sm">
              <span className="font-mono text-text-primary">{region}</span>
              <span className="text-text-muted">{requests}</span>
              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-text-muted">
                {status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
