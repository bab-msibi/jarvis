import { Activity, CircleDot, Cpu, HardDrive, MemoryStick, Thermometer } from "lucide-react";

import { StatusBadge } from "@/components/shared/StatusBadge";
import { SystemStats } from "@/types/system";

type SystemTopBarProps = {
  system: SystemStats;
};

const metricConfig = [
  { key: "cpu", label: "CPU", icon: Cpu, suffix: "%" },
  { key: "ram", label: "RAM", icon: MemoryStick, suffix: "%" },
  { key: "ssd", label: "SSD", icon: HardDrive, suffix: "%" },
  { key: "temp", label: "TEMP", icon: Thermometer, suffix: "°C" }
] as const;

export function SystemTopBar({ system }: SystemTopBarProps) {
  const values = {
    cpu: system.cpuUsage,
    ram: system.ramUsage,
    ssd: system.ssdUsage,
    temp: system.temperature
  };

  return (
    <header className="border-b border-cyan-900/30 px-3 py-3 sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="panel-base rounded-full px-4 py-2 subtle-glow">
          <StatusBadge status="SYSTEM ONLINE" className="text-xs" />
        </div>

        <label className="panel-base flex min-w-[220px] items-center gap-2 rounded-xl px-3 py-2">
          <Activity className="h-4 w-4 text-cyan-400" />
          <select className="w-full bg-transparent text-sm text-cyan-100 outline-none" defaultValue={system.name}>
            <option className="bg-[#071523]" value={system.name}>
              {system.name} ({system.os})
            </option>
          </select>
        </label>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {metricConfig.map((item) => {
            const Icon = item.icon;
            return (
              <div className="panel-base rounded-xl px-3 py-2" key={item.key}>
                <div className="flex items-center gap-1.5 text-cyan-700">
                  <Icon className="h-3.5 w-3.5" />
                  <span className="text-[10px] uppercase tracking-[0.1em]">{item.label}</span>
                </div>
                <p className="text-lg text-cyan-100">
                  {values[item.key]}
                  {item.suffix}
                </p>
              </div>
            );
          })}

          <div className="panel-base rounded-full p-2">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/60">
              <CircleDot className="h-5 w-5 text-cyan-300" />
              <span className="absolute inset-[4px] rounded-full border border-cyan-400/30" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
