import { cn } from "@/lib/utils";
import { DocumentAIStatus } from "@/types/document";

type AIStatusBadgeProps = {
  status: DocumentAIStatus;
};

const statusStyles: Record<DocumentAIStatus, string> = {
  Indexed: "border-emerald-500/30 bg-emerald-500/15 text-emerald-200",
  Processing: "border-amber-500/30 bg-amber-500/15 text-amber-200",
  "Not Indexed": "border-slate-500/30 bg-slate-500/15 text-slate-200",
  Failed: "border-rose-500/30 bg-rose-500/15 text-rose-200"
};

export function AIStatusBadge({ status }: AIStatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]", statusStyles[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
