import * as React from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertBannerProps = {
  type: "error" | "success";
  title: string;
  description: string;
};

export function AlertBanner({ type, title, description }: AlertBannerProps) {
  const isError = type === "error";

  return (
    <div
      className={cn(
        "rounded-lg border p-4 flex items-start gap-3",
        isError
          ? "bg-[#FFF5F5] border-error/20"
          : "bg-[#F0FDF4] border-success/20"
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full w-8 h-8",
          isError ? "bg-error/10 text-error" : "bg-success/10 text-success"
        )}
      >
        {isError ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
      </div>
      <div>
        <h4
          className={cn(
            "text-sm font-semibold mb-1",
            isError ? "text-error" : "text-success"
          )}
        >
          {title}
        </h4>
        <p
          className={cn(
            "text-[13px] leading-relaxed",
            isError ? "text-error/80" : "text-success/80"
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
