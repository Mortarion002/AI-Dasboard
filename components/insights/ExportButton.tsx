"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import type { ModelUsageData } from "@/lib/mock-data";

type TopTopic = {
  name: string;
  percentage: number;
  color: string;
};

type ExportData = {
  modelUsage?: ModelUsageData;
  topTopics?: TopTopic[];
};

export function ExportButton({ data }: { data: ExportData }) {
  const handleExport = () => {
    const rows = [
      ["Section", "Name", "Value", "Percentage"]
    ];

    if (data?.modelUsage?.breakdown) {
      data.modelUsage.breakdown.forEach((item) => {
        rows.push(["Model Usage", item.name, item.count, item.percent]);
      });
    }

    if (data?.topTopics) {
      data.topTopics.forEach((item) => {
        rows.push(["Top Topics", item.name, "", `${item.percentage}%`]);
      });
    }

    const csvContent = rows.map(e => e.map(val => `"${val}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "system_insights_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleExport}
      className="h-9 border-border bg-surface text-text-primary font-medium hover:bg-surface-dim"
    >
      Export Report
    </Button>
  );
}
