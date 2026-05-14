"use client";

import { BrainCircuit, CircleDot, Network } from "lucide-react";

import { BrainActionMenu, BrainMenuAction } from "@/components/brains/brain-action-menu";
import { BrainKnowledgeBadge } from "@/components/brains/brain-knowledge-badge";
import { BrainStatusBadge } from "@/components/brains/brain-status-badge";
import { Brain } from "@/types/brain";

type BrainCardProps = {
  brain: Brain;
  onViewDetails: (brain: Brain) => void;
  onMenuAction: (brain: Brain, action: BrainMenuAction) => void;
};

export function BrainCard({ brain, onViewDetails, onMenuAction }: BrainCardProps) {
  return (
    <article className="panel-base rounded-2xl p-3.5 transition hover:border-cyan-500/45">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-cyan-300" />
            <h3 className="truncate text-lg text-cyan-100">{brain.name}</h3>
          </div>
          <p className="text-xs text-cyan-700">v{brain.version}</p>
        </div>
        <BrainStatusBadge status={brain.status} />
      </div>

      <p className="mt-3 text-sm text-cyan-400">{brain.description}</p>

      <div className="mt-3 space-y-2 text-xs">
        <p className="flex items-center gap-1.5 text-cyan-500">
          <CircleDot className="h-3.5 w-3.5" />
          Agents: {brain.linkedAgents.length}
        </p>
        <p className="flex items-center gap-1.5 text-cyan-500">
          <Network className="h-3.5 w-3.5" />
          Models: {brain.linkedModels.length}
        </p>
        <BrainKnowledgeBadge source={brain.knowledgeSource} />
      </div>

      <div className="mt-2 text-xs text-cyan-600">Updated {brain.lastUpdated}</div>

      <div className="mt-3 flex items-center gap-2">
        <button
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-cyan-700/50 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100 transition hover:border-cyan-400/70 hover:bg-cyan-500/20"
          onClick={() => onViewDetails(brain)}
          type="button"
        >
          View Details
        </button>
        <BrainActionMenu onAction={(action) => onMenuAction(brain, action)} />
      </div>
    </article>
  );
}
