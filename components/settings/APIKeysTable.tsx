import * as React from "react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Info, Loader2 } from "lucide-react";
import { StatusDot } from "@/components/shared/StatusDot";
import { generateApiKeyAction, deleteApiKeyAction } from "@/app/settings/actions";

type APIKey = {
  name: string;
  key: string;
  created: string;
  active: boolean;
};

type APIKeysTableProps = {
  keys: APIKey[];
};

export function APIKeysTable({ keys }: APIKeysTableProps) {
  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    startTransition(() => {
      generateApiKeyAction();
    });
  };

  const handleDelete = (keyString: string) => {
    startTransition(() => {
      deleteApiKeyAction(keyString);
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary tracking-tight">API Keys</h2>
          <p className="text-sm text-text-muted mt-1">Manage your secret keys for API authentication.</p>
        </div>
        <Button 
          onClick={handleGenerate} 
          disabled={isPending}
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 font-medium px-4"
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
          Generate New Key
        </Button>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-6">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-border bg-surface-dim/30">
                <th className="px-5 py-3 font-medium text-[11px] uppercase tracking-wider text-text-muted">Name</th>
                <th className="px-5 py-3 font-medium text-[11px] uppercase tracking-wider text-text-muted">Secret Key</th>
                <th className="px-5 py-3 font-medium text-[11px] uppercase tracking-wider text-text-muted text-right">Created</th>
                <th className="px-5 py-3 w-[60px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface">
              {keys.map((item, i) => (
                <tr key={i} className="hover:bg-surface-dim/30 transition-colors">
                  <td className="px-5 py-3.5 flex items-center gap-3">
                    <StatusDot status={item.active ? "success" : "neutral"} />
                    <span className="font-medium text-text-primary">{item.name}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <code className="px-2 py-1 bg-surface-dim rounded text-[13px] font-mono text-text-muted">
                      {item.key}
                    </code>
                  </td>
                  <td className="px-5 py-3.5 text-right text-text-muted text-[13px]">
                    {item.created}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <button 
                      onClick={() => handleDelete(item.key)}
                      disabled={isPending}
                      className="text-text-muted hover:text-error disabled:opacity-50 transition-colors p-1.5 rounded hover:bg-error/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-lg bg-surface-dim border border-border">
        <Info className="text-text-muted mt-0.5 shrink-0" size={16} />
        <p className="text-[13px] text-text-primary leading-relaxed">
          Never share your API keys in public repositories or client-side code. They carry the same privileges as your account.
        </p>
      </div>
    </div>
  );
}
