"use client";

import { ModalShell } from "@/components/ui/modal-shell";

type ResetSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
};

export function ResetSettingsModal({ open, onClose, onReset }: ResetSettingsModalProps) {
  return (
    <ModalShell
      description="Reset all unsaved edits and restore the last saved configuration snapshot."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="rounded-md border border-amber-500/60 bg-amber-500/20 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-500/30"
            onClick={() => {
              onReset();
              onClose();
            }}
            type="button"
          >
            Reset Changes
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Reset Unsaved Changes"
    >
      <p className="text-sm text-cyan-200">Current unsaved settings will be discarded.</p>
    </ModalShell>
  );
}
