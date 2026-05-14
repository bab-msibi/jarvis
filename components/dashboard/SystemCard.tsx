import { Cpu, HardDrive, Thermometer, MemoryStick } from "lucide-react";

import { SystemStats } from "@/types/system";

type SystemCardProps = {
  system: SystemStats;
};

const statConfig = [
  { key: "cpu", label: "CPU", icon: Cpu },
  { key: "ram", label: "RAM", icon: MemoryStick },
  { key: "ssd", label: "SSD", icon: HardDrive },
  { key: "temp", label: "Temp", icon: Thermometer }
] as const;

export function SystemCard({ system }: SystemCardProps) {
  const metricMap = {
    cpu: `${system.cpuUsage}%`,
    ram: `${system.ramUsage}%`,
    ssd: `${system.ssdUsage}%`,
    temp: `${system.temperature}°C`
  };

  return (
    <section className="panel-base rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-4 rounded-xl border border-cyan-900/30 bg-sky-950/40 p-4">
          <div className="h-16 w-24 rounded-xl border border-cyan-800/40 bg-gradient-to-b from-slate-300 to-slate-500 shadow-inner" />
          <div className="min-w-0">
            <h2 className="text-xl text-cyan-100">{system.name}</h2>
            <p className="truncate text-sm text-cyan-500">{system.specs}</p>
            <p className="text-sm text-cyan-700">{system.os}</p>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3 lg:grid-cols-4">
          {statConfig.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="rounded-xl border border-cyan-900/30 bg-sky-950/40 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-cyan-400" />
                  <p className="text-xs uppercase tracking-[0.1em] text-cyan-700">{item.label}</p>
                </div>
                <p className="mt-1 text-lg text-cyan-100">{metricMap[item.key]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
