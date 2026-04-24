import * as React from "react";
import { cn } from "@/lib/utils";

type StatusDotProps = {
  status: "success" | "warning" | "error" | "neutral";
  className?: string;
};

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        "inline-block w-[7px] h-[7px] rounded-full shrink-0",
        {
          "bg-success": status === "success",
          "bg-warning": status === "warning",
          "bg-error": status === "error",
          "bg-text-muted opacity-50": status === "neutral",
        },
        className
      )}
    />
  );
}
