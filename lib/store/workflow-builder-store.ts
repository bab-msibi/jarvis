"use client";

import { create } from "zustand";
import { addEdge, applyEdgeChanges, applyNodeChanges, Connection, EdgeChange, NodeChange } from "reactflow";

import { WorkflowCanvasEdge, WorkflowCanvasNode } from "@/types/workflow";

type WorkflowBuilderState = {
  selectedWorkflowId: string;
  nodes: WorkflowCanvasNode[];
  edges: WorkflowCanvasEdge[];
  setWorkflow: (workflowId: string, nodes: WorkflowCanvasNode[], edges: WorkflowCanvasEdge[]) => void;
  setSelectedWorkflowId: (workflowId: string) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  autoLayout: () => void;
  resetGraph: () => void;
};

const defaultWorkflowId = "workflow-content-creation";

export const useWorkflowBuilderStore = create<WorkflowBuilderState>((set) => ({
  selectedWorkflowId: defaultWorkflowId,
  nodes: [],
  edges: [],
  setWorkflow: (workflowId, nodes, edges) =>
    set({
      selectedWorkflowId: workflowId,
      nodes,
      edges
    }),
  setSelectedWorkflowId: (workflowId) => set({ selectedWorkflowId: workflowId }),
  onNodesChange: (changes) => set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) as WorkflowCanvasNode[] })),
  onEdgesChange: (changes) => set((state) => ({ edges: applyEdgeChanges(changes, state.edges) as WorkflowCanvasEdge[] })),
  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge(
        {
          ...connection,
          type: "workflowEdge",
          animated: true
        },
        state.edges
      ) as WorkflowCanvasEdge[]
    })),
  autoLayout: () =>
    set((state) => {
      const columns = 4;
      const xStart = 60;
      const yStart = 70;
      const xGap = 260;
      const yGap = 165;

      return {
        nodes: state.nodes.map((node, index) => ({
          ...node,
          position: {
            x: xStart + (index % columns) * xGap,
            y: yStart + Math.floor(index / columns) * yGap
          }
        }))
      };
    }),
  resetGraph: () => set({ nodes: [], edges: [] })
}));
