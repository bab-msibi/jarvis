"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Incident } from "@/types/monitor";

type ResolveIncidentModalProps = {
  open: boolean;
  incident?: Incident;
  onClose: () => void;
  onResolve: (incidentId: string, resolution: string) => void;
};

export function ResolveIncidentModal({ open, incident, onClose, onResolve }: ResolveIncidentModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!incident) return;
    const formData = new FormData(event.currentTarget);
    const resolution = String(formData.get("resolution") ?? "").trim();
    onResolve(incident.id, resolution);
    onClose();
  };

  return (
    <ModalShell
      description="Resolve selected alert and log a short resolution note."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="rounded-md border border-emerald-500/60 bg-emerald-500/20 px-4 py-2 text-sm text-emerald-100 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!incident || incident.status === "RESOLVED"}
            form="resolve-incident-form"
            type="submit"
          >
            Resolve Incident
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Resolve Incident"
    >
      {incident ? (
        <form className="space-y-3" id="resolve-incident-form" onSubmit={onSubmit}>
          <div className="rounded-lg border border-cyan-900/35 bg-sky-950/35 p-3 text-sm">
            <p className="text-cyan-100">{incident.title}</p>
            <p className="mt-1 text-xs text-cyan-600">
              {incident.source} • {incident.timestamp}
            </p>
          </div>
          <label className="block space-y-1 text-sm text-cyan-300">
            <span>Resolution note</span>
            <textarea
              className="min-h-[90px] w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60"
              name="resolution"
              placeholder="Document what was done..."
            />
          </label>
        </form>
      ) : (
        <p className="text-sm text-cyan-600">No incident selected.</p>
      )}
    </ModalShell>
  );
}
