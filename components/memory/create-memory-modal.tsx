"use client";

import { FormEvent } from "react";

import { MemoryFormFields, MemoryFormValues } from "@/components/memory/memory-form-fields";
import { ModalShell } from "@/components/ui/modal-shell";
import { MemoryClass, MemoryDecayStatus, MemoryImportance, MemoryType } from "@/types/memory";

export type CreateMemoryInput = MemoryFormValues;

type CreateMemoryModalProps = {
  open: boolean;
  typeOptions: MemoryType[];
  brainOptions: string[];
  agentOptions: string[];
  onClose: () => void;
  onCreate: (values: CreateMemoryInput) => void;
};

function parseForm(formData: FormData): CreateMemoryInput {
  return {
    content: String(formData.get("content") ?? "").trim(),
    type: String(formData.get("type") ?? "FACT") as MemoryType,
    brain: String(formData.get("brain") ?? "General Brain"),
    agent: String(formData.get("agent") ?? "Project Manager"),
    importance: String(formData.get("importance") ?? "Medium") as MemoryImportance,
    decayStatus: String(formData.get("decayStatus") ?? "Medium") as MemoryDecayStatus,
    memoryClass: String(formData.get("memoryClass") ?? "Long Term") as MemoryClass,
    tags: String(formData.get("tags") ?? "")
  };
}

export function CreateMemoryModal({ open, typeOptions, brainOptions, agentOptions, onClose, onCreate }: CreateMemoryModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = parseForm(new FormData(event.currentTarget));
    if (!values.content) return;
    onCreate(values);
    onClose();
  };

  return (
    <ModalShell
      description="Create a new memory entry for AI recall and orchestration."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="create-memory-form" type="submit">
            Create Memory
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Create Memory"
    >
      <form className="space-y-3" id="create-memory-form" onSubmit={onSubmit}>
        <MemoryFormFields
          agentOptions={agentOptions}
          brainOptions={brainOptions}
          defaultValues={{
            content: "",
            type: "FACT",
            brain: brainOptions[0] ?? "General Brain",
            agent: agentOptions[0] ?? "Project Manager",
            importance: "Medium",
            decayStatus: "Medium",
            memoryClass: "Long Term",
            tags: ""
          }}
          typeOptions={typeOptions}
        />
      </form>
    </ModalShell>
  );
}
