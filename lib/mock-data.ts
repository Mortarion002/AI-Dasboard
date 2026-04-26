export const kpiMetrics = {
  totalRequests: "124.5K",
  tokenUsage: "1.4M",
  avgLatency: "450ms",
  errorRate: "0.02%"
};

export type KPIRange = "today" | "last7" | "last30" | "allTime";

export type KPISnapshot = {
  totalRequests: string;
  requestsChange: string;
  requestsDetail: string;
  tokenUsage: string;
  tokenChange: string;
  tokenDetail: string;
  avgLatency: string;
  latencyP50: string;
  latencyP95: string;
  latencyP99: string;
  errorRate: string;
  errorCount: string;
  timeoutCount: string;
};

export const kpiByRange: Record<KPIRange, KPISnapshot> = {
  today: {
    totalRequests: "18.2K",  requestsChange: "+3%",  requestsDetail: "vs yesterday avg 17.7K",
    tokenUsage:    "198K",   tokenChange:    "+5%",  tokenDetail:    "142K input · 56K output",
    avgLatency:    "431ms",  latencyP50:     "310ms", latencyP95:    "892ms", latencyP99: "1.4s",
    errorRate:     "0.01%",  errorCount:     "2 errors", timeoutCount: "0 timeouts",
  },
  last7: {
    totalRequests: "124.5K", requestsChange: "+12%", requestsDetail: "vs prior 7 days: 111.1K",
    tokenUsage:    "1.4M",   tokenChange:    "+8%",  tokenDetail:    "980K input · 420K output",
    avgLatency:    "450ms",  latencyP50:     "320ms", latencyP95:    "940ms", latencyP99: "1.6s",
    errorRate:     "0.02%",  errorCount:     "25 errors", timeoutCount: "8 timeouts",
  },
  last30: {
    totalRequests: "521.3K", requestsChange: "+9%",  requestsDetail: "vs prior 30 days: 478.3K",
    tokenUsage:    "5.8M",   tokenChange:    "+11%", tokenDetail:    "4.1M input · 1.7M output",
    avgLatency:    "463ms",  latencyP50:     "330ms", latencyP95:    "960ms", latencyP99: "1.7s",
    errorRate:     "0.03%",  errorCount:     "156 errors", timeoutCount: "41 timeouts",
  },
  allTime: {
    totalRequests: "4.2M",   requestsChange: "",     requestsDetail: "Since Oct 2023",
    tokenUsage:    "47.1M",  tokenChange:    "",     tokenDetail:    "33M input · 14.1M output",
    avgLatency:    "471ms",  latencyP50:     "335ms", latencyP95:    "980ms", latencyP99: "1.8s",
    errorRate:     "0.04%",  errorCount:     "1,680 errors", timeoutCount: "392 timeouts",
  },
};

export const weeklyChartData = [
  { day: "Mon", requests: 7000 },
  { day: "Tue", requests: 8000 },
  { day: "Wed", requests: 12500 },
  { day: "Thu", requests: 10800 },
  { day: "Fri", requests: 16300 },
  { day: "Sat", requests: 13500 },
  { day: "Sun", requests: 17200 }
];

export type ActivityItem = {
  id: number;
  type: "success" | "warning" | "error" | "neutral";
  message: string;
  tag: string | null;
  timestamp: string;
};

export const recentActivity: ActivityItem[] = [
  { id: 1, type: "success", message: "Model deployed successfully to prod-eu-west", tag: "v2.4.1", timestamp: "2m ago" },
  { id: 2, type: "neutral", message: "Automated database backup completed", tag: null, timestamp: "15m ago" },
  { id: 3, type: "warning", message: "Latency spike detected in", tag: "auth-service", timestamp: "42m ago" },
  { id: 4, type: "neutral", message: "User updated API routing rules", tag: "admin@aiops.com", timestamp: "1h ago" },
  { id: 5, type: "error", message: "Failed webhook delivery to external billing service", tag: null, timestamp: "2h ago" }
];

export type ActivityLog = {
  id: string;
  reqId: string;
  status: "success" | "warning" | "error" | "neutral";
  promptSnippet: string;
  model: string;
  latency: string;
  timestamp: string;
  date: string;
  isTimeout: boolean;
  fullPrompt: string;
  fullResponse: string;
  tokens: number;
  cost: string;
};

