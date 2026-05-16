import { BrainCircuit, Bot, FileText, Network, Search, Workflow } from "lucide-react";
import { Handle, NodeProps, Position } from "reactflow";

import { KnowledgeGraphNodeData } from "@/types/obsidian";
import { cn } from "@/lib/utils";

const nodeTheme: Record<KnowledgeGraphNodeData["category"], { className: string; icon: typeof BrainCircuit }> = {
  project: { className: "border-cyan-700/60 bg-cyan-500/10 text-cyan-200", icon: FileText },
  ai: { className: "border-violet-700/60 bg-violet-500/10 text-violet-200", icon: Bot },
  workflow: { className: "border-emerald-700/60 bg-emerald-500/10 text-emerald-200", icon: Workflow },
  research: { className: "border-amber-700/60 bg-amber-500/10 text-amber-200", icon: Search },
  system: { className: "border-blue-700/60 bg-blue-500/10 text-blue-200", icon: Network },
  knowledge: { className: "border-fuchsia-700/60 bg-fuchsia-500/10 text-fuchsia-200", icon: BrainCircuit }
};

export function GraphNode({ data, selected }: NodeProps<KnowledgeGraphNodeData>) {
  const theme = nodeTheme[data.category];
  const Icon = theme.icon;

  return (
    <div className={cn("rounded-2xl border p-3 shadow-glow transition", theme.className, selected && "ring-2 ring-cyan-300/35")}>
      <Handle className="!h-2.5 !w-2.5 !border-cyan-200/70 !bg-cyan-500/80" position={Position.Left} type="target" />
      <Handle className="!h-2.5 !w-2.5 !border-cyan-200/70 !bg-cyan-500/80" position={Position.Right} type="source" />
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <div>
          <p className="text-sm">{data.label}</p>
          <p className="text-xs opacity-80">{data.noteCount} notes</p>
        </div>
      </div>
    </div>
  );
}
