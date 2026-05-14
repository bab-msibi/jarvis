import { BrainMenuAction } from "@/components/brains/brain-action-menu";
import { BrainCard } from "@/components/brains/brain-card";
import { Brain } from "@/types/brain";

type BrainsGridProps = {
  brains: Brain[];
  compact?: boolean;
  onViewDetails: (brain: Brain) => void;
  onMenuAction: (brain: Brain, action: BrainMenuAction) => void;
};

export function BrainsGrid({ brains, compact, onViewDetails, onMenuAction }: BrainsGridProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {brains.map((brain) => (
        <div className={compact ? "opacity-95" : ""} key={brain.id}>
          <BrainCard brain={brain} onMenuAction={onMenuAction} onViewDetails={onViewDetails} />
        </div>
      ))}
    </section>
  );
}
