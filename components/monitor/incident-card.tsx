import { AlertOctagon } from "lucide-react";

import { Incident } from "@/types/monitor";
import { cn } from "@/lib/utils";

type IncidentCardProps = {
  incident: Incident;
  onResolve: (incident: Incident) => void;
};

const severityStyles: Record<Incident["severity"], string> = {
  LOW: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
  MEDIUM: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  HIGH: "border-orange-500/30 bg-orange-500/10 text-orange-200",
  CRITICAL: "border-rose-500/30 bg-rose-500/10 text-rose-200"
};

const statusStyles: Record<Incident["status"], string> = {
  OPEN: "border-rose-500/30 bg-rose-500/10 text-rose-200",
  INVESTIGATING: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  RESOLVED: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
};

export function IncidentCard({ incident, onResolve }: IncidentCardProps) {
  return (
    <article className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3 transition hover:border-cyan-500/45">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm text-cyan-100">{incident.title}</p>
          <p className="mt-0.5 text-xs text-cyan-600">
            {incident.source} • {incident.timestamp}
          </p>
        </div>
        <AlertOctagon className="h-4 w-4 shrink-0 text-cyan-400" />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className={cn("rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]", severityStyles[incident.severity])}>
          {incident.severity}
        </span>
        <span className={cn("rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]", statusStyles[incident.status])}>
          {incident.status}
        </span>
      </div>

      <button
        className="mt-3 inline-flex items-center rounded-md border border-cyan-700/45 px-2 py-1 text-xs text-cyan-200 transition hover:border-cyan-400/60 hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={incident.status === "RESOLVED"}
        onClick={() => onResolve(incident)}
        type="button"
      >
        Resolve
      </button>
    </article>
  );
}
