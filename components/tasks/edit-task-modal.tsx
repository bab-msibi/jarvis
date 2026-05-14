"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { TaskFormFields, TaskFormValues } from "@/components/tasks/task-form-fields";
import { toInputDate } from "@/components/tasks/task-utils";
import { Task, TaskPriority, TaskStatus } from "@/types/task";

type EditTaskModalProps = {
  open: boolean;
  task?: Task;
  agentOptions: string[];
  modelOptions: string[];
  brainOptions: string[];
  onClose: () => void;
  onSave: (taskId: string, updates: Partial<Task>) => void;
};

function parseFormValues(formData: FormData): TaskFormValues {
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

export function EditTaskModal({ open, task, agentOptions, modelOptions, brainOptions, onClose, onSave }: EditTaskModalProps) {
  if (!task) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = parseFormValues(formData);

    onSave(task.id, {
      ...values,
      dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : task.dueDate,
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
      description="Update task details, routing, and timeline."
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
            form="edit-task-form"
            type="submit"
          >
            Save Changes
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Edit Task"
    >
      <form className="space-y-3" id="edit-task-form" onSubmit={onSubmit}>
        <TaskFormFields
          agentOptions={agentOptions}
          brainOptions={brainOptions}
          defaultValues={{
            name: task.name,
            description: task.description,
            assignedAgent: task.assignedAgent,
            linkedModel: task.linkedModel,
            linkedBrain: task.linkedBrain,
            priority: task.priority,
            status: task.status,
            progress: task.progress,
            eta: task.eta,
            dueDate: toInputDate(task.dueDate),
            tags: task.tags.join(", "),
            estimatedHours: task.estimatedHours
          }}
          modelOptions={modelOptions}
        />
      </form>
    </ModalShell>
  );
}
