import { FileText, FolderTree, Link2, StickyNote } from "lucide-react";

import { StatusBadge } from "@/components/shared/StatusBadge";
import { ObsidianStats } from "@/types/system";

type ObsidianVaultCardProps = {
  vault: ObsidianStats;
};

const statItems = [
  { label: "Files", key: "files", icon: FileText },
  { label: "Notes", key: "notes", icon: StickyNote },
  { label: "Links", key: "links", icon: Link2 }
] as const;

export function ObsidianVaultCard({ vault }: ObsidianVaultCardProps) {
  return (
    <div className="space-y-3 rounded-xl border border-cyan-900/30 bg-sky-950/25 p-3.5">
      <div>
        <p className="text-sm text-cyan-100">{vault.vaultName}</p>
        <p className="break-all text-[11px] text-cyan-700">{vault.vaultPath}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.key} className="rounded-lg border border-cyan-900/30 bg-sky-950/50 px-2 py-1.5">
              <div className="flex items-center gap-1.5 text-cyan-600">
                <Icon className="h-3 w-3" />
                {item.label}
              </div>
              <p className="text-sm text-cyan-100">{vault[item.key].toLocaleString()}</p>
            </div>
          );
        })}
        <div className="rounded-lg border border-cyan-900/30 bg-sky-950/50 px-2 py-1.5">
          <div className="flex items-center gap-1.5 text-cyan-600">
            <FolderTree className="h-3 w-3" />
            Size
          </div>
          <p className="text-sm text-cyan-100">{vault.size}</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-cyan-900/30 pt-2 text-xs">
        <p className="text-cyan-600">Last Sync: {vault.lastSync}</p>
        <StatusBadge status={vault.syncStatus} />
      </div>
    </div>
  );
}
