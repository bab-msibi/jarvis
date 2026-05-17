"use client";

import { ModalShell } from "@/components/ui/modal-shell";
import { TerminalSession } from "@/types/terminal";

type KillSessionModalProps = {
  open: boolean;
  session?: TerminalSession;
  onClose: () => void;
  onKill: (sessionId: string) => void;
};

export function KillSessionModal({ open, session, onClose, onKill }: KillSessionModalProps) {
  return (
    <ModalShell
      description={session ? `Stop ${session.name}?` : "Select a session first."}
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="rounded-md border border-rose-500/60 bg-rose-500/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!session}
            onClick={() => {
              if (!session) return;
              onKill(session.id);
              onClose();
            }}
            type="button"
          >
            Kill Session
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Kill Session"
    >
      <p className="text-sm text-cyan-500">In mock mode this updates session state only. Real backend execution will require strict approval.</p>
    </ModalShell>
  );
}
