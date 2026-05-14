import { BrainCircuit } from "lucide-react";

import { StatusBadge } from "@/components/shared/StatusBadge";
import { Brain } from "@/types/brain";

type BrainStatusItemProps = {
  brain: Brain;
};

export function BrainStatusItem({ brain }: BrainStatusItemProps) {
  return (
    <article className="flex items-start justify-between gap-3 rounded-xl border border-cyan-900/30 bg-sky-950/20 px-3 py-2.5">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-3.5 w-3.5 text-cyan-400" />
          <p className="truncate text-sm text-cyan-100">{brain.name}</p>
        </div>
        <p className="truncate text-xs text-cyan-700">{brain.purpose}</p>
      </div>
      <StatusBadge status={brain.status} />
    </article>
  );
}
