import { TerminalResourceMetric } from "@/types/terminal";

type ResourceUsagePanelProps = {
  metrics: TerminalResourceMetric[];
};

export function ResourceUsagePanel({ metrics }: ResourceUsagePanelProps) {
  return (
    <div className="space-y-3">
      {metrics.map((metric) => {
        const percent = Math.max(0, Math.min(100, (metric.value / metric.max) * 100));
        return (
          <div className="space-y-1" key={metric.key}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyan-200">{metric.key}</span>
              <span className="text-cyan-500">
                {metric.value}
                {metric.unit}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-sky-950/70">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-300" style={{ width: `${percent}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
