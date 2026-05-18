"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

import { cn } from "@/lib/utils";

export type AgentMenuAction = "edit" | "assign" | "reassign" | "pause" | "restart" | "delete";

type AgentActionMenuProps = {
  onAction: (action: AgentMenuAction) => void;
};

const menuItems: Array<{ key: AgentMenuAction; label: string; tone?: "danger"; upcoming?: boolean }> = [
  { key: "edit", label: "Edit Agent", upcoming: true },
  { key: "assign", label: "Assign Task", upcoming: true },
  { key: "reassign", label: "Reassign Model", upcoming: true },
  { key: "pause", label: "Pause Agent", upcoming: true },
  { key: "restart", label: "Restart Agent", upcoming: true },
  { key: "delete", label: "Delete Agent", tone: "danger", upcoming: true }
];

export function AgentActionMenu({ onAction }: AgentActionMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!menuRef.current) return;
      if (event.target instanceof Node && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      window.addEventListener("mousedown", onPointerDown);
    }

    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-label="Open agent actions"
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
                item.tone === "danger" && "text-rose-200 hover:bg-rose-500/15"
              )}
              key={item.key}
              onClick={() => {
                onAction(item.key);
                setOpen(false);
              }}
              type="button"
            >
              <span className="flex w-full items-center justify-between gap-2">
                {item.label}
                {item.upcoming ? <span className="rounded-full border border-amber-400/30 px-1.5 py-0.5 text-[10px] uppercase text-amber-200">Upcoming</span> : null}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
