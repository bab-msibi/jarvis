import { cn } from "@/lib/utils";

type BrainKnowledgeBadgeProps = {
  source: string;
  className?: string;
};

function toneForSource(source: string) {
  if (source.includes("Obsidian")) return "border-cyan-500/35 bg-cyan-500/10 text-cyan-200";
  if (source.includes("Code")) return "border-sky-500/35 bg-sky-500/10 text-sky-200";
  if (source.includes("Warehouse")) return "border-emerald-500/35 bg-emerald-500/10 text-emerald-200";
  if (source.includes("CRM")) return "border-violet-500/35 bg-violet-500/10 text-violet-200";
  if (source.includes("Web")) return "border-amber-500/35 bg-amber-500/10 text-amber-200";
  return "border-slate-500/35 bg-slate-500/10 text-slate-200";
}

export function BrainKnowledgeBadge({ source, className }: BrainKnowledgeBadgeProps) {
  return <span className={cn("inline-flex rounded-md border px-2 py-0.5 text-xs", toneForSource(source), className)}>{source}</span>;
}
