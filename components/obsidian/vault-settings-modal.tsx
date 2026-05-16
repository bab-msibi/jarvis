"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

type VaultSettingsModalProps = {
  open: boolean;
  vaultName: string;
  vaultPath: string;
  onClose: () => void;
  onSave: (settings: { vaultName: string; vaultPath: string; autoSync: boolean }) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function VaultSettingsModal({ open, vaultName, vaultPath, onClose, onSave }: VaultSettingsModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSave({
      vaultName: String(formData.get("vaultName") ?? vaultName),
      vaultPath: String(formData.get("vaultPath") ?? vaultPath),
      autoSync: String(formData.get("autoSync") ?? "off") === "on"
    });
    onClose();
  };

  return (
    <ModalShell
      description="Configure Obsidian vault integration options."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="vault-settings-form" type="submit">
            Save Settings
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Vault Settings"
    >
      <form className="space-y-3" id="vault-settings-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Vault Name</span>
          <input className={fieldClassName} defaultValue={vaultName} name="vaultName" />
        </label>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Vault Path</span>
          <input className={fieldClassName} defaultValue={vaultPath} name="vaultPath" />
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/35 px-3 py-2 text-sm text-cyan-200">
          <input className="accent-cyan-400" defaultChecked name="autoSync" type="checkbox" />
          Auto-sync every 15 minutes
        </label>
      </form>
    </ModalShell>
  );
}
