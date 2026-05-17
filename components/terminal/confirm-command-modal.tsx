"use client";

import { ModalShell } from "@/components/ui/modal-shell";

type ConfirmCommandModalProps = {
  open: boolean;
  command: string;
  sessionName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConfirmCommandModal({ open, command, sessionName, onClose, onConfirm }: ConfirmCommandModalProps) {
  return (
    <ModalShell
      description="Commands are sent to the backend policy gate. Approval is required, and only allowlisted safe commands can run."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" onClick={onConfirm} type="button">
            Approve & Run
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Confirm Command"
    >
      <div className="space-y-2 text-sm text-cyan-300">
        <p>
          Session: <span className="text-cyan-100">{sessionName}</span>
        </p>
        <p className="rounded-md border border-cyan-900/35 bg-sky-950/35 px-3 py-2 font-mono text-cyan-100">{command || "No command selected"}</p>
      </div>
    </ModalShell>
  );
}
