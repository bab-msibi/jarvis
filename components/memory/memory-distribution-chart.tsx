"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { MemoryBreakdownItem } from "@/types/memory";

type MemoryDistributionChartProps = {
  total: number;
  data: MemoryBreakdownItem[];
};

export function MemoryDistributionChart({ total, data }: MemoryDistributionChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-sm uppercase tracking-[0.08em] text-cyan-300">Memory Distribution by Brain</h3>
      </header>

      <div className="grid gap-2 p-4 sm:grid-cols-[220px_minmax(0,1fr)]">
        <div className="relative h-[210px]">
          {mounted ? <ResponsiveContainer height="100%" minHeight={200} minWidth={0} width="100%">
            <PieChart>
              <Pie cx="50%" cy="50%" data={data} dataKey="value" innerRadius={62} outerRadius={84} paddingAngle={2} stroke="none">
                {data.map((entry) => (
                  <Cell fill={entry.color} key={entry.label} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#071523", border: "1px solid rgba(56, 189, 248, 0.4)", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer> : null}

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-4xl text-cyan-100">{total.toLocaleString()}</p>
            <p className="text-xs uppercase tracking-[0.08em] text-cyan-600">Total</p>
          </div>
        </div>

        <div className="space-y-2 self-center">
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
    </section>
  );
}
