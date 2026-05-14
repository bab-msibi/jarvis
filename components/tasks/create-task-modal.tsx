"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { TaskFormFields, TaskFormValues } from "@/components/tasks/task-form-fields";
import { TaskPriority, TaskStatus } from "@/types/task";

export type CreateTaskInput = TaskFormValues;

type CreateTaskModalProps = {
  open: boolean;
  agentOptions: string[];
  modelOptions: string[];
  brainOptions: string[];
  onClose: () => void;
  onCreate: (values: CreateTaskInput) => void;
};

function parseFormValues(formData: FormData): CreateTaskInput {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    assignedAgent: String(formData.get("assignedAgent") ?? ""),
    linkedModel: String(formData.get("linkedModel") ?? ""),
    linkedBrain: String(formData.get("linkedBrain") ?? ""),
    priority: String(formData.get("priority") ?? "MEDIUM") as TaskPriority,
    status: String(formData.get("status") ?? "NOT STARTED") as TaskStatus,
    progress: Math.max(0, Math.min(100, Number(formData.get("progress") ?? 0))),
    eta: String(formData.get("eta") ?? "0m"),
    dueDate: String(formData.get("dueDate") ?? ""),
    tags: String(formData.get("tags") ?? ""),
    estimatedHours: Math.max(0, Number(formData.get("estimatedHours") ?? 0))
  };
}

export function CreateTaskModal({ open, agentOptions, modelOptions, brainOptions, onClose, onCreate }: CreateTaskModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = parseFormValues(formData);
    if (!values.name) return;
    onCreate(values);
    onClose();
  };

  return (
    <ModalShell
      description="Create and assign a new orchestration task."
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
            className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30"
            form="create-task-form"
            type="submit"
          >
            Create Task
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Create Task"
    >
      <form className="space-y-3" id="create-task-form" onSubmit={onSubmit}>
        <TaskFormFields
          agentOptions={agentOptions}
          brainOptions={brainOptions}
          defaultValues={{
            name: "",
            description: "",
            assignedAgent: agentOptions[0] ?? "",
            linkedModel: modelOptions[0] ?? "",
            linkedBrain: brainOptions[0] ?? "",
            priority: "MEDIUM",
            status: "NOT STARTED",
            progress: 0,
            eta: "1h",
            dueDate: "",
            tags: "",
            estimatedHours: 2
          }}
          modelOptions={modelOptions}
        />
      </form>
    </ModalShell>
  );
}
