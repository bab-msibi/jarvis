"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { MemoryTimelinePoint } from "@/types/memory";

type MemoryTimelineChartProps = {
  data: MemoryTimelinePoint[];
};

export function MemoryTimelineChart({ data }: MemoryTimelineChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-sm uppercase tracking-[0.08em] text-cyan-300">Memory Timeline (Last 7 Days)</h3>
      </header>

      <div className="h-[280px] p-4">
        {mounted ? <ResponsiveContainer height="100%" minHeight={220} minWidth={0} width="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(34,211,238,0.14)" strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#7dd3fc" tick={{ fontSize: 12 }} />
            <YAxis stroke="#7dd3fc" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#071523", border: "1px solid rgba(56, 189, 248, 0.4)", borderRadius: 8 }} />
            <Line dataKey="created" dot={{ r: 3 }} stroke="#3b82f6" strokeWidth={2} type="monotone" />
            <Line dataKey="accessed" dot={{ r: 3 }} stroke="#22c55e" strokeWidth={2} type="monotone" />
            <Line dataKey="expired" dot={{ r: 3 }} stroke="#ef4444" strokeWidth={2} type="monotone" />
          </LineChart>
        </ResponsiveContainer> : null}
      </div>

      <footer className="flex flex-wrap items-center gap-4 border-t border-cyan-900/35 px-4 py-2 text-xs text-cyan-500">
        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" />Created</span>
        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" />Accessed</span>
        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" />Expired</span>
      </footer>
    </section>
  );
}
