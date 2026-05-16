"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Workflow } from "@/types/workflow";

type TriggerConfigModalProps = {
  open: boolean;
  workflow?: Workflow;
  onClose: () => void;
  onSave: (workflowId: string, configSummary: string) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function TriggerConfigModal({ open, workflow, onClose, onSave }: TriggerConfigModalProps) {
  if (!workflow) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const triggerType = String(formData.get("triggerType") ?? workflow.trigger);
    const triggerValue = String(formData.get("triggerValue") ?? "");
    onSave(workflow.id, `${triggerType}: ${triggerValue || "default"}`);
    onClose();
  };

  return (
    <ModalShell
      description={`Configure trigger settings for "${workflow.name}".`}
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="trigger-config-form" type="submit">
            Save Trigger
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Trigger Configuration"
    >
      <form className="space-y-3" id="trigger-config-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Trigger Type</span>
          <select className={fieldClassName} defaultValue={workflow.trigger} name="triggerType">
            <option className="bg-[#071523]" value="Schedule">
              Schedule
            </option>
            <option className="bg-[#071523]" value="Webhook">
              Webhook
            </option>
            <option className="bg-[#071523]" value="Manual">
              Manual
            </option>
            <option className="bg-[#071523]" value="Event">
              Event
            </option>
            <option className="bg-[#071523]" value="API">
              API
            </option>
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Config Value</span>
          <input className={fieldClassName} name="triggerValue" placeholder="cron(0 * * * *), webhook URL, event key..." />
        </label>
      </form>
    </ModalShell>
  );
}
