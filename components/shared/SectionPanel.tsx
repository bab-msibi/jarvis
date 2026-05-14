import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionPanelProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionPanel({ title, action, children, className, contentClassName }: SectionPanelProps) {
  return (
    <section className={cn("panel-base rounded-2xl", className)}>
      <header className="flex items-center justify-between border-b border-cyan-900/30 px-4 py-3 sm:px-5">
        <h2 className="text-sm uppercase tracking-[0.08em] text-cyan-200">{title}</h2>
        {action}
      </header>
      <div className={cn("p-4 sm:p-5", contentClassName)}>{children}</div>
    </section>
  );
}
