import { GitBranch } from "lucide-react";
import { NodeProps } from "reactflow";

import { WorkflowNodeShell } from "@/components/workflows/workflow-node";
import { WorkflowNodeData } from "@/types/workflow";

export function DecisionNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  return (
    <WorkflowNodeShell
      accentClassName="text-amber-300 border-amber-700/60 bg-amber-500/10"
      icon={GitBranch}
      selected={selected}
      status={data.status}
      subtitle={data.subtitle}
      title={data.label}
    />
  );
}
