import { ReactNode } from "react";
import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-cyan-900/50 bg-sky-950/25 px-4 py-6 text-center">
      <div className="text-cyan-700">{icon ?? <Inbox className="h-5 w-5" />}</div>
      <p className="text-sm text-cyan-100">{title}</p>
      <p className="max-w-[540px] text-xs text-cyan-600">{description}</p>
    </div>
  );
}
