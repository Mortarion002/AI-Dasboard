import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function InsightsLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto w-full pb-20">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-9 w-[120px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg border p-4 flex items-start gap-3 bg-surface-dim/30">
          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
          <div className="w-full">
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-3 w-full max-w-[400px]" />
          </div>
        </div>
        <div className="rounded-lg border p-4 flex items-start gap-3 bg-surface-dim/30">
          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
          <div className="w-full">
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-3 w-full max-w-[400px]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card className="p-5 h-[320px] flex flex-col">
          <Skeleton className="h-4 w-32 mb-6" />
          <div className="space-y-4 flex-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-full mt-4" />
            <Skeleton className="h-3 w-4/5" />
          </div>
          <div className="mt-6 border-l-2 border-border p-4 h-24 bg-surface-dim/30">
            <Skeleton className="h-3 w-24 mb-3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4 mt-2" />
          </div>
        </Card>
        
        <Card className="p-5 h-[320px] flex flex-col">
          <Skeleton className="h-4 w-32 mb-6" />
          <div className="flex gap-6 mb-6">
            <Skeleton className="w-1/2 h-[120px] rounded-xl" />
            <Skeleton className="w-1/2 h-[120px] rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-auto">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-14 w-full rounded" />
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5 mt-4 w-full h-[250px]">
        <Skeleton className="h-4 w-48 mb-8" />
        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-10" />
              </div>
              <Skeleton className="h-[5px] w-full rounded-full" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
