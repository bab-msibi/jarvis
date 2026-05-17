import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ActionButtonGroupProps = {
  children: ReactNode;
  className?: string;
};

export function ActionButtonGroup({ children, className }: ActionButtonGroupProps) {
  return <div className={cn("flex w-full flex-wrap items-center gap-2 sm:w-auto", className)}>{children}</div>;
}
