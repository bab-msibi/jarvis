import { Clock3 } from "lucide-react";
import { NodeProps } from "reactflow";

import { WorkflowNodeShell } from "@/components/workflows/workflow-node";
import { WorkflowNodeData } from "@/types/workflow";

export function DelayNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  return (
    <WorkflowNodeShell
      accentClassName="text-slate-300 border-slate-700/60 bg-slate-500/10"
      icon={Clock3}
      selected={selected}
      status={data.status}
      subtitle={data.subtitle}
      title={data.label}
    />
  );
}
