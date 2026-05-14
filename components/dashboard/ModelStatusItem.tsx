import { Cpu } from "lucide-react";

import { StatusBadge } from "@/components/shared/StatusBadge";
import { Model } from "@/types/model";

type ModelStatusItemProps = {
  model: Model;
};

export function ModelStatusItem({ model }: ModelStatusItemProps) {
  return (
    <article className="flex items-center justify-between gap-3 rounded-xl border border-cyan-900/30 bg-sky-950/20 px-3 py-2.5">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-cyan-400" />
          <p className="truncate text-sm text-cyan-100">{model.name}</p>
        </div>
        <p className="truncate text-xs text-cyan-700">
          {model.provider} • v{model.version}
        </p>
      </div>
      <StatusBadge status={model.status} />
    </article>
  );
}
