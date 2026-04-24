import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto w-full pb-20">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-9 w-[120px]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-5 h-[120px] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <div className="flex items-end justify-between gap-4 mt-auto">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          </Card>
        ))}
      </div>

      <Card className="w-full h-[350px] p-5 mt-4">
        <Skeleton className="h-4 w-48 mb-4" />
        <Skeleton className="w-full h-[280px]" />
      </Card>

      <Card className="w-full mt-4 flex flex-col">
        <div className="p-5 pb-3 border-b border-border">
          <Skeleton className="h-4 w-32" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 px-5 border-b border-border last:border-0 flex justify-between items-center">
            <div className="flex items-center gap-4 w-full">
              <Skeleton className="h-2 w-2 rounded-full shrink-0" />
              <Skeleton className="h-4 w-full max-w-[400px]" />
            </div>
            <Skeleton className="h-4 w-16 shrink-0" />
          </div>
        ))}
      </Card>
    </div>
  );
}
