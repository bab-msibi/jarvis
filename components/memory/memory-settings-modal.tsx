"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

export type MemorySettingsValues = {
  semanticRecall: boolean;
  autoEmbeddingRefresh: boolean;
  crossAgentSync: boolean;
};

type MemorySettingsModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (settings: MemorySettingsValues) => void;
};

export function MemorySettingsModal({ open, onClose, onSave }: MemorySettingsModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSave({
      semanticRecall: formData.get("semanticRecall") === "on",
      autoEmbeddingRefresh: formData.get("autoEmbeddingRefresh") === "on",
      crossAgentSync: formData.get("crossAgentSync") === "on"
    });
    onClose();
  };

  return (
    <ModalShell
      description="Configure global memory engine behavior and synchronization controls."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="memory-settings-form" type="submit">
            Save Settings
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Memory Settings"
    >
      <form className="space-y-3" id="memory-settings-form" onSubmit={onSubmit}>
        <label className="flex items-center justify-between rounded-lg border border-cyan-900/35 bg-sky-950/35 px-3 py-2 text-sm text-cyan-200">
          Semantic recall enhancement
          <input className="h-4 w-4 rounded border-cyan-700/40 bg-sky-950/40" defaultChecked name="semanticRecall" type="checkbox" />
        </label>
        <label className="flex items-center justify-between rounded-lg border border-cyan-900/35 bg-sky-950/35 px-3 py-2 text-sm text-cyan-200">
          Auto embedding refresh
          <input className="h-4 w-4 rounded border-cyan-700/40 bg-sky-950/40" defaultChecked name="autoEmbeddingRefresh" type="checkbox" />
        </label>
        <label className="flex items-center justify-between rounded-lg border border-cyan-900/35 bg-sky-950/35 px-3 py-2 text-sm text-cyan-200">
          Cross-agent memory sync
          <input className="h-4 w-4 rounded border-cyan-700/40 bg-sky-950/40" defaultChecked name="crossAgentSync" type="checkbox" />
        </label>
      </form>
    </ModalShell>
  );
}
