"use client";

import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { MemoryUsageSlice } from "@/types/memory";

type MemoryUsagePanelProps = {
  usedGB: number;
  totalAllocatedGB: number;
  availableGB: number;
  slices: MemoryUsageSlice[];
};

export function MemoryUsagePanel({ usedGB, totalAllocatedGB, availableGB, slices }: MemoryUsagePanelProps) {
  return (
    <div className="space-y-3">
      <div className="h-[210px]">
        <ResponsiveContainer height="100%" minHeight={190} minWidth={0} width="100%">
          <PieChart>
            <Pie cx="34%" cy="50%" data={slices} dataKey="valueGB" innerRadius={44} outerRadius={66} paddingAngle={2} stroke="none">
              {slices.map((slice) => (
                <Cell fill={slice.color} key={slice.label} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: "#071523", border: "1px solid rgba(56, 189, 248, 0.4)", borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="-mt-[155px] ml-[16px] w-[95px] text-center">
        <p className="text-3xl text-cyan-100">{usedGB.toFixed(1)} GB</p>
        <p className="text-xs uppercase tracking-[0.08em] text-cyan-600">Used</p>
      </div>

      <div className="space-y-2 pt-2">
        {slices.map((slice) => {
          const percent = usedGB ? Math.round((slice.valueGB / usedGB) * 100) : 0;
          return (
            <div className="flex items-center justify-between gap-2 text-sm" key={slice.label}>
              <span className="inline-flex items-center gap-2 text-cyan-200">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
                {slice.label}
              </span>
              <span className="text-cyan-500">
                {slice.valueGB.toFixed(1)} GB ({percent}%)
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-cyan-900/35 pt-2 text-sm text-cyan-500">
        <span>Total Allocated: {totalAllocatedGB.toFixed(0)} GB</span>
        <span>Available: {availableGB.toFixed(1)} GB</span>
      </div>
    </div>
  );
}
