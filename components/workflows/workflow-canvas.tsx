"use client";

import {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  EdgeChange,
  EdgeTypes,
  MiniMap,
  NodeChange,
  NodeTypes,
  ReactFlow,
  ReactFlowInstance
} from "reactflow";
import "reactflow/dist/style.css";

import { AgentNode } from "@/components/workflows/agent-node";
import { ApiNode } from "@/components/workflows/api-node";
import { ApprovalNode } from "@/components/workflows/approval-node";
import { DatabaseNode } from "@/components/workflows/database-node";
import { DecisionNode } from "@/components/workflows/decision-node";
import { DelayNode } from "@/components/workflows/delay-node";
import { ModelNode } from "@/components/workflows/model-node";
import { NotificationNode } from "@/components/workflows/notification-node";
import { TriggerNode } from "@/components/workflows/trigger-node";
import { WorkflowEdge } from "@/components/workflows/workflow-edge";
import { WorkflowCanvasEdge, WorkflowCanvasNode } from "@/types/workflow";

type WorkflowCanvasProps = {
  nodes: WorkflowCanvasNode[];
  edges: WorkflowCanvasEdge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  onInit?: (instance: ReactFlowInstance) => void;
};

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  agent: AgentNode,
  model: ModelNode,
  decision: DecisionNode,
  delay: DelayNode,
  api: ApiNode,
  notification: NotificationNode,
  database: DatabaseNode,
  approval: ApprovalNode
};

const edgeTypes: EdgeTypes = {
  workflowEdge: WorkflowEdge
};

export function WorkflowCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onInit }: WorkflowCanvasProps) {
  return (
    <div className="h-[390px] min-h-[330px] w-full overflow-hidden rounded-xl border border-cyan-900/35 bg-[#040f1f]">
      <ReactFlow
        className="workflow-canvas"
        defaultEdgeOptions={{
          type: "workflowEdge",
          animated: true
        }}
        edgeTypes={edgeTypes}
        edges={edges}
        fitView
        minZoom={0.4}
        nodeTypes={nodeTypes}
        nodes={nodes}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        onNodesChange={onNodesChange}
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap
          className="!bg-[#071223] !text-cyan-300"
          maskColor="rgba(1, 10, 20, 0.65)"
          nodeColor="#0ea5e9"
          nodeStrokeColor="#22d3ee"
          pannable
          zoomable
        />
        <Controls className="!bg-[#071223] !border !border-cyan-900/35 !text-cyan-200" showInteractive={false} />
        <Background color="#123a60" gap={22} size={1.1} variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}
