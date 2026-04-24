import {
  getProviderStatusSnapshots,
  type ProviderStatusSnapshot,
  upsertProviderStatusSnapshot,
} from "@/lib/db";

type StatuspageSummary = {
  page: {
    name: string;
    url: string;
    updated_at: string;
  };
  status: {
    description: string;
    indicator: string;
  };
  components?: Array<{
    status: string;
  }>;
  incidents?: Array<unknown>;
};

const PROVIDERS = [
  {
    name: "Vercel",
    summaryUrl: "https://www.vercel-status.com/api/v2/summary.json",
    pageUrl: "https://www.vercel-status.com",
  },
  {
    name: "GitHub",
    summaryUrl: "https://www.githubstatus.com/api/v2/summary.json",
    pageUrl: "https://www.githubstatus.com",
  },
  {
    name: "OpenAI",
    summaryUrl: "https://status.openai.com/api/v2/summary.json",
    pageUrl: "https://status.openai.com",
  },
  {
    name: "Anthropic",
    summaryUrl: "https://status.anthropic.com/api/v2/summary.json",
    pageUrl: "https://status.anthropic.com",
  },
];

function isDegraded(status: string) {
  return status !== "operational";
}

async function fetchProviderStatus(provider: (typeof PROVIDERS)[number]) {
  const response = await fetch(provider.summaryUrl, {
    cache: "no-store",
    signal: AbortSignal.timeout(4500),
  });

  if (!response.ok) {
    throw new Error(`${provider.name} status request failed with ${response.status}`);
  }

  const summary = (await response.json()) as StatuspageSummary;
  const components = summary.components ?? [];
  const snapshot: ProviderStatusSnapshot = {
    provider: provider.name,
    pageUrl: summary.page?.url ?? provider.pageUrl,
    status: summary.status?.description ?? "Status unavailable",
    indicator: summary.status?.indicator ?? "unknown",
    componentCount: components.length,
    degradedComponents: components.filter((component) => isDegraded(component.status)).length,
    incidentCount: summary.incidents?.length ?? 0,
    updatedAt: summary.page?.updated_at ?? new Date().toISOString(),
    fetchedAt: new Date().toISOString(),
  };

  return upsertProviderStatusSnapshot(snapshot);
}

export async function getLiveProviderStatuses() {
  const settled = await Promise.allSettled(PROVIDERS.map(fetchProviderStatus));
  const liveRows = settled
    .filter((result): result is PromiseFulfilledResult<ProviderStatusSnapshot> => result.status === "fulfilled")
    .map((result) => result.value);

  if (liveRows.length > 0) {
    const cachedRows = getProviderStatusSnapshots();
    const merged = new Map(cachedRows.map((row) => [row.provider, row]));

    for (const row of liveRows) {
      merged.set(row.provider, row);
    }

    return PROVIDERS.map((provider) => merged.get(provider.name)).filter(Boolean) as ProviderStatusSnapshot[];
  }

  return getProviderStatusSnapshots();
}
