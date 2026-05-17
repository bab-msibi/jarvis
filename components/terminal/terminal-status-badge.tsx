import { cn } from "@/lib/utils";
import { TerminalServiceStatus, TerminalSessionStatus } from "@/types/terminal";

type TerminalStatusValue = TerminalSessionStatus | TerminalServiceStatus;

type TerminalStatusBadgeProps = {
  status: TerminalStatusValue;
};

const statusStyles: Record<TerminalStatusValue, string> = {
  ONLINE: "border-emerald-500/35 bg-emerald-500/15 text-emerald-200",
  IDLE: "border-slate-500/35 bg-slate-500/15 text-slate-200",
  RUNNING: "border-cyan-500/35 bg-cyan-500/15 text-cyan-200",
  ERROR: "border-rose-500/35 bg-rose-500/15 text-rose-200",
  STOPPED: "border-slate-500/35 bg-slate-500/15 text-slate-200",
  DEGRADED: "border-amber-500/35 bg-amber-500/15 text-amber-200",
  OFFLINE: "border-rose-500/35 bg-rose-500/15 text-rose-200",
  RESTARTING: "border-amber-500/35 bg-amber-500/15 text-amber-200"
};

export function TerminalStatusBadge({ status }: TerminalStatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]", statusStyles[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
