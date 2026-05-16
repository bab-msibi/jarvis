import { cn } from "@/lib/utils";

type TagBadgeProps = {
  tag: string;
  muted?: boolean;
};

export function TagBadge({ tag, muted }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-md border px-2 py-0.5 text-[11px]",
        muted ? "border-cyan-900/35 bg-sky-950/40 text-cyan-500" : "border-cyan-800/40 bg-cyan-500/12 text-cyan-200"
      )}
    >
      {tag}
    </span>
  );
}
