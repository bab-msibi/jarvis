"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { ModelStatus, ModelType } from "@/types/model";

export type AddModelInput = {
  name: string;
  provider: string;
  version: string;
  type: ModelType;
  status: ModelStatus;
  usage: number;
  connectedAgents: number;
  contextWindow: string;
  quota: string;
  description: string;
  apiEndpoint: string;
  localPath: string;
};

type AddModelModalProps = {
  open: boolean;
  providerOptions: string[];
  onClose: () => void;
  onAdd: (values: AddModelInput) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function AddModelModal({ open, providerOptions, onClose, onAdd }: AddModelModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    if (!name) return;

    onAdd({
      name,
      provider: String(formData.get("provider") ?? providerOptions[0] ?? "OpenAI"),
      version: String(formData.get("version") ?? "1.0"),
      type: String(formData.get("type") ?? "API") as ModelType,
      status: String(formData.get("status") ?? "ACTIVE") as ModelStatus,
      usage: Number(formData.get("usage") ?? 0),
      connectedAgents: Number(formData.get("connectedAgents") ?? 0),
      contextWindow: String(formData.get("contextWindow") ?? "128K"),
      quota: String(formData.get("quota") ?? "0%"),
      description: String(formData.get("description") ?? "New model instance"),
      apiEndpoint: String(formData.get("apiEndpoint") ?? ""),
      localPath: String(formData.get("localPath") ?? "")
    });

    onClose();
  };

  return (
    <ModalShell
      description="Register a new model runtime for your orchestration layer."
      onClose={onClose}
      open={open}
      title="Add Model"
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="add-model-form" type="submit">
            Add Model
          </button>
        </>
      }
    >
      <form className="space-y-3" id="add-model-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Model Name</span>
          <input className={fieldClassName} name="name" placeholder="Example: Command-Reasoner XL" />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Provider</span>
            <select className={fieldClassName} defaultValue={providerOptions[0] ?? "OpenAI"} name="provider">
              {providerOptions.map((provider) => (
                <option className="bg-[#071523]" key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Version</span>
            <input className={fieldClassName} defaultValue="1.0" name="version" />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Type</span>
            <select className={fieldClassName} defaultValue="API" name="type">
              <option className="bg-[#071523]" value="API">
                API
              </option>
              <option className="bg-[#071523]" value="LOCAL">
                LOCAL
              </option>
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Status</span>
            <select className={fieldClassName} defaultValue="ACTIVE" name="status">
              <option className="bg-[#071523]" value="ACTIVE">
                ACTIVE
              </option>
              <option className="bg-[#071523]" value="IDLE">
                IDLE
              </option>
              <option className="bg-[#071523]" value="UPDATING">
                UPDATING
              </option>
              <option className="bg-[#071523]" value="ERROR">
                ERROR
              </option>
            </select>
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Usage (%)</span>
            <input className={fieldClassName} defaultValue={0} max={100} min={0} name="usage" type="number" />
          </label>
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Connected Agents</span>
            <input className={fieldClassName} defaultValue={0} min={0} name="connectedAgents" type="number" />
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Context Window</span>
          <input className={fieldClassName} defaultValue="128K" name="contextWindow" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Quota</span>
          <input className={fieldClassName} defaultValue="0%" name="quota" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Description</span>
          <input className={fieldClassName} defaultValue="New model instance" name="description" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">API Endpoint</span>
          <input className={fieldClassName} name="apiEndpoint" placeholder="https://..." />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Local Path</span>
          <input className={fieldClassName} name="localPath" placeholder="/path/to/model" />
        </label>
      </form>
    </ModalShell>
  );
}
