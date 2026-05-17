"use client";

import { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Download, Eye, Share2 } from "lucide-react";

import { AIStatusBadge } from "@/components/documents/ai-status-badge";
import { DocumentActionMenu, DocumentMenuAction } from "@/components/documents/document-action-menu";
import { DocumentRow } from "@/components/documents/document-row";
import { FileTypeBadge } from "@/components/documents/file-type-badge";
import { LinkedAgentBadge } from "@/components/documents/linked-agent-badge";
import { LinkedBrainBadge } from "@/components/documents/linked-brain-badge";
import { DocumentTypeIcon, getInitials } from "@/components/documents/document-utils";
import { DataTableWrapper } from "@/components/shared/data-table-wrapper";
import { EmptyState } from "@/components/shared/empty-state";
import { DocumentsViewMode } from "@/lib/store/documents-store";
import { DocumentItem } from "@/types/document";

type DocumentsTableProps = {
  documents: DocumentItem[];
  totalDocuments: number;
  totalDisplayCount?: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  viewMode: DocumentsViewMode;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onView: (document: DocumentItem) => void;
  onDownload: (document: DocumentItem) => void;
  onShare: (document: DocumentItem) => void;
  onMenuAction: (document: DocumentItem, action: DocumentMenuAction) => void;
};

const pageSizeOptions = [8, 10, 20, 30];

export function DocumentsTable({
  documents,
  totalDocuments,
  totalDisplayCount,
  currentPage,
  totalPages,
  pageSize,
  viewMode,
  onPageChange,
  onPageSizeChange,
  onView,
  onDownload,
  onShare,
  onMenuAction
}: DocumentsTableProps) {
  const columns = useMemo<ColumnDef<DocumentItem>[]>(
    () => [
      {
        header: "Document Name",
        accessorKey: "name",
        cell: ({ row }) => {
          const document = row.original;
          return (
            <button className="group flex min-w-[230px] items-center gap-2 text-left" onClick={() => onView(document)} type="button">
              <span className="rounded-md border border-cyan-900/35 bg-cyan-500/10 p-1.5 text-cyan-300">
                <DocumentTypeIcon className="h-3.5 w-3.5" type={document.type} />
              </span>
              <span className="truncate text-cyan-100 group-hover:text-cyan-50">{document.name}</span>
            </button>
          );
        }
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: ({ getValue }) => <span className="text-cyan-200">{String(getValue())}</span>
      },
      {
        header: "Type",
        accessorKey: "type",
        cell: ({ row }) => <FileTypeBadge type={row.original.type} />
      },
      {
        header: "Size",
        accessorKey: "size",
        cell: ({ getValue }) => <span className="whitespace-nowrap text-cyan-300">{String(getValue())}</span>
      },
      {
        header: "Uploaded By",
        accessorKey: "uploadedBy",
        cell: ({ row }) => (
          <div className="inline-flex items-center gap-2 text-cyan-200">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan-700/40 bg-sky-950/60 text-[10px] uppercase text-cyan-300">
              {getInitials(row.original.uploadedBy)}
            </span>
            <span className="whitespace-nowrap">{row.original.uploadedBy}</span>
          </div>
        )
      },
      {
        header: "Linked Agent",
        accessorKey: "linkedAgent",
        cell: ({ row }) => <LinkedAgentBadge agent={row.original.linkedAgent} />
      },
      {
        header: "Linked Brain",
        accessorKey: "linkedBrain",
        cell: ({ row }) => <LinkedBrainBadge brain={row.original.linkedBrain} />
      },
      {
        header: "AI Status",
        accessorKey: "aiStatus",
        cell: ({ row }) => <AIStatusBadge status={row.original.aiStatus} />
      },
      {
        header: "Updated",
        accessorKey: "updatedAt",
        cell: ({ getValue }) => <span className="whitespace-nowrap text-cyan-600">{String(getValue())}</span>
      },
      {
        header: "Actions",
        accessorKey: "id",
        cell: ({ row }) => {
          const document = row.original;
          return (
            <div className="flex items-center justify-end gap-1">
              <button
                className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-1.5 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
                onClick={() => onView(document)}
                type="button"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
              <button
                className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-1.5 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
                onClick={() => onDownload(document)}
                type="button"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
              <button
                className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-1.5 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
                onClick={() => onShare(document)}
                type="button"
              >
                <Share2 className="h-3.5 w-3.5" />
              </button>
              <DocumentActionMenu onAction={(action) => onMenuAction(document, action)} />
            </div>
          );
        }
      }
    ],
    [onDownload, onMenuAction, onShare, onView]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: documents,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const start = totalDocuments ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(currentPage * pageSize, totalDocuments);
  const displayTotal = totalDisplayCount ?? totalDocuments;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(Math.max(0, currentPage - 3), currentPage + 2);

  return (
    <section className="panel-base rounded-2xl">
      {viewMode === "grid" ? (
        <div className="grid gap-3 p-3 sm:grid-cols-2">
          {documents.map((document) => (
            <DocumentRow
              document={document}
              key={document.id}
              onDownload={onDownload}
              onMenuAction={onMenuAction}
              onShare={onShare}
              onView={onView}
            />
          ))}
        </div>
      ) : (
        <>
          <DataTableWrapper>
            <table className="table-sticky-head w-full min-w-[1450px]">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr className="border-b border-cyan-900/35 text-left text-xs uppercase tracking-[0.08em] text-cyan-600" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th className="px-4 py-4" key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr className="border-b border-cyan-900/25 text-sm transition hover:bg-cyan-500/5" key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td className="px-4 py-3" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTableWrapper>

          <div className="space-y-3 p-3 md:hidden">
            {documents.map((document) => (
              <DocumentRow
                document={document}
                key={document.id}
                onDownload={onDownload}
                onMenuAction={onMenuAction}
                onShare={onShare}
                onView={onView}
              />
            ))}
          </div>
        </>
      )}

      {!documents.length ? (
        <div className="px-3 pb-3">
          <EmptyState description="Upload or import documents to start indexing and orchestration." title="No documents found" />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cyan-900/35 px-4 py-3">
        <p className="text-sm text-cyan-600">
          Showing {start} to {end} of {displayTotal.toLocaleString()} documents
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
