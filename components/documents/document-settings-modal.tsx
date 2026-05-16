"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

export type DocumentSettingsValues = {
  autoIndex: boolean;
  ocrEnabled: boolean;
  semanticSearch: boolean;
};

type DocumentSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (values: DocumentSettingsValues) => void;
};

export function DocumentSettingsModal({ open, onClose, onSave }: DocumentSettingsModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSave({
      autoIndex: formData.get("autoIndex") === "on",
      ocrEnabled: formData.get("ocrEnabled") === "on",
      semanticSearch: formData.get("semanticSearch") === "on"
    });
    onClose();
  };

  return (
    <ModalShell
      description="Configure global document orchestration preferences."
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
            className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30"
            form="document-settings-form"
            type="submit"
          >
            Save Settings
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Document Settings"
    >
      <form className="space-y-3" id="document-settings-form" onSubmit={onSubmit}>
        <label className="flex items-center justify-between rounded-lg border border-cyan-900/35 bg-sky-950/35 px-3 py-2 text-sm text-cyan-200">
          Auto index on upload
          <input className="h-4 w-4 rounded border-cyan-700/40 bg-sky-950/40" defaultChecked name="autoIndex" type="checkbox" />
        </label>
        <label className="flex items-center justify-between rounded-lg border border-cyan-900/35 bg-sky-950/35 px-3 py-2 text-sm text-cyan-200">
          OCR for scanned files
          <input className="h-4 w-4 rounded border-cyan-700/40 bg-sky-950/40" defaultChecked name="ocrEnabled" type="checkbox" />
        </label>
        <label className="flex items-center justify-between rounded-lg border border-cyan-900/35 bg-sky-950/35 px-3 py-2 text-sm text-cyan-200">
          Enable semantic search indexing
          <input className="h-4 w-4 rounded border-cyan-700/40 bg-sky-950/40" defaultChecked name="semanticSearch" type="checkbox" />
        </label>
      </form>
    </ModalShell>
  );
}
