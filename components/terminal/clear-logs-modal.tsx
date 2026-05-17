"use client";

import { ModalShell } from "@/components/ui/modal-shell";

type ClearLogsModalProps = {
  open: boolean;
  sessionName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function ClearLogsModal({ open, sessionName, onClose, onConfirm }: ClearLogsModalProps) {
  return (
    <ModalShell
      description={`Clear all logs for ${sessionName}?`}
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-rose-500/60 bg-rose-500/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/30" onClick={onConfirm} type="button">
            Clear Logs
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Clear Logs"
    >
      <p className="text-sm text-cyan-500">This action only affects mocked frontend logs for this session.</p>
    </ModalShell>
  );
}
