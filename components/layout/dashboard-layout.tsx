import { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SystemTopBar } from "@/components/layout/system-top-bar";
import { SystemStats } from "@/types/system";

type DashboardLayoutProps = {
  system: SystemStats;
  children: ReactNode;
};

export function DashboardLayout({ system, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-jarvis-bg text-cyan-50">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <SystemTopBar system={system} />
          <div className="flex-1 p-3 sm:p-4 xl:p-6">
            <div className="page-shell-tight min-w-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
