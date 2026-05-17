"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type ResponsiveDrawerProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  className?: string;
};

export function ResponsiveDrawer({ open, title, description, children, footer, onClose, className }: ResponsiveDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#01050ccc]" onClick={onClose}>
      <aside
        aria-label={title}
        className={cn(
          "panel-base absolute bottom-0 right-0 z-10 flex h-[88vh] w-full flex-col overflow-hidden rounded-t-2xl border border-cyan-700/40 sm:h-full sm:max-w-[460px] sm:rounded-none sm:border-l",
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-3 border-b border-cyan-900/35 px-4 py-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg text-cyan-100">{title}</h3>
            {description ? <p className="line-clamp-2 text-sm text-cyan-600">{description}</p> : null}
          </div>
          <button
            aria-label="Close drawer"
            className="rounded-md border border-cyan-900/40 p-1.5 text-cyan-500 transition hover:border-cyan-500/60 hover:text-cyan-200"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>

        {footer ? <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-cyan-900/35 px-4 py-3">{footer}</footer> : null}
      </aside>
    </div>
  );
}
