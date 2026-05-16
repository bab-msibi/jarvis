"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Workflow } from "@/types/workflow";

type WorkflowRunModalProps = {
  open: boolean;
  workflow?: Workflow;
  onClose: () => void;
  onRun: (workflowId: string, runMode: "test" | "full") => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-500/60";

export function WorkflowRunModal({ open, workflow, onClose, onRun }: WorkflowRunModalProps) {
  if (!workflow) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const runMode = String(formData.get("runMode") ?? "test") as "test" | "full";
    onRun(workflow.id, runMode);
    onClose();
  };

  return (
    <ModalShell
      description={`Start a workflow execution for "${workflow.name}".`}
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="run-workflow-form" type="submit">
            Run Workflow
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Workflow Run"
    >
      <form className="space-y-3" id="run-workflow-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Run Mode</span>
          <select className={fieldClassName} defaultValue="test" name="runMode">
            <option className="bg-[#071523]" value="test">
              Test Run
            </option>
            <option className="bg-[#071523]" value="full">
              Full Execution
            </option>
          </select>
        </label>
      </form>
    </ModalShell>
  );
}
