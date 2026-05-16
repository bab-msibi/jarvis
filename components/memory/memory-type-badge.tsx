import { cn } from "@/lib/utils";
import { MemoryType } from "@/types/memory";

type MemoryTypeBadgeProps = {
  type: MemoryType;
};

const typeStyles: Record<MemoryType, string> = {
  FACT: "border-cyan-500/35 bg-cyan-500/15 text-cyan-200",
  TASK: "border-amber-500/35 bg-amber-500/15 text-amber-200",
  KNOWLEDGE: "border-emerald-500/35 bg-emerald-500/15 text-emerald-200",
  CONTEXT: "border-sky-500/35 bg-sky-500/15 text-sky-200",
  PREFERENCE: "border-violet-500/35 bg-violet-500/15 text-violet-200",
  CODE: "border-yellow-500/35 bg-yellow-500/15 text-yellow-200",
  INSIGHT: "border-indigo-500/35 bg-indigo-500/15 text-indigo-200",
  EVENT: "border-blue-500/35 bg-blue-500/15 text-blue-200"
};

export function MemoryTypeBadge({ type }: MemoryTypeBadgeProps) {
  return <span className={cn("inline-flex rounded-md border px-2 py-1 text-[10px] uppercase tracking-[0.08em]", typeStyles[type])}>{type}</span>;
}
