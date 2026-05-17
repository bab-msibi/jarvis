import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ResponsiveGridProps = {
  children: ReactNode;
  className?: string;
};

export function ResponsiveGrid({ children, className }: ResponsiveGridProps) {
  return <section className={cn("grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4", className)}>{children}</section>;
}
