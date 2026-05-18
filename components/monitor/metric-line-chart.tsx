"use client";

import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

type MetricLineChartProps = {
  values: number[];
};

export function MetricLineChart({ values }: MetricLineChartProps) {
  const [mounted, setMounted] = useState(false);
  const data = values.map((value, index) => ({ index, value }));

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="h-12 w-full">
      {mounted ? <ResponsiveContainer height="100%" minHeight={36} minWidth={0} width="100%">
        <LineChart data={data}>
          <Line dataKey="value" dot={false} isAnimationActive={false} stroke="#22d3ee" strokeWidth={2} type="monotone" />
        </LineChart>
      </ResponsiveContainer> : null}
    </div>
  );
}
