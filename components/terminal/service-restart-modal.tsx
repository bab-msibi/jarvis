"use client";

import { ModalShell } from "@/components/ui/modal-shell";
import { TerminalService } from "@/types/terminal";

type ServiceRestartModalProps = {
  open: boolean;
  service?: TerminalService;
  onClose: () => void;
  onRestart: (serviceId: string) => void;
};

export function ServiceRestartModal({ open, service, onClose, onRestart }: ServiceRestartModalProps) {
  return (
    <ModalShell
      description={service ? `Restart ${service.name}?` : "Select a service first."}
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!service}
            onClick={() => {
              if (!service) return;
              onRestart(service.id);
              onClose();
            }}
            type="button"
          >
            Restart Service
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Restart Service"
    >
      <p className="text-sm text-cyan-500">This action is mocked in the frontend. TODO: backend service control API integration.</p>
    </ModalShell>
  );
}
