import { cn } from "@/lib/utils";
import { MemoryImportance } from "@/types/memory";

type ImportanceBadgeProps = {
  importance: MemoryImportance;
};

const importanceStyles: Record<MemoryImportance, string> = {
  High: "border-rose-500/35 bg-rose-500/15 text-rose-200",
  Medium: "border-amber-500/35 bg-amber-500/15 text-amber-200",
  Low: "border-emerald-500/35 bg-emerald-500/15 text-emerald-200",
  "Very Low": "border-slate-500/35 bg-slate-500/15 text-slate-200"
};

export function ImportanceBadge({ importance }: ImportanceBadgeProps) {
  return <span className={cn("inline-flex rounded-md border px-2 py-1 text-[10px]", importanceStyles[importance])}>{importance}</span>;
}
