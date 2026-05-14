import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StatsCardProps = {
  icon: LucideIcon;
  label: string;
  value: number | string;
  description: string;
  tone: "cyan" | "green" | "amber" | "slate" | "rose";
};

const toneStyles: Record<StatsCardProps["tone"], string> = {
  cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
  green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  slate: "border-slate-500/30 bg-slate-500/10 text-slate-200",
  rose: "border-rose-500/30 bg-rose-500/10 text-rose-200"
};

export function StatsCard({ icon: Icon, label, value, description, tone }: StatsCardProps) {
  return (
    <div className="panel-base rounded-xl px-4 py-3">
      <div className="flex items-start gap-3">
        <div className={cn("rounded-lg border p-2", toneStyles[tone])}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-cyan-600">{label}</p>
          <p className="text-2xl text-cyan-100">{value}</p>
          <p className="text-xs text-cyan-700">{description}</p>
        </div>
      </div>
    </div>
  );
}
