import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath } from "reactflow";

export function WorkflowEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd }: EdgeProps) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 18,
    offset: 12
  });

  return (
    <>
      <BaseEdge id={id} markerEnd={markerEnd} path={path} style={{ stroke: "#2ea7e6", strokeOpacity: 0.6, strokeWidth: 1.5 }} />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan absolute rounded-md border border-cyan-900/45 bg-[#071223]/95 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.08em] text-cyan-500"
          style={{ transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)` }}
        >
          step
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
