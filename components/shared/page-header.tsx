import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  className?: string;
  contentClassName?: string;
  meta?: ReactNode;
};

export function PageHeader({ title, subtitle, actions, className, contentClassName, meta }: PageHeaderProps) {
  return (
    <section className={cn("panel-base overflow-hidden rounded-2xl p-5 sm:p-6", className)}>
      <div className={cn("flex flex-wrap items-start justify-between gap-3", contentClassName)}>
        <div className="min-w-0 max-w-full flex-1">
          <h1 className="truncate text-2xl text-cyan-100 sm:text-3xl">{title}</h1>
          <p className="mt-1 line-clamp-2 break-anywhere text-cyan-600">{subtitle}</p>
          {meta ? <div className="mt-3">{meta}</div> : null}
        </div>
        {actions ? <div className="w-full shrink-0 sm:w-auto">{actions}</div> : null}
      </div>
    </section>
  );
}
