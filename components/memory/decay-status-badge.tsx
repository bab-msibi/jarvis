import { cn } from "@/lib/utils";
import { MemoryDecayStatus } from "@/types/memory";

type DecayStatusBadgeProps = {
  status: MemoryDecayStatus;
};

const decayStyles: Record<MemoryDecayStatus, string> = {
  Strong: "border-emerald-500/35 bg-emerald-500/15 text-emerald-200",
  Medium: "border-amber-500/35 bg-amber-500/15 text-amber-200",
  Weak: "border-cyan-500/35 bg-cyan-500/15 text-cyan-200",
  Expiring: "border-rose-500/35 bg-rose-500/15 text-rose-200"
};

export function DecayStatusBadge({ status }: DecayStatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]", decayStyles[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
