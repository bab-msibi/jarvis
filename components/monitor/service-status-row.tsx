"use client";

import { RotateCcw } from "lucide-react";

import { MonitorService } from "@/types/monitor";
import { MonitorStatusBadge } from "@/components/monitor/monitor-status-badge";

type ServiceStatusRowProps = {
  service: MonitorService;
  onRestart: (service: MonitorService) => void;
};

export function ServiceStatusRow({ service, onRestart }: ServiceStatusRowProps) {
  return (
    <article className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3 transition hover:border-cyan-500/45">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-cyan-100">{service.name}</p>
        <MonitorStatusBadge status={service.status} />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-cyan-500">
        <p>Uptime {service.uptime}</p>
        <p>Heartbeat {service.lastHeartbeat}</p>
        <p>CPU {service.cpuUsage}%</p>
        <p>RAM {service.ramUsage}%</p>
      </div>
      <button
        className="mt-2 inline-flex items-center gap-1 rounded-md border border-cyan-700/45 px-2 py-1 text-xs text-cyan-200 transition hover:border-cyan-400/60 hover:bg-cyan-500/10"
        onClick={() => onRestart(service)}
        type="button"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Restart
      </button>
    </article>
  );
}
