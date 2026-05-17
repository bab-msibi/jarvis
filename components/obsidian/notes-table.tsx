"use client";

import { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";

import { NoteMenuAction } from "@/components/obsidian/note-action-menu";
import { NoteRow } from "@/components/obsidian/note-row";
import { TagBadge } from "@/components/obsidian/tag-badge";
import { DataTableWrapper } from "@/components/shared/data-table-wrapper";
import { ObsidianNote } from "@/types/obsidian";

export type NotesViewMode = "list" | "grid";

type NotesTableProps = {
  notes: ObsidianNote[];
  totalNotes: number;
  totalDisplayCount?: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  viewMode: NotesViewMode;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onOpen: (note: ObsidianNote) => void;
  onMenuAction: (note: ObsidianNote, action: NoteMenuAction) => void;
};

const pageSizeOptions = [8, 12, 24, 48];

export function NotesTable({
  notes,
  totalNotes,
  totalDisplayCount,
  currentPage,
  totalPages,
  pageSize,
  viewMode,
  onPageChange,
  onPageSizeChange,
  onOpen,
  onMenuAction
}: NotesTableProps) {
  const columns = useMemo<ColumnDef<ObsidianNote>[]>(
    () => [
      {
        header: "Note",
        accessorKey: "title",
        cell: ({ row }) => (
          <button className="max-w-[320px] truncate text-left text-cyan-100 hover:text-cyan-50" onClick={() => onOpen(row.original)} type="button">
            {row.original.title}
          </button>
        )
      },
      {
        header: "Folder",
        accessorKey: "folder",
        cell: ({ getValue }) => <span className="text-cyan-300">{String(getValue())}</span>
      },
      {
        header: "Tags",
        accessorKey: "tags",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1.5">
            {row.original.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )
      },
      {
        header: "Updated",
        accessorKey: "updatedAt",
        cell: ({ getValue }) => <span className="whitespace-nowrap text-cyan-600">{String(getValue())}</span>
      }
    ],
    [onOpen]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: notes,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const start = totalNotes ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(currentPage * pageSize, totalNotes);
  const displayTotal = totalDisplayCount ?? totalNotes;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(Math.max(0, currentPage - 3), currentPage + 2);

  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-xl text-cyan-200">Recent Notes</h3>
      </header>

      {viewMode === "grid" ? (
        <div className="grid gap-3 p-3 sm:grid-cols-2">
          {notes.map((note) => (
            <NoteRow key={note.id} mobile note={note} onMenuAction={onMenuAction} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <>
          <DataTableWrapper>
            <table className="table-sticky-head w-full min-w-[920px]">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr className="border-b border-cyan-900/35 text-left text-xs uppercase tracking-[0.08em] text-cyan-600" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th className="px-4 py-4" key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                    <th className="px-4 py-4 text-right">Actions</th>
                  </tr>
                ))}
              </thead>
              <tbody>
                {notes.map((note) => (
                  <NoteRow key={note.id} note={note} onMenuAction={onMenuAction} onOpen={onOpen} />
                ))}
              </tbody>
            </table>
          </DataTableWrapper>

          <div className="space-y-3 p-3 md:hidden">
            {notes.map((note) => (
              <NoteRow key={note.id} mobile note={note} onMenuAction={onMenuAction} onOpen={onOpen} />
            ))}
          </div>
        </>
      )}

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 border-t border-cyan-900/35 px-4 py-10 text-cyan-600">
          <FileText className="h-6 w-6 text-cyan-700" />
          <p className="text-sm">No notes found for the selected filters.</p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cyan-900/35 px-4 py-3">
        <p className="text-sm text-cyan-600">
          Showing {start} to {end} of {displayTotal.toLocaleString()} notes
        </p>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              className="rounded-md border border-cyan-900/40 p-2 text-cyan-300 transition hover:border-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {pages.map((page) => (
              <button
                className={`rounded-md border px-3 py-1.5 text-sm transition ${
                  page === currentPage
                    ? "border-cyan-400/60 bg-cyan-500/20 text-cyan-100"
                    : "border-cyan-900/40 text-cyan-400 hover:border-cyan-500/50 hover:text-cyan-100"
                }`}
                key={page}
                onClick={() => onPageChange(page)}
                type="button"
              >
                {page}
              </button>
            ))}
            <button
              className="rounded-md border border-cyan-900/40 p-2 text-cyan-300 transition hover:border-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              type="button"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <select
            className="h-9 rounded-md border border-cyan-900/40 bg-sky-950/40 px-2 text-sm text-cyan-200 outline-none focus:border-cyan-500/60"
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            value={pageSize}
          >
            {pageSizeOptions.map((option) => (
              <option className="bg-[#071523]" key={option} value={option}>
                {option} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
