import { Activity, CircleDashed, Cpu, HardDrive, MemoryStick } from "lucide-react";

import { StatusBadge } from "@/components/shared/StatusBadge";
import { SystemStats } from "@/types/system";

type TopStatusBarProps = {
  system: SystemStats;
};

const metricItems = [
  { key: "cpu", label: "CPU", icon: Cpu, unit: "%" },
  { key: "ram", label: "RAM", icon: MemoryStick, unit: "%" },
  { key: "ssd", label: "SSD", icon: HardDrive, unit: "%" }
] as const;

export function TopStatusBar({ system }: TopStatusBarProps) {
  const valueMap = {
    cpu: system.cpuUsage,
    ram: system.ramUsage,
    ssd: system.ssdUsage
  };

  return (
    <header className="border-b border-cyan-900/25 px-3 py-3 sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="panel-base subtle-glow rounded-full px-4 py-2">
          <StatusBadge status="System Online" className="text-xs" />
        </div>
        <div className="panel-base rounded-full px-4 py-2">
          <p className="text-sm text-cyan-100">{system.name}</p>
          <p className="text-[11px] text-cyan-700">{system.os}</p>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {metricItems.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.key} className="panel-base rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-cyan-400" />
                  <p className="text-[10px] uppercase tracking-[0.12em] text-cyan-700">{metric.label}</p>
                </div>
                <p className="text-sm text-cyan-100">
                  {valueMap[metric.key]}
                  {metric.unit}
                </p>
              </div>
            );
          })}
          <div className="panel-base rounded-full p-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/60">
              <CircleDashed className="h-4 w-4 text-cyan-300" />
              <Activity className="absolute h-2.5 w-2.5 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
