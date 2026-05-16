"use client";

import { Settings2 } from "lucide-react";
import {
  Background,
  BackgroundVariant,
  Controls,
  EdgeTypes,
  MiniMap,
  NodeTypes,
  ReactFlow
} from "reactflow";
import "reactflow/dist/style.css";

import { GraphConnection } from "@/components/obsidian/graph-connection";
import { GraphNode } from "@/components/obsidian/graph-node";
import { KnowledgeGraphEdge, KnowledgeGraphNode } from "@/types/obsidian";

type KnowledgeGraphPreviewProps = {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
  totalNodes: number;
  onOpenFullGraph: () => void;
  onOpenGraphSettings: () => void;
};

const nodeTypes: NodeTypes = { knowledgeNode: GraphNode };
const edgeTypes: EdgeTypes = { graphConnection: GraphConnection };

export function KnowledgeGraphPreview({ nodes, edges, totalNodes, onOpenFullGraph, onOpenGraphSettings }: KnowledgeGraphPreviewProps) {
  return (
    <section className="panel-base rounded-2xl">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-xl text-cyan-200">Knowledge Graph Preview</h3>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex h-9 items-center gap-1 rounded-md border border-cyan-700/50 bg-cyan-500/10 px-3 text-sm text-cyan-100 transition hover:border-cyan-400/70 hover:bg-cyan-500/20"
            onClick={onOpenFullGraph}
            type="button"
          >
            Open Full Graph
          </button>
          <button
            className="inline-flex h-9 items-center gap-1 rounded-md border border-cyan-700/50 bg-cyan-500/10 px-3 text-sm text-cyan-100 transition hover:border-cyan-400/70 hover:bg-cyan-500/20"
            onClick={onOpenGraphSettings}
            type="button"
          >
            <Settings2 className="h-4 w-4" />
            Graph Settings
          </button>
        </div>
      </header>

      <div className="h-[300px] overflow-hidden rounded-b-2xl">
        <ReactFlow
          className="workflow-canvas"
          defaultEdgeOptions={{ type: "graphConnection", animated: true }}
          edgeTypes={edgeTypes}
          edges={edges}
          fitView
          minZoom={0.4}
          nodeTypes={nodeTypes}
          nodes={nodes}
          proOptions={{ hideAttribution: true }}
        >
          <MiniMap className="!bg-[#071223] !text-cyan-300" maskColor="rgba(1, 10, 20, 0.65)" nodeColor="#2563eb" nodeStrokeColor="#22d3ee" pannable zoomable />
          <Controls className="!bg-[#071223] !border !border-cyan-900/35 !text-cyan-200" showInteractive={false} />
          <Background color="#134267" gap={23} size={1.1} variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>

      <footer className="border-t border-cyan-900/35 px-4 py-2 text-sm text-cyan-600">Showing {Math.min(nodes.length, 8)} of {totalNodes.toLocaleString()} nodes</footer>
    </section>
  );
}
