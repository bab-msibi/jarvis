"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Activity, CircleDot, Cpu, HardDrive, MemoryStick, Menu, Search, Thermometer } from "lucide-react";

import { StatusBadge } from "@/components/shared/StatusBadge";
import { sidebarSections } from "@/lib/config/sidebar-nav";
import { useUIStore } from "@/lib/store/ui-store";
import { SystemStats } from "@/types/system";

type SystemTopBarProps = {
  system: SystemStats;
};

const metricConfig = [
  { key: "cpu", label: "CPU", icon: Cpu, suffix: "%" },
  { key: "ram", label: "RAM", icon: MemoryStick, suffix: "%" },
  { key: "ssd", label: "SSD", icon: HardDrive, suffix: "%" },
  { key: "temp", label: "TEMP", icon: Thermometer, suffix: "C" }
] as const;

export function SystemTopBar({ system }: SystemTopBarProps) {
  const pathname = usePathname();
  const setMobileSidebarOpen = useUIStore((state) => state.setMobileSidebarOpen);

  const values = {
    cpu: system.cpuUsage,
    ram: system.ramUsage,
    ssd: system.ssdUsage,
    temp: system.temperature
  };

  const routeLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    sidebarSections.forEach((section) => {
      section.items.forEach((item) => map.set(item.href, item.label));
    });
    return map;
  }, []);

  const breadcrumbs = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (!parts.length) return [{ href: "/dashboard", label: "Dashboard" }];

    return parts.map((part, index) => {
      const href = `/${parts.slice(0, index + 1).join("/")}`;
      const label = routeLabelMap.get(href) ?? part.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
      return { href, label };
    });
  }, [pathname, routeLabelMap]);

  return (
    <header className="space-y-3 border-b border-cyan-900/30 px-3 py-3 sm:px-6">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <button
          aria-label="Open navigation"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-cyan-900/40 bg-sky-950/50 text-cyan-200 transition hover:border-cyan-500/50 hover:text-cyan-100 md:hidden"
          onClick={() => setMobileSidebarOpen(true)}
          type="button"
        >
          <Menu className="h-4 w-4" />
        </button>

        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex min-w-0 flex-wrap items-center gap-1 text-xs text-cyan-600">
            {breadcrumbs.map((crumb, index) => (
              <li className="flex min-w-0 items-center gap-1" key={crumb.href}>
                <span className="max-w-[220px] truncate text-cyan-500">{crumb.label}</span>
                {index < breadcrumbs.length - 1 ? <span className="text-cyan-800">/</span> : null}
              </li>
            ))}
          </ol>
        </nav>

        <button
          aria-label="Open command search"
          className="ml-auto inline-flex h-9 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-xs text-cyan-300 transition hover:border-cyan-500/55 hover:text-cyan-100"
          type="button"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Command Search</span>
          <span className="rounded border border-cyan-900/50 px-1.5 py-0.5 text-[10px]">Ctrl K</span>
        </button>
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <div className="panel-base rounded-full px-4 py-2 subtle-glow">
          <StatusBadge status="SYSTEM ONLINE" className="text-xs" />
        </div>

        <label className="panel-base flex min-w-[200px] max-w-full items-center gap-2 rounded-xl px-3 py-2">
          <Activity className="h-4 w-4 shrink-0 text-cyan-400" />
          <select className="w-full bg-transparent text-sm text-cyan-100 outline-none" defaultValue={system.name}>
            <option className="bg-[#071523]" value={system.name}>
              {system.name} ({system.os})
            </option>
          </select>
        </label>

        <div className="ml-auto flex max-w-full flex-wrap items-center gap-2">
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

      <p className="text-right text-[11px] text-cyan-700">Last updated: just now</p>
    </header>
  );
}
