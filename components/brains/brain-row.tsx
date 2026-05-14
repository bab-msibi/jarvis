"use client";

import { BrainCircuit, RefreshCw, SquarePen } from "lucide-react";

import { BrainActionMenu, BrainMenuAction } from "@/components/brains/brain-action-menu";
import { BrainKnowledgeBadge } from "@/components/brains/brain-knowledge-badge";
import { BrainStatusBadge } from "@/components/brains/brain-status-badge";
import { Brain } from "@/types/brain";

type BrainRowProps = {
  brain: Brain;
  mobile?: boolean;
  onViewDetails: (brain: Brain) => void;
  onMenuAction: (brain: Brain, action: BrainMenuAction) => void;
};

export function BrainRow({ brain, mobile, onViewDetails, onMenuAction }: BrainRowProps) {
  if (!mobile) return null;

  return (
    <article className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-cyan-300" />
            <p className="truncate text-base text-cyan-100">{brain.name}</p>
          </div>
          <p className="text-xs text-cyan-600">v{brain.version}</p>
        </div>
        <BrainStatusBadge status={brain.status} />
      </div>

      <p className="mt-2 text-sm text-cyan-300">{brain.purpose}</p>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <BrainKnowledgeBadge source={brain.knowledgeSource} />
        <p className="text-xs text-cyan-600">Agents {brain.linkedAgents.length}</p>
        <p className="text-xs text-cyan-600">Models {brain.linkedModels.length}</p>
      </div>

      <p className="mt-2 text-xs text-cyan-600">Updated {brain.lastUpdated}</p>

      <div className="mt-3 flex items-center gap-2">
        <button
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-cyan-700/50 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100 transition hover:border-cyan-400/70 hover:bg-cyan-500/20"
          onClick={() => onViewDetails(brain)}
          type="button"
        >
          View Details
        </button>
        <button
          className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-2 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
          onClick={() => onMenuAction(brain, "edit")}
          type="button"
        >
          <SquarePen className="h-4 w-4" />
        </button>
        <button
          className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-2 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
          onClick={() => onMenuAction(brain, "sync")}
          type="button"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        <BrainActionMenu onAction={(action) => onMenuAction(brain, action)} />
      </div>
    </article>
  );
}
