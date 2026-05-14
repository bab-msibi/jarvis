"use client";

import { Settings2 } from "lucide-react";

import { ModelMenuAction, ModelActionMenu } from "@/components/models/model-action-menu";
import { ModelStatusBadge } from "@/components/models/model-status-badge";
import { ModelTypeBadge } from "@/components/models/model-type-badge";
import { ModelUsageBar } from "@/components/models/model-usage-bar";
import { ProviderIcon } from "@/components/models/provider-icon";
import { Model } from "@/types/model";

type ModelCardProps = {
  model: Model;
  onManage: (model: Model) => void;
  onMenuAction: (model: Model, action: ModelMenuAction) => void;
};

export function ModelCard({ model, onManage, onMenuAction }: ModelCardProps) {
  return (
    <article className="panel-base rounded-2xl p-3.5 transition hover:border-cyan-500/45">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <ProviderIcon provider={model.provider} />
            <h3 className="truncate text-lg text-cyan-100">{model.name}</h3>
          </div>
          <p className="text-xs text-cyan-700">v{model.version}</p>
        </div>
        <ModelStatusBadge status={model.status} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <ModelTypeBadge type={model.type} />
      </div>

      <div className="mt-3">
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <p className="text-cyan-200">Usage</p>
          <p className="text-cyan-300">{model.usage}%</p>
        </div>
        <ModelUsageBar usage={model.usage} />
      </div>

      <p className="mt-2 text-sm text-cyan-600">
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
