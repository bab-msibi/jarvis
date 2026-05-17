import { cn } from "@/lib/utils";

type ResourceBreakdownPanelProps = {
  entries: Array<{
    label: string;
    value: number;
  }>;
};

function getUnit(label: string) {
  return label === "Temperature" ? "°C" : "%";
}

export function ResourceBreakdownPanel({ entries }: ResourceBreakdownPanelProps) {
  const maxValue = Math.max(1, ...entries.map((entry) => entry.value));

  return (
    <div className="space-y-2.5">
      {entries.map((entry, index) => {
        const percent = Math.max(3, Math.round((entry.value / maxValue) * 100));
        const colorClass =
          index % 4 === 0
            ? "from-cyan-400 to-sky-500"
            : index % 4 === 1
              ? "from-emerald-400 to-cyan-400"
              : index % 4 === 2
                ? "from-violet-400 to-cyan-400"
                : "from-amber-400 to-orange-400";

        return (
          <div className="space-y-1" key={entry.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyan-100">{entry.label}</span>
              <span className="text-cyan-500">
                {entry.value}
                {getUnit(entry.label)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-sky-950/70">
              <div className={cn("h-full rounded-full bg-gradient-to-r", colorClass)} style={{ width: `${percent}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