export const activityLogs: ActivityLog[] = [
  { id: "1", reqId: "req_9a8b7c", status: "success", promptSnippet: "Analyze the Q3 financial report and summarize key risk fa...", model: "GPT-4 Turbo", latency: "845ms", timestamp: "10:42:15 AM", date: "2026-04-26", isTimeout: false, fullPrompt: "{\n  \"messages\": [\n    { \"role\": \"system\", \"content\": \"You are a financial analyst.\" },\n    { \"role\": \"user\", \"content\": \"Analyze the Q3 financial report and summarize key risk factors.\" }\n  ]\n}", fullResponse: "{\n  \"summary\": \"Key risk factors identified in Q3 include supply chain volatility, increased raw material costs, and currency fluctuations in the EMEA region.\",\n  \"confidence_score\": 0.92\n}", tokens: 345, cost: "$0.0052" },
  { id: "2", reqId: "req_4f2d1e", status: "success", promptSnippet: "Generate a Python script to parse AWS CloudTrail logs...", model: "Claude-3 Opus", latency: "1.2s", timestamp: "10:41:03 AM", date: "2026-04-26", isTimeout: false, fullPrompt: "{\n  \"messages\": [\n    { \"role\": \"user\", \"content\": \"Generate a Python script to parse AWS CloudTrail logs for UnauthorizedAccess events.\" }\n  ]\n}", fullResponse: "import json\nimport boto3\n\ndef parse_cloudtrail_logs(bucket_name, prefix):\n    s3 = boto3.client('s3')\n    # Script continues...\n    # Identified patterns for 'AccessDenied'\n    return unauthorized_events", tokens: 512, cost: "$0.015" },
  { id: "3", reqId: "req_8b1c0a", status: "error", promptSnippet: "Translate the following technical manual to Japanese...", model: "Llama-3 70B", latency: "Timeout", timestamp: "10:38:22 AM", date: "2026-04-25", isTimeout: true, fullPrompt: "{\n  \"text\": \"Translate the following technical manual to Japanese: [large document...]\",\n  \"source_lang\": \"en\",\n  \"target_lang\": \"ja\"\n}", fullResponse: "Error: Request timed out after 30 seconds.", tokens: 120, cost: "$0.0001" },
  { id: "4", reqId: "req_1x9p4m", status: "success", promptSnippet: "Write a SQL query to join users and orders tables...", model: "GPT-4 Turbo", latency: "412ms", timestamp: "10:35:11 AM", date: "2026-04-25", isTimeout: false, fullPrompt: "{\n  \"messages\": [\n    { \"role\": \"user\", \"content\": \"Write a SQL query to join users and orders tables where order value > 100\" }\n  ]\n}", fullResponse: "SELECT u.id, u.name, o.order_date, o.total_amount\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.total_amount > 100;", tokens: 180, cost: "$0.002" },
  { id: "5", reqId: "req_7z2w1p", status: "success", promptSnippet: "Summarize the latest AI news in 3 bullet points...", model: "Claude-3 Opus", latency: "890ms", timestamp: "10:25:01 AM", date: "2026-04-24", isTimeout: false, fullPrompt: "{\n  \"prompt\": \"Summarize the latest AI news in 3 bullet points.\"\n}", fullResponse: "- New LLM models released by Anthropic and OpenAI\n- AI regulation policies drafted in the EU\n- Breakthrough in quantum machine learning algorithms", tokens: 210, cost: "$0.006" },
  { id: "6", reqId: "req_3j4k5l", status: "success", promptSnippet: "Explain quantum computing to a 5-year-old...", model: "Llama-3 70B", latency: "650ms", timestamp: "10:15:44 AM", date: "2026-04-24", isTimeout: false, fullPrompt: "{\n  \"prompt\": \"Explain quantum computing to a 5-year-old.\"\n}", fullResponse: "Imagine you have a magic coin. A regular coin can only be heads or tails. But a magic quantum coin can be both heads and tails at the very same time while it's spinning! That's how quantum computers work to solve puzzles super fast.", tokens: 95, cost: "$0.0005" },
  { id: "7", reqId: "req_9m8n7o", status: "error", promptSnippet: "Extract data from this 50MB PDF...", model: "GPT-4 Turbo", latency: "Timeout", timestamp: "09:55:12 AM", date: "2026-04-23", isTimeout: true, fullPrompt: "{\n  \"file\": \"large_report.pdf\",\n  \"task\": \"extract_tables\"\n}", fullResponse: "Error: Payload size exceeds maximum allowed limit (20MB).", tokens: 50, cost: "$0.00" },
  { id: "8", reqId: "req_5p6q7r", status: "success", promptSnippet: "Write a haiku about coding bugs...", model: "Claude-3 Opus", latency: "320ms", timestamp: "09:40:05 AM", date: "2026-04-23", isTimeout: false, fullPrompt: "{\n  \"prompt\": \"Write a haiku about coding bugs.\"\n}", fullResponse: "Code works perfectly\nWait, an unexpected error\nLate night coffee runs", tokens: 42, cost: "$0.001" },
  { id: "9", reqId: "req_1s2t3u", status: "success", promptSnippet: "Generate a color palette for a fintech dashboard...", model: "GPT-4 Turbo", latency: "510ms", timestamp: "09:20:33 AM", date: "2026-04-22", isTimeout: false, fullPrompt: "{\n  \"prompt\": \"Generate a color palette for a fintech dashboard.\"\n}", fullResponse: "{\n  \"primary\": \"#0F172A\",\n  \"secondary\": \"#3B82F6\",\n  \"accent\": \"#10B981\",\n  \"background\": \"#F8FAFC\",\n  \"text\": \"#334155\"\n}", tokens: 110, cost: "$0.0015" },
  { id: "10", reqId: "req_4v5w6x", status: "success", promptSnippet: "Convert this plain text to markdown format...", model: "Llama-3 70B", latency: "280ms", timestamp: "08:55:18 AM", date: "2026-04-22", isTimeout: false, fullPrompt: "{\n  \"text\": \"Heading 1\\nThis is a paragraph.\\n- List item 1\\n- List item 2\"\n}", fullResponse: "# Heading 1\n\nThis is a paragraph.\n\n* List item 1\n* List item 2", tokens: 85, cost: "$0.0004" }
];

