import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: string;
  className?: string;
};

const statusStyles: Record<string, string> = {
  online: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
  "system online": "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
  active: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
  synced: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
  idle: "text-slate-300 border-slate-400/30 bg-slate-500/10",
  busy: "text-cyan-200 border-cyan-400/30 bg-cyan-500/10",
  "not started": "text-slate-300 border-slate-400/30 bg-slate-500/10",
  "in progress": "text-cyan-200 border-cyan-400/30 bg-cyan-500/10",
  "on hold": "text-amber-200 border-amber-400/30 bg-amber-500/10",
  completed: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
  failed: "text-rose-200 border-rose-400/30 bg-rose-500/10",
  warning: "text-amber-200 border-amber-400/30 bg-amber-500/10",
  updating: "text-amber-200 border-amber-400/30 bg-amber-500/10",
  queued: "text-amber-200 border-amber-400/30 bg-amber-500/10",
  error: "text-rose-200 border-rose-400/30 bg-rose-500/10",
  blocked: "text-rose-200 border-rose-400/30 bg-rose-500/10"
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const key = status.toLowerCase();
  const styles = statusStyles[key] ?? "text-slate-300 border-slate-400/30 bg-slate-500/10";

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider", styles, className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status.replace("_", " ")}
    </span>
  );
}
