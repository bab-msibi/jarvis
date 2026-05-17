"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

type HealthCheckModalProps = {
  open: boolean;
  onClose: () => void;
  onRun: (scope: "quick" | "full") => void;
};

export function HealthCheckModal({ open, onClose, onRun }: HealthCheckModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const scope = String(formData.get("scope") ?? "quick") as "quick" | "full";
    onRun(scope);
    onClose();
  };

  return (
    <ModalShell
      description="Run a mocked system health check across Mac Mini and AI services."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="health-check-form" type="submit">
            Run Check
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Run Health Check"
    >
      <form className="space-y-3" id="health-check-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Health Check Scope</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue="quick" name="scope">
            <option className="bg-[#071523]" value="quick">
              Quick (core services + critical metrics)
            </option>
            <option className="bg-[#071523]" value="full">
              Full (all services + agent diagnostics)
            </option>
          </select>
        </label>
        <p className="text-xs text-cyan-600">Command execution is mocked for frontend mode. Real backend checks will be connected later.</p>
      </form>
    </ModalShell>
  );
}
