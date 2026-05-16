"use client";

import { FormEvent } from "react";

import { WorkflowFormFields, WorkflowFormValues } from "@/components/workflows/workflow-form-fields";
import { ModalShell } from "@/components/ui/modal-shell";
import { Workflow, WorkflowStatus, WorkflowTrigger } from "@/types/workflow";

type EditWorkflowModalProps = {
  open: boolean;
  workflow?: Workflow;
  agentOptions: string[];
  modelOptions: string[];
  brainOptions: string[];
  onClose: () => void;
  onSave: (workflowId: string, updates: Partial<Workflow>) => void;
};

function parseFormValues(formData: FormData): WorkflowFormValues {
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

export function EditWorkflowModal({ open, workflow, agentOptions, modelOptions, brainOptions, onClose, onSave }: EditWorkflowModalProps) {
  if (!workflow) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = parseFormValues(new FormData(event.currentTarget));
    onSave(workflow.id, {
      ...values,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <ModalShell
      description="Update workflow metadata and routing."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="edit-workflow-form" type="submit">
            Save Changes
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Edit Workflow"
    >
      <form className="space-y-3" id="edit-workflow-form" onSubmit={onSubmit}>
        <WorkflowFormFields
          agentOptions={agentOptions}
          brainOptions={brainOptions}
          defaultValues={{
            name: workflow.name,
            description: workflow.description,
            trigger: workflow.trigger,
            assignedAgent: workflow.assignedAgent,
            linkedModel: workflow.linkedModel,
            linkedBrain: workflow.linkedBrain,
            status: workflow.status,
            tags: workflow.tags.join(", ")
          }}
          modelOptions={modelOptions}
        />
      </form>
    </ModalShell>
  );
}
