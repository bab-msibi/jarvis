import { LucideIcon, ChevronRight } from "lucide-react";

type QuickActionCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
};

export function QuickActionCard({ icon: Icon, title, description, onClick }: QuickActionCardProps) {
  return (
    <button
      className="flex w-full items-center gap-3 rounded-xl border border-cyan-900/30 bg-sky-950/35 px-3 py-2.5 text-left transition hover:border-cyan-500/45 hover:bg-cyan-500/10"
      onClick={onClick}
      type="button"
    >
      <div className="rounded-lg border border-cyan-700/40 bg-cyan-500/10 p-1.5 text-cyan-200">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-cyan-100">{title}</p>
        <p className="truncate text-xs text-cyan-600">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-cyan-700" />
    </button>
  );
}
