"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

type ModalShellProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
};

export function ModalShell({ open, title, description, children, footer, onClose }: ModalShellProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#01050ccc] p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        aria-modal="true"
        className="panel-base flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-2xl border border-cyan-700/40 sm:max-w-lg sm:rounded-2xl"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between border-b border-cyan-900/35 px-5 py-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg text-cyan-100">{title}</h3>
            {description ? <p className="mt-1 line-clamp-2 text-sm text-cyan-600">{description}</p> : null}
          </div>
          <button
            aria-label="Close modal"
            className="rounded-md border border-cyan-900/40 p-1.5 text-cyan-500 transition hover:border-cyan-500/60 hover:text-cyan-200"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-4">{children}</div>

        {footer ? <footer className="flex items-center justify-end gap-2 border-t border-cyan-900/35 px-5 py-4">{footer}</footer> : null}
      </div>
    </div>
  );
}
