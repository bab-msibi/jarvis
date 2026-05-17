"use client";

import { ModalShell } from "@/components/ui/modal-shell";
import { MonitorService } from "@/types/monitor";
import { MonitorStatusBadge } from "@/components/monitor/monitor-status-badge";

type RestartServiceModalProps = {
  open: boolean;
  service?: MonitorService;
  onClose: () => void;
  onRestart: (serviceId: string) => void;
};

export function RestartServiceModal({ open, service, onClose, onRestart }: RestartServiceModalProps) {
  return (
    <ModalShell
      description="Restart a selected AI system service."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="rounded-md border border-amber-500/60 bg-amber-500/20 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-500/30 disabled:cursor-not-allowed disabled:opacity-40"
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
      {service ? (
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <p className="text-cyan-100">{service.name}</p>
            <MonitorStatusBadge status={service.status} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-cyan-500">
            <p>Uptime: {service.uptime}</p>
            <p>Heartbeat: {service.lastHeartbeat}</p>
            <p>CPU: {service.cpuUsage}%</p>
            <p>RAM: {service.ramUsage}%</p>
          </div>
          <p className="text-xs text-cyan-600">Restart is mocked and safe in frontend mode.</p>
        </div>
      ) : (
        <p className="text-sm text-cyan-600">No service selected.</p>
      )}
    </ModalShell>
  );
}
