"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, PanelLeftClose, PanelLeftOpen, UserCircle2 } from "lucide-react";

import { sidebarSections } from "@/lib/config/sidebar-nav";
import { useUIStore } from "@/lib/store/ui-store";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const mobileSidebarOpen = useUIStore((state) => state.mobileSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const setMobileSidebarOpen = useUIStore((state) => state.setMobileSidebarOpen);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname, setMobileSidebarOpen]);

  return (
    <>
      <div
        className={cn("fixed inset-0 z-30 bg-[#01050ccc] transition md:hidden", mobileSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0")}
        onClick={() => setMobileSidebarOpen(false)}
      />

      <aside
        className={cn(
          "panel-base hud-grid fixed inset-y-0 left-0 z-40 flex w-[286px] flex-col overflow-hidden border-r border-cyan-900/30 transition-transform duration-200 md:sticky md:top-0 md:z-20 md:h-screen md:w-[300px] md:translate-x-0",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          sidebarCollapsed && "md:w-[92px]"
        )}
      >
        <div className="border-b border-cyan-900/30 px-4 py-4">
          <div className="flex items-start justify-between gap-2">
            <div className={cn("space-y-1", sidebarCollapsed && "hidden")}>
              <p className="truncate text-4xl leading-none tracking-[0.18em] text-cyan-300">JARVIS</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-700">Artificial Intelligent Control Interface</p>
            </div>
            <button
              aria-label="Toggle sidebar"
              className="rounded-md border border-cyan-900/40 bg-sky-950/50 p-1.5 text-cyan-200 transition hover:border-cyan-500/50 hover:text-cyan-100"
              onClick={toggleSidebar}
              type="button"
            >
              {sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          </div>
          {/* <div
            className={cn(
              "mx-auto mt-5 hidden h-[92px] w-[92px] items-center justify-center rounded-full border border-cyan-500/40 subtle-glow md:flex",
              sidebarCollapsed && "mt-2 h-[54px] w-[54px]"
            )}
          >
            <div className="relative h-[64px] w-[64px] rounded-full border border-cyan-400/50" aria-hidden>
              <div className="absolute inset-[10px] rounded-full border border-cyan-400/40" />
              <div className="absolute inset-[21px] rounded-full border border-cyan-300/70" />
            </div>
          </div> */}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
          <nav className="space-y-6">
            {sidebarSections.map((section) => (
              <div key={section.label} className="space-y-2">
                {!sidebarCollapsed ? <p className="px-2 text-[10px] uppercase tracking-[0.14em] text-cyan-700">{section.label}</p> : null}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      href={item.href}
                      key={item.href}
                      className={cn(
                        "group flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition",
                        "border-transparent text-sky-100 hover:border-cyan-700/40 hover:bg-cyan-500/10",
                        isActive && "border-cyan-500/60 bg-cyan-500/15 text-cyan-100 shadow-glow"
                      )}
                      onClick={() => setMobileSidebarOpen(false)}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-cyan-300" : "text-cyan-500")} />
                      <span className={cn("truncate", sidebarCollapsed && "hidden")}>{item.label}</span>
                      <ChevronRight className={cn("ml-auto h-3.5 w-3.5 text-cyan-700 transition group-hover:text-cyan-300", sidebarCollapsed && "hidden")} />
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        <div className="border-t border-cyan-900/30 p-3">
          <button
            className={cn(
              "w-full rounded-xl border border-cyan-900/40 bg-sky-950/50 p-3 text-left transition hover:border-cyan-600/60",
              "flex items-center gap-2"
            )}
            type="button"
          >
            <UserCircle2 className="h-8 w-8 text-cyan-300" />
            <div className={cn("leading-tight", sidebarCollapsed && "hidden")}>
              <p className="text-sm text-cyan-100">USER</p>
              <p className="text-xs text-cyan-600">Owner</p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
