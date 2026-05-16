"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

import { cn } from "@/lib/utils";

export type NoteMenuAction = "open" | "daily" | "delete";

type NoteActionMenuProps = {
  onAction: (action: NoteMenuAction) => void;
};

const items: Array<{ key: NoteMenuAction; label: string; danger?: boolean }> = [
  { key: "open", label: "Open Note" },
  { key: "daily", label: "Create Daily Note" },
  { key: "delete", label: "Delete Note", danger: true }
];

export function NoteActionMenu({ onAction }: NoteActionMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!ref.current) return;
      if (event.target instanceof Node && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Open note actions"
        className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-2 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open ? (
        <div className="panel-base absolute right-0 top-10 z-20 min-w-[160px] rounded-lg border border-cyan-700/35 p-1.5">
          {items.map((item) => (
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
