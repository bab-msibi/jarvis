"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { MemoryBreakdownItem } from "@/types/memory";

type MemoryOverviewChartProps = {
  total: number;
  data: MemoryBreakdownItem[];
};

export function MemoryOverviewChart({ total, data }: MemoryOverviewChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="space-y-3">
      <div className="relative h-[190px]">
        {mounted ? <ResponsiveContainer height="100%" minHeight={180} minWidth={0} width="100%">
          <PieChart>
            <Pie cx="50%" cy="50%" data={data} dataKey="value" innerRadius={48} outerRadius={72} paddingAngle={2} stroke="none">
              {data.map((entry) => (
                <Cell fill={entry.color} key={entry.label} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: "#071523", border: "1px solid rgba(56, 189, 248, 0.4)", borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer> : null}

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-3xl text-cyan-100">{total.toLocaleString()}</p>
          <p className="text-xs uppercase tracking-[0.08em] text-cyan-600">Total</p>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        {data.map((item) => {
          const percent = total ? ((item.value / total) * 100).toFixed(1) : "0.0";
          return (
            <div className="flex items-center justify-between gap-2 text-sm" key={item.label}>
              <span className="inline-flex items-center gap-2 text-cyan-200">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
              <span className="text-cyan-500">
                {item.value.toLocaleString()} ({percent}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
