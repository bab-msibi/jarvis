import { BrainCircuit } from "lucide-react";

import { getInitials } from "@/components/documents/document-utils";

type LinkedBrainBadgeProps = {
  brain: string;
};

export function LinkedBrainBadge({ brain }: LinkedBrainBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-violet-500/30 bg-violet-500/15 px-2 py-1 text-xs text-violet-200">
      <BrainCircuit className="h-3 w-3" />
      <span className="rounded bg-violet-500/20 px-1 text-[10px] uppercase tracking-[0.08em]">{getInitials(brain)}</span>
      <span className="truncate">{brain}</span>
    </span>
  );
}
