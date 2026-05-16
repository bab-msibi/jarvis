"use client";

import { FormEvent } from "react";

import { WorkflowFormFields, WorkflowFormValues } from "@/components/workflows/workflow-form-fields";
import { ModalShell } from "@/components/ui/modal-shell";
import { WorkflowStatus, WorkflowTrigger } from "@/types/workflow";

export type CreateWorkflowInput = WorkflowFormValues;

type CreateWorkflowModalProps = {
  open: boolean;
  agentOptions: string[];
  modelOptions: string[];
  brainOptions: string[];
  onClose: () => void;
  onCreate: (values: CreateWorkflowInput) => void;
};

function parseFormValues(formData: FormData): CreateWorkflowInput {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    trigger: String(formData.get("trigger") ?? "Manual") as WorkflowTrigger,
    assignedAgent: String(formData.get("assignedAgent") ?? ""),
    linkedModel: String(formData.get("linkedModel") ?? ""),
    linkedBrain: String(formData.get("linkedBrain") ?? ""),
    status: String(formData.get("status") ?? "DRAFT") as WorkflowStatus,
    tags: String(formData.get("tags") ?? "")
  };
}

export function CreateWorkflowModal({ open, agentOptions, modelOptions, brainOptions, onClose, onCreate }: CreateWorkflowModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = parseFormValues(new FormData(event.currentTarget));
    if (!values.name) return;
    onCreate(values);
    onClose();
  };

  return (
    <ModalShell
      description="Create a new automated AI workflow."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="create-workflow-form" type="submit">
            Create Workflow
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Create Workflow"
    >
      <form className="space-y-3" id="create-workflow-form" onSubmit={onSubmit}>
        <WorkflowFormFields
          agentOptions={agentOptions}
          brainOptions={brainOptions}
          defaultValues={{
            name: "",
            description: "",
            trigger: "Manual",
            assignedAgent: agentOptions[0] ?? "",
            linkedModel: modelOptions[0] ?? "",
            linkedBrain: brainOptions[0] ?? "",
            status: "DRAFT",
            tags: ""
          }}
          modelOptions={modelOptions}
        />
      </form>
    </ModalShell>
  );
}
