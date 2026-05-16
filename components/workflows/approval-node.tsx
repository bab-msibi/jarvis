import { ShieldCheck } from "lucide-react";
import { NodeProps } from "reactflow";

import { WorkflowNodeShell } from "@/components/workflows/workflow-node";
import { WorkflowNodeData } from "@/types/workflow";

export function ApprovalNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  return (
    <WorkflowNodeShell
      accentClassName="text-orange-300 border-orange-700/60 bg-orange-500/10"
      icon={ShieldCheck}
      selected={selected}
      status={data.status}
      subtitle={data.subtitle}
      title={data.label}
    />
  );
}
