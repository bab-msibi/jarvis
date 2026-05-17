"use client";

import { ModalShell } from "@/components/ui/modal-shell";

type RestartServicesModalProps = {
  open: boolean;
  onClose: () => void;
  onRestart: () => void;
};

export function RestartServicesModal({ open, onClose, onRestart }: RestartServicesModalProps) {
  return (
    <ModalShell
      description="Restart core orchestration services (mock)."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="rounded-md border border-amber-500/60 bg-amber-500/20 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-500/30"
            onClick={() => {
              onRestart();
              onClose();
            }}
            type="button"
          >
            Restart Services
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Restart Services"
    >
      <p className="text-sm text-cyan-200">This action is currently mocked and will not execute real system commands in frontend mode.</p>
    </ModalShell>
  );
}
