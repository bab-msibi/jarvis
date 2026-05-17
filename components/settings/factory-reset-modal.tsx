"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

type FactoryResetModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function FactoryResetModal({ open, onClose, onConfirm }: FactoryResetModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const confirmValue = String(formData.get("confirmValue") ?? "").trim().toUpperCase();
    if (confirmValue !== "RESET") return;
    onConfirm();
    onClose();
  };

  return (
    <ModalShell
      description="Danger zone: restore all settings to default values."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-rose-500/60 bg-rose-500/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/30" form="factory-reset-form" type="submit">
            Factory Reset
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Factory Reset"
    >
      <form className="space-y-3" id="factory-reset-form" onSubmit={onSubmit}>
        <p className="text-sm text-rose-200">Type <span className="font-semibold">RESET</span> to confirm factory reset.</p>
        <input
          className="h-10 w-full rounded-md border border-rose-700/50 bg-rose-950/25 px-3 text-sm text-rose-100 outline-none focus:border-rose-500/70"
          name="confirmValue"
          placeholder="RESET"
        />
      </form>
    </ModalShell>
  );
}
