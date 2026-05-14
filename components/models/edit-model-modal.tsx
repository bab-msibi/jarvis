"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Model, ModelStatus, ModelType } from "@/types/model";

type EditModelModalProps = {
  open: boolean;
  model?: Model;
  providerOptions: string[];
  onClose: () => void;
  onSave: (modelId: string, updates: Partial<Model>) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-500/60";

export function EditModelModal({ open, model, providerOptions, onClose, onSave }: EditModelModalProps) {
  if (!model) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSave(model.id, {
      name: String(formData.get("name") ?? model.name).trim() || model.name,
      provider: String(formData.get("provider") ?? model.provider),
      version: String(formData.get("version") ?? model.version),
      type: String(formData.get("type") ?? model.type) as ModelType,
      status: String(formData.get("status") ?? model.status) as ModelStatus,
      usage: Number(formData.get("usage") ?? model.usage),
      contextWindow: String(formData.get("contextWindow") ?? model.contextWindow),
      quota: String(formData.get("quota") ?? model.quota),
      description: String(formData.get("description") ?? model.description),
      apiEndpoint: String(formData.get("apiEndpoint") ?? model.apiEndpoint),
      localPath: String(formData.get("localPath") ?? model.localPath)
    });
    onClose();
  };

  return (
    <ModalShell
      description="Update model metadata and runtime configuration."
      onClose={onClose}
      open={open}
      title="Edit Model"
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="edit-model-form" type="submit">
            Save Changes
          </button>
        </>
      }
    >
      <form className="space-y-3" id="edit-model-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Model Name</span>
          <input className={fieldClassName} defaultValue={model.name} name="name" />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Provider</span>
            <select className={fieldClassName} defaultValue={model.provider} name="provider">
              {providerOptions.map((provider) => (
                <option className="bg-[#071523]" key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Version</span>
            <input className={fieldClassName} defaultValue={model.version} name="version" />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Type</span>
            <select className={fieldClassName} defaultValue={model.type} name="type">
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
            <select className={fieldClassName} defaultValue={model.status} name="status">
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
            <input className={fieldClassName} defaultValue={model.usage} max={100} min={0} name="usage" type="number" />
          </label>
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Context Window</span>
            <input className={fieldClassName} defaultValue={model.contextWindow} name="contextWindow" />
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Quota</span>
          <input className={fieldClassName} defaultValue={model.quota} name="quota" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Description</span>
          <input className={fieldClassName} defaultValue={model.description} name="description" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">API Endpoint</span>
          <input className={fieldClassName} defaultValue={model.apiEndpoint} name="apiEndpoint" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Local Path</span>
          <input className={fieldClassName} defaultValue={model.localPath} name="localPath" />
        </label>
      </form>
    </ModalShell>
  );
}
