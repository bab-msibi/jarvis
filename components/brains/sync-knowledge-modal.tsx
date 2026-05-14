"use client";

import { useState } from "react";
import { LoaderCircle, RefreshCw } from "lucide-react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Brain } from "@/types/brain";

type SyncKnowledgeModalProps = {
  open: boolean;
  brain?: Brain;
  onClose: () => void;
  onSync: (brainId: string) => void;
};

export function SyncKnowledgeModal({ open, brain, onClose, onSync }: SyncKnowledgeModalProps) {
  const [loading, setLoading] = useState(false);

  if (!brain) return null;

  const runSync = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    onSync(brain.id);
    onClose();
  };

  return (
    <ModalShell
      description={`Sync connected knowledge sources for ${brain.name}.`}
      onClose={onClose}
      open={open}
      title="Sync Knowledge Sources"
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
            disabled={loading}
            onClick={runSync}
            type="button"
          >
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            {loading ? "Syncing..." : "Sync Knowledge"}
          </button>
        </>
      }
    >
      <div className="space-y-2 text-sm">
        <p className="text-cyan-100">Knowledge source: {brain.knowledgeSource}</p>
        <p className="text-cyan-600">Sync status: {brain.syncStatus}</p>
      </div>
    </ModalShell>
  );
}
