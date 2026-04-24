import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActivityLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto w-full pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-[110px]" />
          <Skeleton className="h-9 w-[120px]" />
          <Skeleton className="h-9 w-[140px]" />
          <Skeleton className="h-9 w-[90px]" />
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-border bg-surface">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <th key={i} className="px-5 py-3">
                    <Skeleton className="h-4 w-16" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-surface">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <tr key={i} className="border-b border-border">
                  <td className="px-5 py-4"><Skeleton className="h-3 w-3 rounded-full" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-4 w-20" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-4 w-64" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-4 w-12" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-4 w-20 ml-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-surface-dim/30">
          <Skeleton className="h-4 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
