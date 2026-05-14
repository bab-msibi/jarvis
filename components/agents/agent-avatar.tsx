import { cn } from "@/lib/utils";

type AgentAvatarProps = {
  initials: string;
  className?: string;
};

const palette = [
  "border-violet-400/70 bg-violet-500/10 text-violet-200",
  "border-sky-400/70 bg-sky-500/10 text-sky-200",
  "border-emerald-400/70 bg-emerald-500/10 text-emerald-200",
  "border-amber-400/70 bg-amber-500/10 text-amber-200",
  "border-cyan-400/70 bg-cyan-500/10 text-cyan-200"
];

function colorFromInitials(initials: string) {
  const index = initials.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % palette.length;
  return palette[index] ?? palette[0];
}

export function AgentAvatar({ initials, className }: AgentAvatarProps) {
  return (
    <div className={cn("relative h-12 w-12 shrink-0", className)}>
      <div
        className={cn("absolute inset-0 border", colorFromInitials(initials))}
        style={{ clipPath: "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-sm tracking-wide">{initials}</div>
    </div>
  );
}
