import { ModelType } from "@/types/model";
import { cn } from "@/lib/utils";

type ModelTypeBadgeProps = {
  type: ModelType;
  className?: string;
};

const typeStyles: Record<ModelType, string> = {
  API: "border-sky-500/35 bg-sky-500/10 text-sky-200",
  LOCAL: "border-violet-500/35 bg-violet-500/10 text-violet-200"
};

export function ModelTypeBadge({ type, className }: ModelTypeBadgeProps) {
  return (
    <span className={cn("inline-flex rounded-md border px-2 py-0.5 text-xs", typeStyles[type], className)}>
      {type}
    </span>
  );
}
