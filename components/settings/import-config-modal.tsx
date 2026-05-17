"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

type ImportConfigModalProps = {
  open: boolean;
  onClose: () => void;
  onImport: (payload: string) => void;
};

export function ImportConfigModal({ open, onClose, onImport }: ImportConfigModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = String(formData.get("payload") ?? "").trim();
    if (!payload) return;
    onImport(payload);
    onClose();
  };

  return (
    <ModalShell
      description="Import settings configuration from JSON payload."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="import-config-form" type="submit">
            Import
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Import Config"
    >
      <form className="space-y-3" id="import-config-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Configuration Payload (JSON)</span>
          <textarea
            className="min-h-[180px] w-full rounded-md border border-cyan-900/45 bg-sky-950/45 px-3 py-2 text-sm text-cyan-100 outline-none focus:border-cyan-500/60"
            name="payload"
            placeholder='{"general":{"systemName":"JARVIS"}}'
          />
        </label>
      </form>
    </ModalShell>
  );
}
