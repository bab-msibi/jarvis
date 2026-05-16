"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { RetentionPolicy } from "@/types/memory";

type ConfigureRetentionModalProps = {
  open: boolean;
  policies: RetentionPolicy[];
  onClose: () => void;
  onSave: (policyId: string, maxDays: number, action: "Archive" | "Compress" | "Delete") => void;
};

export function ConfigureRetentionModal({ open, policies, onClose, onSave }: ConfigureRetentionModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const policyId = String(formData.get("policyId") ?? "");
    const maxDays = Number(formData.get("maxDays") ?? 30);
    const action = String(formData.get("action") ?? "Archive") as "Archive" | "Compress" | "Delete";
    onSave(policyId, maxDays, action);
    onClose();
  };

  return (
    <ModalShell
      description="Configure retention behavior for selected memory policy."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="configure-retention-form" type="submit">
            Save Policy
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Configure Retention"
    >
      <form className="space-y-3" id="configure-retention-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Policy</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue={policies[0]?.id} name="policyId">
            {policies.map((policy) => (
              <option className="bg-[#071523]" key={policy.id} value={policy.id}>
                {policy.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Retention Days</span>
          <input className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60" defaultValue={policies[0]?.maxDays ?? 30} min={1} name="maxDays" type="number" />
        </label>

        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Action</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue={policies[0]?.action ?? "Archive"} name="action">
            <option className="bg-[#071523]" value="Archive">
              Archive
            </option>
            <option className="bg-[#071523]" value="Compress">
              Compress
            </option>
            <option className="bg-[#071523]" value="Delete">
              Delete
            </option>
          </select>
        </label>
      </form>
    </ModalShell>
  );
}
