"use client";

import { CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export type ToastTone = "success" | "info" | "warning" | "error";

export type ToastItem = {
  id: string;
  title: string;
  description?: string;
  tone?: ToastTone;
};

type ToastStackProps = {
  toasts: ToastItem[];
};

const toneStyles: Record<ToastTone, string> = {
  success: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
  info: "border-cyan-400/40 bg-cyan-500/10 text-cyan-100",
  warning: "border-amber-400/40 bg-amber-500/10 text-amber-100",
  error: "border-rose-400/40 bg-rose-500/10 text-rose-100"
};

const toneIcons = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle
} as const;

export function ToastStack({ toasts }: ToastStackProps) {
  if (!toasts.length) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => {
        const tone = toast.tone ?? "info";
        const Icon = toneIcons[tone];

        return (
          <div
            className={cn("pointer-events-auto rounded-xl border px-3 py-2.5 shadow-glow", toneStyles[tone])}
            key={toast.id}
            role="status"
          >
            <div className="flex items-start gap-2">
              <Icon className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="text-sm">{toast.title}</p>
                {toast.description ? <p className="mt-0.5 text-xs opacity-90">{toast.description}</p> : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
