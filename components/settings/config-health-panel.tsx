import { SettingsHealthItem } from "@/types/settings";
import { cn } from "@/lib/utils";

type ConfigHealthPanelProps = {
  items: SettingsHealthItem[];
};

const statusStyles: Record<SettingsHealthItem["status"], string> = {
  configured: "text-emerald-200 bg-emerald-500/15 border-emerald-500/30",
  warning: "text-amber-200 bg-amber-500/15 border-amber-500/30",
  error: "text-rose-200 bg-rose-500/15 border-rose-500/30"
};

export function ConfigHealthPanel({ items }: ConfigHealthPanelProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <article className="rounded-md border border-cyan-900/30 bg-sky-950/25 px-3 py-2" key={item.label}>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-cyan-100">{item.label}</p>
            <span className={cn("rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]", statusStyles[item.status])}>{item.status}</span>
          </div>
          <p className="mt-1 text-xs text-cyan-600">{item.detail}</p>
        </article>
      ))}
    </div>
  );
}
