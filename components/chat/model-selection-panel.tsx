import { Sparkles } from "lucide-react";

import { ModelCard } from "@/components/chat/model-card";
import { ChatModel } from "@/types/chat";

type ModelSelectionPanelProps = {
  models: ChatModel[];
  activeModelId: string;
  onSelectModel: (modelId: string) => void;
  onManageModels: () => void;
};

export function ModelSelectionPanel({ models, activeModelId, onSelectModel, onManageModels }: ModelSelectionPanelProps) {
  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h2 className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.08em] text-cyan-200">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          Available Models
        </h2>
      </header>

      <div className="space-y-2.5 p-4">
        {models.map((model) => (
          <ModelCard active={model.id === activeModelId} key={model.id} model={model} onSelect={onSelectModel} />
        ))}

        <button
          className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-cyan-500/45 bg-cyan-500/12 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/22"
          onClick={onManageModels}
          type="button"
        >
          Manage Models
        </button>
      </div>
    </section>
  );
}
