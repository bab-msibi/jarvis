"use client";

import { useEffect, useState } from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

type MemoryTypesRadarChartProps = {
  data: Array<{ type: string; value: number }>;
};

export function MemoryTypesRadarChart({ data }: MemoryTypesRadarChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-sm uppercase tracking-[0.08em] text-cyan-300">Memory Types Distribution</h3>
      </header>

      <div className="h-[310px] p-4">
        {mounted ? <ResponsiveContainer height="100%" minHeight={240} minWidth={0} width="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(34,211,238,0.2)" />
            <PolarAngleAxis dataKey="type" stroke="#bae6fd" tick={{ fontSize: 11 }} />
            <PolarRadiusAxis angle={80} domain={[0, 100]} stroke="#7dd3fc" tick={{ fontSize: 10 }} />
            <Radar dataKey="value" fill="#2563eb" fillOpacity={0.25} stroke="#22d3ee" strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer> : null}
      </div>
    </section>
  );
}
