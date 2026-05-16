"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

type SyncVaultModalProps = {
  open: boolean;
  onClose: () => void;
  onSync: (mode: "full" | "incremental") => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-500/60";

export function SyncVaultModal({ open, onClose, onSync }: SyncVaultModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const mode = String(formData.get("mode") ?? "incremental") as "full" | "incremental";
    onSync(mode);
    onClose();
  };

  return (
    <ModalShell
      description="Start Obsidian vault synchronization with JARVIS indexing."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="sync-vault-form" type="submit">
            Sync Vault
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Sync Vault"
    >
      <form className="space-y-3" id="sync-vault-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Sync Mode</span>
          <select className={fieldClassName} defaultValue="incremental" name="mode">
            <option className="bg-[#071523]" value="incremental">
              Incremental Sync
            </option>
            <option className="bg-[#071523]" value="full">
              Full Reindex
            </option>
          </select>
        </label>
      </form>
    </ModalShell>
  );
}
