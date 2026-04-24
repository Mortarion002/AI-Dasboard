import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="flex h-full min-h-[calc(100vh-48px)]">
      {/* Secondary Nav */}
      <div className="w-[180px] shrink-0 border-r border-border bg-surface-dim/30 p-4">
        <Skeleton className="h-4 w-24 mb-6 mt-1" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 pb-20 max-w-4xl">
        <div className="flex justify-between mb-8">
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-9 w-36" />
        </div>

        <Skeleton className="h-[200px] w-full rounded-lg mb-6" />
        <Skeleton className="h-16 w-full rounded-lg mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-[140px] w-full rounded-lg" />
          <Skeleton className="h-[140px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
