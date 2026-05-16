import { WorkflowTrigger } from "@/types/workflow";
import { cn } from "@/lib/utils";

type TriggerBadgeProps = {
  trigger: WorkflowTrigger;
};

const triggerStyles: Record<WorkflowTrigger, string> = {
  Schedule: "border-violet-500/35 bg-violet-500/15 text-violet-200",
  Webhook: "border-cyan-500/35 bg-cyan-500/15 text-cyan-200",
  Manual: "border-amber-500/35 bg-amber-500/15 text-amber-200",
  Event: "border-emerald-500/35 bg-emerald-500/15 text-emerald-200",
  API: "border-blue-500/35 bg-blue-500/15 text-blue-200"
};

export function TriggerBadge({ trigger }: TriggerBadgeProps) {
  return <span className={cn("rounded-md border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]", triggerStyles[trigger])}>{trigger}</span>;
}
