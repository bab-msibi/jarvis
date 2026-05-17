"use client";

import { ModalShell } from "@/components/ui/modal-shell";

type ClearLogsModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  logsCount: number;
};

export function ClearLogsModal({ open, onClose, onConfirm, logsCount }: ClearLogsModalProps) {
  return (
    <ModalShell
      description="Clear recent system logs from the monitor view."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="rounded-md border border-rose-500/60 bg-rose-500/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/30"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            type="button"
          >
            Clear Logs
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Clear Logs"
    >
      <p className="text-sm text-cyan-200">This will clear {logsCount} log entries from the current monitor view.</p>
      <p className="mt-2 text-xs text-cyan-600">Logs are mocked in frontend mode. Real audit storage will be preserved server-side in production.</p>
    </ModalShell>
  );
}
