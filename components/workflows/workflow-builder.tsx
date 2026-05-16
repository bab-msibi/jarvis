"use client";

import { useMemo, useState } from "react";
import { Maximize2, Minus, Play, Plus, Save, Sparkles } from "lucide-react";
import { ReactFlowInstance } from "reactflow";

import { WorkflowCanvas } from "@/components/workflows/workflow-canvas";
import { useWorkflowBuilderStore } from "@/lib/store/workflow-builder-store";
import { Workflow } from "@/types/workflow";

type WorkflowBuilderProps = {
  workflow?: Workflow;
  onSave: () => void;
  onTestRun: () => void;
  onOpenTriggerConfig: () => void;
};

export function WorkflowBuilder({ workflow, onSave, onTestRun, onOpenTriggerConfig }: WorkflowBuilderProps) {
  const nodes = useWorkflowBuilderStore((state) => state.nodes);
  const edges = useWorkflowBuilderStore((state) => state.edges);
  const onNodesChange = useWorkflowBuilderStore((state) => state.onNodesChange);
  const onEdgesChange = useWorkflowBuilderStore((state) => state.onEdgesChange);
  const onConnect = useWorkflowBuilderStore((state) => state.onConnect);
  const autoLayout = useWorkflowBuilderStore((state) => state.autoLayout);
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [zoomValue, setZoomValue] = useState(1);

  const activeTitle = workflow?.name ?? "Select Workflow";
  const activeStatus = workflow?.status ?? "DRAFT";

  const statusTone = useMemo(() => (activeStatus === "ACTIVE" || activeStatus === "RUNNING" ? "text-emerald-300" : "text-cyan-500"), [activeStatus]);

  const refreshZoom = (instance: ReactFlowInstance | null) => {
    if (!instance) return;
    setZoomValue(instance.getZoom());
  };

  const handleZoomIn = () => {
    if (!flowInstance) return;
    flowInstance.zoomIn({ duration: 220 });
    window.setTimeout(() => refreshZoom(flowInstance), 240);
  };

  const handleZoomOut = () => {
    if (!flowInstance) return;
    flowInstance.zoomOut({ duration: 220 });
    window.setTimeout(() => refreshZoom(flowInstance), 240);
  };

  const handleResetView = () => {
    if (!flowInstance) return;
    flowInstance.fitView({ duration: 250, padding: 0.2 });
    window.setTimeout(() => refreshZoom(flowInstance), 260);
  };

  return (
    <section className="panel-base rounded-2xl p-3 sm:p-4">
      <header className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-cyan-500">Workflow Builder</p>
          <div className="mt-1 flex items-center gap-2">
            <h3 className="text-2xl text-cyan-100">{activeTitle}</h3>
            <span className={`inline-flex items-center gap-1 text-sm ${statusTone}`}>
              <span className="h-2 w-2 rounded-full bg-current" />
              {activeStatus}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            className="inline-flex h-9 items-center gap-1 rounded-md border border-cyan-700/50 bg-cyan-500/10 px-3 text-sm text-cyan-100 transition hover:border-cyan-400/70 hover:bg-cyan-500/20"
            onClick={onSave}
            type="button"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
          <button
            className="inline-flex h-9 items-center gap-1 rounded-md border border-cyan-700/50 bg-cyan-500/10 px-3 text-sm text-cyan-100 transition hover:border-cyan-400/70 hover:bg-cyan-500/20"
            onClick={onTestRun}
            type="button"
          >
            <Play className="h-4 w-4" />
            Test Run
          </button>
          <button
            className="inline-flex h-9 items-center gap-1 rounded-md border border-cyan-700/50 bg-cyan-500/10 px-3 text-sm text-cyan-100 transition hover:border-cyan-400/70 hover:bg-cyan-500/20"
            onClick={autoLayout}
            type="button"
          >
            <Sparkles className="h-4 w-4" />
            Auto Layout
          </button>
          <button
            className="inline-flex h-9 items-center gap-1 rounded-md border border-cyan-700/50 bg-cyan-500/10 px-3 text-sm text-cyan-100 transition hover:border-cyan-400/70 hover:bg-cyan-500/20"
            onClick={onOpenTriggerConfig}
            type="button"
          >
            Trigger Config
          </button>

          <div className="inline-flex h-9 items-center gap-2 rounded-md border border-cyan-900/40 bg-sky-950/40 px-2 text-cyan-200">
            <button className="rounded p-1 transition hover:bg-cyan-500/20" onClick={handleZoomOut} type="button">
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-[52px] text-center text-xs">{Math.round(zoomValue * 100)}%</span>
            <button className="rounded p-1 transition hover:bg-cyan-500/20" onClick={handleZoomIn} type="button">
              <Plus className="h-4 w-4" />
            </button>
            <button className="rounded p-1 transition hover:bg-cyan-500/20" onClick={handleResetView} type="button">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <WorkflowCanvas
        edges={edges}
        nodes={nodes}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onInit={(instance) => {
          setFlowInstance(instance);
          refreshZoom(instance);
        }}
        onNodesChange={onNodesChange}
      />
    </section>
  );
}
