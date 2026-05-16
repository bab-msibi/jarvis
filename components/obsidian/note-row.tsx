"use client";

import { CalendarClock, FileText } from "lucide-react";

import { NoteActionMenu, NoteMenuAction } from "@/components/obsidian/note-action-menu";
import { TagBadge } from "@/components/obsidian/tag-badge";
import { ObsidianNote } from "@/types/obsidian";

type NoteRowProps = {
  note: ObsidianNote;
  mobile?: boolean;
  onOpen: (note: ObsidianNote) => void;
  onMenuAction: (note: ObsidianNote, action: NoteMenuAction) => void;
};

export function NoteRow({ note, mobile, onOpen, onMenuAction }: NoteRowProps) {
  if (mobile) {
    return (
      <article
        className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3 transition hover:border-cyan-500/45"
        onClick={() => onOpen(note)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-cyan-300" />
              <p className="truncate text-base text-cyan-100">{note.title}</p>
            </div>
            <p className="mt-1 text-xs text-cyan-600">{note.folder}</p>
          </div>
          <NoteActionMenu onAction={(action) => onMenuAction(note, action)} />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {note.tags.slice(0, 4).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-cyan-600">
          <p className="inline-flex items-center gap-1">
            <CalendarClock className="h-3.5 w-3.5" />
            {note.updatedAt}
          </p>
          <p>{note.backlinks} backlinks</p>
        </div>
      </article>
    );
  }

  return (
    <tr className="border-b border-cyan-900/25 text-sm transition hover:bg-cyan-500/5">
      <td className="px-4 py-3">
        <button className="max-w-[300px] truncate text-left text-cyan-100 hover:text-cyan-50" onClick={() => onOpen(note)} type="button">
          {note.title}
        </button>
      </td>
      <td className="px-3 py-3 text-cyan-300">{note.folder}</td>
      <td className="px-3 py-3">
        <div className="flex flex-wrap gap-1.5">
          {note.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3 text-cyan-600">{note.updatedAt}</td>
      <td className="px-3 py-3">
        <div className="flex justify-end">
          <NoteActionMenu onAction={(action) => onMenuAction(note, action)} />
        </div>
      </td>
    </tr>
  );
}
