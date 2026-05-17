"use client";

import { ModalShell } from "@/components/ui/modal-shell";

type TestConnectionModalProps = {
  open: boolean;
  onClose: () => void;
  onRun: () => void;
};

export function TestConnectionModal({ open, onClose, onRun }: TestConnectionModalProps) {
  return (
    <ModalShell
      description="Run mocked system connection tests across core integrations."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30"
            onClick={() => {
              onRun();
              onClose();
            }}
            type="button"
          >
            Test Connection
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Test Connection"
    >
      <p className="text-sm text-cyan-200">This check is mocked for frontend mode and will later call secure backend health endpoints.</p>
    </ModalShell>
  );
}
