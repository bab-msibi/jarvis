import { Loader2 } from "lucide-react";

type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading data..." }: LoadingStateProps) {
  return (
    <div className="flex min-h-[140px] items-center justify-center gap-2 rounded-xl border border-cyan-900/40 bg-sky-950/25 px-4 py-6 text-sm text-cyan-300">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{label}</span>
    </div>
  );
}
