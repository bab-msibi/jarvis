import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

import { MonitorLog } from "@/types/monitor";
import { cn } from "@/lib/utils";

type LogEntryProps = {
  log: MonitorLog;
};

const logTone = {
  INFO: {
    icon: Info,
    iconClass: "text-cyan-300",
    badgeClass: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200"
  },
  WARNING: {
    icon: AlertTriangle,
    iconClass: "text-amber-300",
    badgeClass: "border-amber-500/30 bg-amber-500/10 text-amber-200"
  },
  ERROR: {
    icon: XCircle,
    iconClass: "text-rose-300",
    badgeClass: "border-rose-500/30 bg-rose-500/10 text-rose-200"
  },
  SUCCESS: {
    icon: CheckCircle2,
    iconClass: "text-emerald-300",
    badgeClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
  }
} as const;

export function LogEntry({ log }: LogEntryProps) {
  const tone = logTone[log.level];
  const Icon = tone.icon;

  return (
    <article className="rounded-lg border border-cyan-900/35 bg-sky-950/25 px-3 py-2.5">
      <div className="flex items-start gap-2">
        <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", tone.iconClass)} />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-cyan-100">{log.message}</p>
          <p className="mt-0.5 text-xs text-cyan-600">
            {log.source} • {log.timestamp}
          </p>
        </div>
        <span className={cn("rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]", tone.badgeClass)}>{log.level}</span>
      </div>
    </article>
  );
}
