"use client";

import { useState } from "react";
import { LoaderCircle, Sparkles } from "lucide-react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Brain } from "@/types/brain";

type RetrainBrainModalProps = {
  open: boolean;
  brain?: Brain;
  onClose: () => void;
  onRetrain: (brainId: string) => void;
};

export function RetrainBrainModal({ open, brain, onClose, onRetrain }: RetrainBrainModalProps) {
  const [loading, setLoading] = useState(false);

  if (!brain) return null;

  const runRetrain = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    onRetrain(brain.id);
    onClose();
  };

  return (
    <ModalShell
      description={`Retrain ${brain.name} with its current knowledge and memory sources.`}
      onClose={onClose}
      open={open}
      title="Retrain Brain"
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
            onClick={runRetrain}
            type="button"
          >
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Retraining..." : "Start Retrain"}
          </button>
        </>
      }
    >
      <div className="space-y-2 text-sm">
        <p className="text-cyan-100">Knowledge source: {brain.knowledgeSource}</p>
        <p className="text-cyan-600">Memory source: {brain.memorySource}</p>
      </div>
    </ModalShell>
  );
}
