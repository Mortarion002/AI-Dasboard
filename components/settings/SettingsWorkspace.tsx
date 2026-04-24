"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Activity,
  Bell,
  CheckCircle2,
  CreditCard,
  Key,
  Lock,
  Mail,
  ReceiptText,
  Settings,
  Shield,
  User,
  WalletCards,
} from "lucide-react";
import { APIKeysTable } from "@/components/settings/APIKeysTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type APIKey = {
  name: string;
  key: string;
  created: string;
  active: boolean;
};

type SettingsWorkspaceProps = {
  apiKeys: APIKey[];
  initialPanel: string;
};

const panels = [
  { id: "profile", label: "Profile", icon: User, description: "Identity, access, and ownership" },
  { id: "api-keys", label: "API Keys", icon: Key, description: "Tokens and rotation policy" },
  { id: "preferences", label: "Preferences", icon: Settings, description: "Runtime defaults and alerts" },
  { id: "billing", label: "Billing", icon: CreditCard, description: "Plan, usage, and invoices" },
] as const;

type PanelId = (typeof panels)[number]["id"];

function isPanelId(value: string): value is PanelId {
  return panels.some((panel) => panel.id === value);
}

export function SettingsWorkspace({ apiKeys, initialPanel }: SettingsWorkspaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedPanel = searchParams.get("panel") ?? initialPanel;
  const activePanel = isPanelId(requestedPanel) ? requestedPanel : "api-keys";
  const activeMeta = panels.find((panel) => panel.id === activePanel) ?? panels[1];

  function selectPanel(panel: PanelId) {
    router.push(`/settings?panel=${panel}`, { scroll: false });
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-56px)]">
      <aside className="w-[260px] shrink-0 border-r border-border bg-surface p-4">
        <div className="mb-5 rounded-lg border border-border bg-surface-raised p-4">
          <div className="text-sm font-semibold text-text-primary">Control Panel</div>
          <p className="mt-1 text-xs leading-5 text-text-muted">
            Manage operator access, runtime behavior, and billing signals.
          </p>
        </div>
        <nav className="flex flex-col gap-1">
          {panels.map((panel) => {
            const Icon = panel.icon;
            const isActive = activePanel === panel.id;

            return (
              <button
                key={panel.id}
                onClick={() => selectPanel(panel.id)}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-text-muted hover:bg-surface-dim hover:text-text-primary"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{panel.label}</span>
                  <span
                    className={cn(
                      "mt-0.5 block truncate text-[11px]",
                      isActive ? "text-primary-foreground/70" : "text-text-muted"
                    )}
                  >
                    {panel.description}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8 pb-20">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="headline-lg text-text-primary">{activeMeta.label}</h1>
              <Badge variant="secondary">Workspace</Badge>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted">{activeMeta.description}</p>
          </div>
          <Button>Save changes</Button>
        </div>

        <motion.div
          key={activePanel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="max-w-5xl"
        >
          {activePanel === "profile" && <ProfilePanel />}
          {activePanel === "api-keys" && <ApiKeysPanel apiKeys={apiKeys} />}
          {activePanel === "preferences" && <PreferencesPanel />}
          {activePanel === "billing" && <BillingPanel />}
        </motion.div>
      </main>
    </div>
  );
}

function ProfilePanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader>
          <CardTitle>Operator profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input id="full-name" defaultValue="Morgan Lee" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Platform Owner" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="admin@aiops.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Operational note</Label>
            <Textarea
              id="bio"
              defaultValue="Owns production routing, model governance, and incident response for Core Systems."
              className="min-h-28"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Security posture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["MFA enforced", "Authenticator app active"],
              ["SSO domain", "core-systems.io"],
              ["Last sign-in", "Today at 02:18"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-text-muted">{label}</span>
                <span className="font-medium text-text-primary">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-start gap-3 p-4">
            <Shield className="mt-0.5 h-4 w-4 text-text-muted" />
            <p className="text-sm leading-6 text-text-muted">
              Profile changes are written to the audit log and require re-authentication for sensitive fields.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ApiKeysPanel({ apiKeys }: { apiKeys: APIKey[] }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Active keys", "2", Key],
          ["Rotation window", "30d", Activity],
          ["Scopes locked", "4", Lock],
        ].map(([label, value, Icon]) => (
          <Card key={label as string}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <div className="text-xs uppercase text-text-muted">{label as string}</div>
                <div className="mt-2 font-mono text-2xl text-text-primary">{value as string}</div>
              </div>
              <Icon className="h-5 w-5 text-text-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
      <APIKeysTable keys={apiKeys} />
    </div>
  );
}

function PreferencesPanel() {
  const [temperature, setTemperature] = React.useState(0.3);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Runtime defaults</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2">
            <Label>Default model</Label>
            <Select defaultValue="gpt-4-turbo">
              <SelectTrigger>
                <SelectValue placeholder="Choose model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                <SelectItem value="claude-3-opus">Claude-3 Opus</SelectItem>
                <SelectItem value="llama-3-70b">Llama-3 70B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs uppercase text-text-muted">
              <span>Model temperature</span>
              <span className="font-mono text-text-primary">{temperature.toFixed(1)}</span>
            </div>
            <Slider max={1} step={0.1} value={[temperature]} onValueChange={(value) => setTemperature(value[0])} />
          </div>
          <Separator />
          <PreferenceSwitch title="Strict JSON mode" description="Force structured responses for production requests." />
          <PreferenceSwitch title="Replay failed calls" description="Retry transient failures with the fallback model." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PreferenceSwitch title="Latency threshold alerts" description="Notify when p95 latency crosses 400ms." icon={Bell} />
          <PreferenceSwitch title="Billing usage alerts" description="Send a warning at 75% and 90% monthly usage." icon={ReceiptText} />
          <PreferenceSwitch title="Security digest" description="Daily summary of key rotations and failed logins." icon={Mail} />
        </CardContent>
      </Card>
    </div>
  );
}

function PreferenceSwitch({
  title,
  description,
  icon: Icon = CheckCircle2,
}: {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface-dim/60 p-3">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 text-text-muted" />
        <div>
          <div className="text-sm font-medium text-text-primary">{title}</div>
          <p className="mt-1 text-xs leading-5 text-text-muted">{description}</p>
        </div>
      </div>
      <Switch defaultChecked />
    </div>
  );
}

function BillingPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <Card>
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface-dim p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-text-primary">Scale</h3>
                <Badge>Annual</Badge>
              </div>
              <p className="mt-2 text-sm text-text-muted">1.5M monthly tokens, priority routing, audit retention.</p>
            </div>
            <Button variant="outline">
              <WalletCards className="mr-2 h-4 w-4" />
              Manage plan
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Monthly spend", "$2,184"],
              ["Included tokens", "1.5M"],
              ["Renewal", "May 12"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border p-4">
                <div className="text-xs uppercase text-text-muted">{label}</div>
                <div className="mt-2 font-mono text-xl text-text-primary">{value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            ["INV-2041", "Apr 2026", "$2,184"],
            ["INV-2038", "Mar 2026", "$1,972"],
            ["INV-2031", "Feb 2026", "$1,806"],
          ].map(([id, month, amount]) => (
            <div key={id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <div className="font-mono text-sm text-text-primary">{id}</div>
                <div className="text-xs text-text-muted">{month}</div>
              </div>
              <div className="font-mono text-sm text-text-primary">{amount}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
