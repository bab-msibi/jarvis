"use client";

import { ModalShell } from "@/components/ui/modal-shell";

type SaveSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hasUnsavedChanges: boolean;
};

export function SaveSettingsModal({ open, onClose, onConfirm, hasUnsavedChanges }: SaveSettingsModalProps) {
  return (
    <ModalShell
      description="Persist current settings to your JARVIS configuration profile."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!hasUnsavedChanges}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            type="button"
          >
            Save Changes
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Save Settings"
    >
      <p className="text-sm text-cyan-200">
        {hasUnsavedChanges ? "Unsaved changes are ready to be applied." : "No pending changes detected."}
      </p>
    </ModalShell>
  );
}
