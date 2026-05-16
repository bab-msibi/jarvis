"use client";

import { FormEvent } from "react";

import { MemoryFormFields, MemoryFormValues } from "@/components/memory/memory-form-fields";
import { ModalShell } from "@/components/ui/modal-shell";
import { MemoryClass, MemoryDecayStatus, MemoryImportance, MemoryItem, MemoryType } from "@/types/memory";

type EditMemoryModalProps = {
  open: boolean;
  memory?: MemoryItem;
  typeOptions: MemoryType[];
  brainOptions: string[];
  agentOptions: string[];
  onClose: () => void;
  onSave: (memoryId: string, values: MemoryFormValues) => void;
};

function parseForm(formData: FormData): MemoryFormValues {
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

export function EditMemoryModal({ open, memory, typeOptions, brainOptions, agentOptions, onClose, onSave }: EditMemoryModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!memory) return;
    const values = parseForm(new FormData(event.currentTarget));
    if (!values.content) return;
    onSave(memory.id, values);
    onClose();
  };

  return (
    <ModalShell
      description={memory ? `Update memory metadata and routing for ${memory.embeddingId}.` : "Select a memory first."}
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!memory}
            form="edit-memory-form"
            type="submit"
          >
            Save Changes
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Edit Memory"
    >
      <form className="space-y-3" id="edit-memory-form" onSubmit={onSubmit}>
        <MemoryFormFields
          agentOptions={agentOptions}
          brainOptions={brainOptions}
          defaultValues={{
            content: memory?.content ?? "",
            type: memory?.type ?? "FACT",
            brain: memory?.brain ?? brainOptions[0] ?? "General Brain",
            agent: memory?.agent ?? agentOptions[0] ?? "Project Manager",
            importance: memory?.importance ?? "Medium",
            decayStatus: memory?.decayStatus ?? "Medium",
            memoryClass: memory?.memoryClass ?? "Long Term",
            tags: memory?.tags.join(", ") ?? ""
          }}
          typeOptions={typeOptions}
        />
      </form>
    </ModalShell>
  );
}
