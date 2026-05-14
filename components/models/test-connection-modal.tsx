"use client";

import { LoaderCircle, PlugZap } from "lucide-react";
import { useState } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Model } from "@/types/model";

type TestConnectionModalProps = {
  open: boolean;
  model?: Model;
  onClose: () => void;
  onComplete: (modelId: string, success: boolean) => void;
};

export function TestConnectionModal({ open, model, onClose, onComplete }: TestConnectionModalProps) {
  const [testing, setTesting] = useState(false);

  if (!model) return null;

  const runTest = async () => {
    setTesting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setTesting(false);
    onComplete(model.id, true);
    onClose();
  };

  return (
    <ModalShell
      description={`Verify runtime connectivity for ${model.name}.`}
      onClose={onClose}
      open={open}
      title="Test Connection"
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
            disabled={testing}
            onClick={runTest}
            type="button"
          >
            {testing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <PlugZap className="h-4 w-4" />}
            {testing ? "Testing..." : "Run Test"}
          </button>
        </>
      }
    >
      <div className="space-y-2 text-sm">
        <p className="text-cyan-100">Provider: {model.provider}</p>
        <p className="text-cyan-600">Endpoint: {model.apiEndpoint || "Local runtime"}</p>
        <p className="text-cyan-600">Local path: {model.localPath || "N/A"}</p>
      </div>
    </ModalShell>
  );
}
