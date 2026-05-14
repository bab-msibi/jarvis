"use client";

import { Settings2 } from "lucide-react";

import { ModelActionMenu, ModelMenuAction } from "@/components/models/model-action-menu";
import { ModelStatusBadge } from "@/components/models/model-status-badge";
import { ModelTypeBadge } from "@/components/models/model-type-badge";
import { ModelUsageBar } from "@/components/models/model-usage-bar";
import { ProviderIcon } from "@/components/models/provider-icon";
import { Model } from "@/types/model";

type ModelRowProps = {
  model: Model;
  mobile?: boolean;
  onManage: (model: Model) => void;
  onMenuAction: (model: Model, action: ModelMenuAction) => void;
};

export function ModelRow({ model, mobile, onManage, onMenuAction }: ModelRowProps) {
  if (mobile) {
    return (
      <article className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <ProviderIcon provider={model.provider} />
              <p className="truncate text-base text-cyan-100">{model.name}</p>
            </div>
            <p className="text-xs text-cyan-600">
              {model.provider} • v{model.version} • {model.contextWindow}
            </p>
          </div>
          <ModelStatusBadge status={model.status} />
        </div>

        <div className="mt-2 flex items-center gap-2">
          <ModelTypeBadge type={model.type} />
          <p className="text-xs text-cyan-600">Added {model.addedOn}</p>
        </div>

        <div className="mt-2">
          <div className="mb-1 flex items-center justify-between text-xs text-cyan-600">
            <span>Quota / Usage</span>
            <span>{model.quota}</span>
          </div>
          <ModelUsageBar usage={model.usage} />
        </div>

        <p className="mt-2 text-xs text-cyan-600">
          Used by {model.connectedAgents} {model.connectedAgents === 1 ? "agent" : "agents"}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <button
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-cyan-700/50 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100 transition hover:border-cyan-400/70 hover:bg-cyan-500/20"
            onClick={() => onManage(model)}
            type="button"
          >
            <Settings2 className="h-4 w-4" />
            Manage
          </button>
          <ModelActionMenu onAction={(action) => onMenuAction(model, action)} />
        </div>
      </article>
    );
  }

  return (
    <tr className="border-b border-cyan-900/25 text-sm transition hover:bg-cyan-500/5">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <ProviderIcon provider={model.provider} />
          <div>
            <p className="text-cyan-100">{model.name}</p>
            <p className="text-xs text-cyan-700">{model.description}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 text-cyan-200">{model.provider}</td>
      <td className="px-3 py-3">
        <ModelTypeBadge type={model.type} />
      </td>
      <td className="px-3 py-3">
        <ModelStatusBadge status={model.status} />
      </td>
      <td className="px-3 py-3 text-cyan-200">v{model.version}</td>
      <td className="px-3 py-3 text-cyan-200">{model.contextWindow}</td>
      <td className="px-3 py-3">
        <div className="flex min-w-[130px] items-center gap-2">
          <span className="w-9 text-xs text-cyan-300">{model.quota}</span>
          <ModelUsageBar usage={model.usage} />
        </div>
      </td>
      <td className="px-3 py-3 text-cyan-200">
        {model.connectedAgents} {model.connectedAgents === 1 ? "agent" : "agents"}
      </td>
      <td className="whitespace-nowrap px-3 py-3 text-cyan-600">{model.addedOn}</td>
      <td className="px-3 py-3">
        <div className="flex items-center justify-end gap-2">
          <button
            className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-2 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={() => onManage(model)}
            type="button"
          >
            <Settings2 className="h-4 w-4" />
          </button>
          <ModelActionMenu onAction={(action) => onMenuAction(model, action)} />
        </div>
      </td>
    </tr>
  );
}
