import { BrainCircuit, Clock3, GitBranch, LucideIcon, MessageSquareMore, Server, Sparkles, Users, Waypoints } from "lucide-react";
import { Handle, NodeProps, Position } from "reactflow";

import { WorkflowNodeData } from "@/types/workflow";
import { cn } from "@/lib/utils";

type WorkflowNodeShellProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  status: WorkflowNodeData["status"];
  selected?: boolean;
  accentClassName?: string;
};

const statusClass: Record<WorkflowNodeData["status"], string> = {
  IDLE: "bg-slate-400",
  RUNNING: "bg-cyan-400",
  SUCCESS: "bg-emerald-400",
  FAILED: "bg-rose-400"
};

export function WorkflowNodeShell({
  icon: Icon,
  title,
  subtitle,
  status,
  selected,
  accentClassName = "text-cyan-300 border-cyan-800/60 bg-cyan-500/10"
}: WorkflowNodeShellProps) {
  return (
    <div className={cn("relative min-w-[210px] rounded-xl border border-cyan-900/40 bg-[#071223]/95 p-3 shadow-glow", selected && "border-cyan-400/60")}>
      <Handle className="!h-2.5 !w-2.5 !border-cyan-200/70 !bg-cyan-500/80" position={Position.Left} type="target" />
      <Handle className="!h-2.5 !w-2.5 !border-cyan-200/70 !bg-cyan-500/80" position={Position.Right} type="source" />
      <div className="flex items-start gap-2">
        <div className={cn("rounded-md border p-1.5", accentClassName)}>
          <Icon className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-cyan-100">{title}</p>
          <p className="truncate text-xs text-cyan-600">{subtitle}</p>
        </div>
        <span className={cn("mt-1 h-2 w-2 rounded-full", statusClass[status])} />
      </div>
    </div>
  );
}

function iconForStepType(stepType: WorkflowNodeData["stepType"]): LucideIcon {
  if (stepType === "Trigger") return Waypoints;
  if (stepType === "Agent Step") return Users;
  if (stepType === "AI Model Step") return BrainCircuit;
  if (stepType === "Decision") return GitBranch;
  if (stepType === "Delay") return Clock3;
  if (stepType === "API Call") return Server;
  if (stepType === "Notification") return MessageSquareMore;
  return Sparkles;
}

export function WorkflowNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  return <WorkflowNodeShell accentClassName="text-cyan-300 border-cyan-800/60 bg-cyan-500/10" icon={iconForStepType(data.stepType)} selected={selected} status={data.status} subtitle={data.subtitle} title={data.label} />;
}
