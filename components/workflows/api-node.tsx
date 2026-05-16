import { Server } from "lucide-react";
import { NodeProps } from "reactflow";

import { WorkflowNodeShell } from "@/components/workflows/workflow-node";
import { WorkflowNodeData } from "@/types/workflow";

export function ApiNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  return (
    <WorkflowNodeShell
      accentClassName="text-teal-300 border-teal-700/60 bg-teal-500/10"
      icon={Server}
      selected={selected}
      status={data.status}
      subtitle={data.subtitle}
      title={data.label}
    />
  );
}
