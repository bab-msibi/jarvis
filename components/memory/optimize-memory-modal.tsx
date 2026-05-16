"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

type OptimizeMemoryModalProps = {
  open: boolean;
  onClose: () => void;
  onOptimize: (mode: "standard" | "deep") => void;
};

export function OptimizeMemoryModal({ open, onClose, onOptimize }: OptimizeMemoryModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const mode = String(formData.get("mode") ?? "standard") as "standard" | "deep";
    onOptimize(mode);
    onClose();
  };

  return (
    <ModalShell
      description="Run memory optimization to compact storage and refresh decay scores."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="optimize-memory-form" type="submit">
            Optimize
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Optimize Memory"
    >
      <form className="space-y-3" id="optimize-memory-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Optimization Mode</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue="standard" name="mode">
            <option className="bg-[#071523]" value="standard">
              Standard optimization
            </option>
            <option className="bg-[#071523]" value="deep">
              Deep optimization
            </option>
          </select>
        </label>
      </form>
    </ModalShell>
  );
}
