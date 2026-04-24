import * as React from "react";
import { AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { ProviderStatusSnapshot } from "@/lib/db";

type ProviderStatusPanelProps = {
  statuses: ProviderStatusSnapshot[];
};

function formatUpdatedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function StatusIcon({ indicator }: { indicator: string }) {
  if (indicator === "none") {
    return <CheckCircle2 className="h-4 w-4 text-success" />;
  }

  return <AlertTriangle className="h-4 w-4 text-warning" />;
}

export function ProviderStatusPanel({ statuses }: ProviderStatusPanelProps) {
  return (
    <Card className="mt-4 p-5">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="label-text text-text-muted">PUBLIC PROVIDER STATUS</h3>
          <p className="mt-1 text-sm text-text-muted">
            Live Statuspage API snapshots for platform dependencies.
          </p>
        </div>
        <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-text-muted">
          no API key required
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        {statuses.map((provider) => (
          <a
            key={provider.provider}
            href={provider.pageUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border bg-surface-dim/50 p-4 transition-colors hover:bg-surface-dim"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <StatusIcon indicator={provider.indicator} />
                  <span className="font-semibold text-text-primary">{provider.provider}</span>
                </div>
                <p className="mt-3 min-h-10 text-sm leading-5 text-text-muted">{provider.status}</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-text-muted" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs">
              <div>
                <div className="font-mono text-text-primary">{provider.componentCount}</div>
                <div className="text-text-muted">components</div>
              </div>
              <div>
                <div className="font-mono text-text-primary">{provider.degradedComponents}</div>
                <div className="text-text-muted">degraded</div>
              </div>
            </div>
            <div className="mt-3 font-mono text-[11px] text-text-muted">
              updated {formatUpdatedAt(provider.updatedAt)}
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
}
