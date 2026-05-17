import { SystemMetric } from "@/types/monitor";
import { MonitorStatusBadge } from "@/components/monitor/monitor-status-badge";
import { MetricLineChart } from "@/components/monitor/metric-line-chart";

type SystemMetricCardProps = {
  metric: SystemMetric;
};

export function SystemMetricCard({ metric }: SystemMetricCardProps) {
  return (
    <section className="panel-base rounded-2xl p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-sm text-cyan-200">{metric.name}</h3>
        <MonitorStatusBadge status={metric.status} />
      </div>

      <p className="text-3xl text-cyan-100">
        {metric.value}
        <span className="ml-1 text-lg text-cyan-500">{metric.unit}</span>
      </p>

      <div className="mt-2">
        <MetricLineChart values={metric.history} />
      </div>

      <p className="mt-1 text-xs text-cyan-600">Updated {metric.updatedAt}</p>
    </section>
  );
}
