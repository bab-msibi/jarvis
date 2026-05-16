"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

import { cn } from "@/lib/utils";

export type DocumentMenuAction = "edit_metadata" | "link_agent" | "link_brain" | "ai_analyze" | "move" | "archive" | "delete";

type DocumentActionMenuProps = {
  onAction: (action: DocumentMenuAction) => void;
};

const menuItems: Array<{ key: DocumentMenuAction; label: string; danger?: boolean }> = [
  { key: "edit_metadata", label: "Edit Metadata" },
  { key: "link_agent", label: "Link to Agent" },
  { key: "link_brain", label: "Link to Brain" },
  { key: "ai_analyze", label: "AI Analyze" },
  { key: "move", label: "Move" },
  { key: "archive", label: "Archive" },
  { key: "delete", label: "Delete", danger: true }
];

export function DocumentActionMenu({ onAction }: DocumentActionMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      if (!ref.current) return;
      if (event.target instanceof Node && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Open document actions"
        className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-2 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open ? (
        <div className="panel-base absolute right-0 top-10 z-20 min-w-[180px] rounded-lg border border-cyan-700/35 p-1.5">
          {menuItems.map((item) => (
            <button
              className={cn(
                "flex w-full rounded-md px-3 py-2 text-left text-sm text-cyan-100 transition hover:bg-cyan-500/15",
                item.danger && "text-rose-200 hover:bg-rose-500/15"
              )}
              key={item.key}
              onClick={() => {
                onAction(item.key);
                setOpen(false);
              }}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
