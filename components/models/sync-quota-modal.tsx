"use client";

import { LoaderCircle, RefreshCw } from "lucide-react";
import { useState } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Model } from "@/types/model";

type SyncQuotaModalProps = {
  open: boolean;
  model?: Model;
  onClose: () => void;
  onSync: (modelId: string) => void;
};

export function SyncQuotaModal({ open, model, onClose, onSync }: SyncQuotaModalProps) {
  const [syncing, setSyncing] = useState(false);

  if (!model) return null;

  const runSync = async () => {
    setSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSyncing(false);
    onSync(model.id);
    onClose();
  };

  return (
    <ModalShell
      description={`Refresh quota and usage metrics for ${model.name}.`}
      onClose={onClose}
      open={open}
      title="Sync Model Quota"
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center gap-1 rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30 disabled:opacity-60"
            disabled={syncing}
            onClick={runSync}
            type="button"
          >
            {syncing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            {syncing ? "Syncing..." : "Sync Quota"}
          </button>
        </>
      }
    >
      <div className="space-y-1.5 text-sm">
        <p className="text-cyan-100">Current usage: {model.usage}%</p>
        <p className="text-cyan-600">Current quota: {model.quota}</p>
      </div>
    </ModalShell>
  );
}
