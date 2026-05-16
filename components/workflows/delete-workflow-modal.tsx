"use client";

import { ModalShell } from "@/components/ui/modal-shell";
import { Workflow } from "@/types/workflow";

type DeleteWorkflowModalProps = {
  open: boolean;
  workflow?: Workflow;
  onClose: () => void;
  onDelete: (workflowId: string) => void;
};

export function DeleteWorkflowModal({ open, workflow, onClose, onDelete }: DeleteWorkflowModalProps) {
  if (!workflow) return null;

  return (
    <ModalShell
      description="This will remove the workflow and its current configuration from the dashboard."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-md border border-rose-500/50 bg-rose-500/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/30"
            onClick={() => {
              onDelete(workflow.id);
              onClose();
            }}
            type="button"
          >
            Delete Workflow
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Delete Workflow"
    >
      <p className="text-sm text-cyan-300">
        Delete <span className="text-cyan-100">{workflow.name}</span>? This action cannot be undone.
      </p>
    </ModalShell>
  );
}
