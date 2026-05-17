import { AlertTriangle } from "lucide-react";

type ErrorStateProps = {
  title?: string;
  description: string;
};

export function ErrorState({ title = "Something went wrong", description }: ErrorStateProps) {
  return (
    <div className="flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-6 text-center">
      <AlertTriangle className="h-5 w-5 text-rose-300" />
      <p className="text-sm text-rose-100">{title}</p>
      <p className="max-w-[540px] text-xs text-rose-200/80">{description}</p>
    </div>
  );
}
