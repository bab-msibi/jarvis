import { ModelCard } from "@/components/models/model-card";
import { ModelMenuAction } from "@/components/models/model-action-menu";
import { Model } from "@/types/model";

type ModelsGridProps = {
  models: Model[];
  compact?: boolean;
  onManage: (model: Model) => void;
  onMenuAction: (model: Model, action: ModelMenuAction) => void;
};

export function ModelsGrid({ models, compact, onManage, onMenuAction }: ModelsGridProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {models.map((model) => (
        <div className={compact ? "opacity-95" : ""} key={model.id}>
          <ModelCard model={model} onManage={onManage} onMenuAction={onMenuAction} />
        </div>
      ))}
    </section>
  );
}
