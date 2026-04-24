import * as React from "react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function ExecutiveSummary() {
  return (
    <Card className="p-5 flex flex-col h-full hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="label-text text-text-muted">EXECUTIVE SUMMARY</h3>
        <Sparkles size={16} className="text-primary" />
      </div>
      
      <div className="flex-1 text-[13px] text-text-primary leading-relaxed space-y-4">
        <p>
          System performance remains stable with an overall uptime of 99.98% over the last 72 hours.
        </p>
        <p>
          Recent spike in query volume correlates with the marketing campaign launch. Database read replicas successfully absorbed the load, maintaining steady query times.
        </p>
      </div>

      <div className="mt-6 border-l-2 border-primary bg-primary/5 p-4 rounded-r-md">
        <h4 className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1">
          RECOMMENDATION
        </h4>
        <p className="text-[13px] text-primary italic">
          Proactively scale cache layer before weekend peak hours to mitigate potential bottlenecks.
        </p>
      </div>
    </Card>
  );
}
