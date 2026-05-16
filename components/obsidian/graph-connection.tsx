import { BaseEdge, EdgeProps, getBezierPath } from "reactflow";

export function GraphConnection({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd }: EdgeProps) {
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  return (
    <BaseEdge
      id={id}
      markerEnd={markerEnd}
      path={path}
      style={{
        stroke: "#2ea7e6",
        strokeWidth: 1.5,
        strokeOpacity: 0.62
      }}
    />
  );
}
