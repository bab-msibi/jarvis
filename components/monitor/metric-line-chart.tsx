"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

type MetricLineChartProps = {
  values: number[];
};

export function MetricLineChart({ values }: MetricLineChartProps) {
  const data = values.map((value, index) => ({ index, value }));

  return (
    <div className="h-12 w-full">
      <ResponsiveContainer height="100%" minHeight={36} minWidth={0} width="100%">
        <LineChart data={data}>
          <Line dataKey="value" dot={false} isAnimationActive={false} stroke="#22d3ee" strokeWidth={2} type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
