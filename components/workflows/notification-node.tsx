import { MessageSquareMore } from "lucide-react";
import { NodeProps } from "reactflow";

import { WorkflowNodeShell } from "@/components/workflows/workflow-node";
import { WorkflowNodeData } from "@/types/workflow";

export function NotificationNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  return (
    <WorkflowNodeShell
      accentClassName="text-sky-300 border-sky-700/60 bg-sky-500/10"
      icon={MessageSquareMore}
      selected={selected}
      status={data.status}
      subtitle={data.subtitle}
      title={data.label}
    />
  );
}
