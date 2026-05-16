"use client";

import { Bot, BrainCircuit, Eye, Pin, Share2 } from "lucide-react";

import { DecayStatusBadge } from "@/components/memory/decay-status-badge";
import { ImportanceBadge } from "@/components/memory/importance-badge";
import { MemoryActionMenu, MemoryMenuAction } from "@/components/memory/memory-action-menu";
import { MemoryTypeBadge } from "@/components/memory/memory-type-badge";
import { getInitials } from "@/components/memory/memory-utils";
import { MemoryItem } from "@/types/memory";

type MemoryRowProps = {
  memory: MemoryItem;
  onView: (memory: MemoryItem) => void;
  onPin: (memory: MemoryItem) => void;
  onShare: (memory: MemoryItem) => void;
  onMenuAction: (memory: MemoryItem, action: MemoryMenuAction) => void;
};

export function MemoryRow({ memory, onView, onPin, onShare, onMenuAction }: MemoryRowProps) {
  return (
    <article className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3 transition hover:border-cyan-500/45">
      <div className="flex items-start justify-between gap-2">
        <button className="min-w-0 text-left" onClick={() => onView(memory)} type="button">
          <p className="truncate text-sm text-cyan-100">{memory.content}</p>
          <p className="mt-1 text-xs text-cyan-600">Last accessed {memory.lastAccessed}</p>
        </button>
        <MemoryActionMenu onAction={(action) => onMenuAction(memory, action)} />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <MemoryTypeBadge type={memory.type} />
        <ImportanceBadge importance={memory.importance} />
        <DecayStatusBadge status={memory.decayStatus} />
      </div>

      <div className="mt-2 space-y-1">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-xs text-violet-200">
          <BrainCircuit className="h-3 w-3" />
          <span className="rounded bg-violet-500/20 px-1 text-[10px] uppercase">{getInitials(memory.brain)}</span>
          {memory.brain}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200">
          <Bot className="h-3 w-3" />
          <span className="rounded bg-cyan-500/20 px-1 text-[10px] uppercase">{getInitials(memory.agent)}</span>
          {memory.agent}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1">
        <button
          className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-1.5 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
          onClick={() => onView(memory)}
          type="button"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
        <button
          className={`rounded-md border p-1.5 transition ${
            memory.pinned
              ? "border-amber-500/55 bg-amber-500/20 text-amber-200"
              : "border-cyan-900/35 bg-sky-950/60 text-cyan-300 hover:border-cyan-500/50 hover:text-cyan-100"
          }`}
          onClick={() => onPin(memory)}
          type="button"
        >
          <Pin className="h-3.5 w-3.5" />
        </button>
        <button
          className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-1.5 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
          onClick={() => onShare(memory)}
          type="button"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}
