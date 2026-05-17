import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type DataTableWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function DataTableWrapper({ children, className }: DataTableWrapperProps) {
  return (
    <div className={cn("hidden md:block", className)}>
      <div className="table-scroll-region">{children}</div>
    </div>
  );
}