export type InsightAlert = {
  type: "error" | "success" | "warning" | "neutral";
  title: string;
  description: string;
};

export const insightAlerts: InsightAlert[] = [
  { type: "error", title: "High Latency Detected", description: "API gateway response time exceeding 400ms threshold in us-east-1 region. Traffic re-routing initiated." },
  { type: "success", title: "Cost Optimization Opportunity", description: "Underutilized compute nodes in cluster-beta. Scaling down could save an estimated $420/week." }
];

export type ModelUsageData = {
  total: string;
  weeklyData: { day: string; requests: number }[];
  breakdown: { name: string; count: string; percent: string }[];
};

export const modelUsage: ModelUsageData = {
  total: "1.2M",
  weeklyData: [
    { day: "Mon", requests: 120 },
    { day: "Tue", requests: 130 },
    { day: "Wed", requests: 160 },
    { day: "Thu", requests: 150 },
    { day: "Fri", requests: 180 },
    { day: "Sat", requests: 170 },
    { day: "Sun", requests: 210 }
  ],
  breakdown: [
    { name: "GPT-4 Turbo", count: "523K", percent: "44%" },
    { name: "Claude-3 Opus", count: "386K", percent: "32%" },
    { name: "Llama-3 70B", count: "181K", percent: "15%" },
    { name: "Other", count: "110K", percent: "9%" }
  ]
};

export const topTopics = [
  { name: "Data Retrieval", percentage: 45, color: "var(--primary)" },
  { name: "Analysis Generation", percentage: 30, color: "var(--primary)" },
  { name: "System Config", percentage: 15, color: "var(--primary)" },
  { name: "Code Generation", percentage: 10, color: "var(--primary)" }
];

export let apiKeys = [
  { name: "Production App", key: "sk-proj-••••••••••••••••", created: "Oct 12, 2023", active: true },
  { name: "Staging Environment", key: "sk-test-••••••••••••••••", created: "Nov 05, 2023", active: false },
  { name: "Developer Local", key: "sk-dev-••••••••••••••••", created: "Jan 18, 2024", active: true }
];

export function addMockApiKey(name: string = "New Generated Key") {
  const randomStr = Math.random().toString(36).substring(2, 8);
  const newKey = {
    name,
    key: `sk-new-${randomStr}••••••••••••••••`,
    created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    active: true
  };
  apiKeys = [newKey, ...apiKeys];
}

export function removeMockApiKey(keyString: string) {
  apiKeys = apiKeys.filter(k => k.key !== keyString);
}

export async function fetchDashboardData() {
  await new Promise(r => setTimeout(r, 600));
  return {
    kpiMetrics,
    weeklyChartData,
    recentActivity,
    activityLogs,
    insightAlerts,
    modelUsage,
    topTopics,
    apiKeys
  };
}
