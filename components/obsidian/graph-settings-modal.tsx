"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

type GraphSettingsModalProps = {
  open: boolean;
  graphPhysics: boolean;
  graphGlow: boolean;
  onClose: () => void;
  onSave: (settings: { graphPhysics: boolean; graphGlow: boolean }) => void;
};

export function GraphSettingsModal({ open, graphPhysics, graphGlow, onClose, onSave }: GraphSettingsModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSave({
      graphPhysics: String(formData.get("graphPhysics") ?? "off") === "on",
      graphGlow: String(formData.get("graphGlow") ?? "off") === "on"
    });
    onClose();
  };

  return (
    <ModalShell
      description="Adjust graph rendering preferences."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="graph-settings-form" type="submit">
            Save Graph Settings
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Graph Settings"
    >
      <form className="space-y-3" id="graph-settings-form" onSubmit={onSubmit}>
        <label className="flex items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/35 px-3 py-2 text-sm text-cyan-200">
          <input className="accent-cyan-400" defaultChecked={graphPhysics} name="graphPhysics" type="checkbox" />
          Enable graph physics simulation
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/35 px-3 py-2 text-sm text-cyan-200">
          <input className="accent-cyan-400" defaultChecked={graphGlow} name="graphGlow" type="checkbox" />
          Enable neon glow effects
        </label>
      </form>
    </ModalShell>
  );
}
