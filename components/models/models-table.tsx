"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { ModelMenuAction } from "@/components/models/model-action-menu";
import { ModelRow } from "@/components/models/model-row";
import { DataTableWrapper } from "@/components/shared/data-table-wrapper";
import { EmptyState } from "@/components/shared/empty-state";
import { Model } from "@/types/model";

type ModelsTableProps = {
  models: Model[];
  totalModels: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onManage: (model: Model) => void;
  onMenuAction: (model: Model, action: ModelMenuAction) => void;
};

const headers = ["Model Name", "Provider", "Type", "Status", "Version", "Context Window", "Quota / Usage", "Used By", "Added On", "Actions"];

export function ModelsTable({
  models,
  totalModels,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onManage,
  onMenuAction
}: ModelsTableProps) {
  const start = totalModels ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(currentPage * pageSize, totalModels);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(Math.max(0, currentPage - 3), currentPage + 2);

  return (
    <section className="panel-base rounded-2xl">
      <DataTableWrapper>
        <table className="table-sticky-head w-full min-w-[1200px]">
          <thead>
            <tr className="border-b border-cyan-900/35 text-left text-xs uppercase tracking-[0.08em] text-cyan-600">
              {headers.map((header) => (
                <th className="px-4 py-4" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <ModelRow key={model.id} model={model} onManage={onManage} onMenuAction={onMenuAction} />
            ))}
          </tbody>
        </table>
      </DataTableWrapper>

      <div className="space-y-3 p-3 md:hidden">
        {models.map((model) => (
          <ModelRow key={model.id} mobile model={model} onManage={onManage} onMenuAction={onMenuAction} />
        ))}
      </div>

      {!models.length ? (
        <div className="px-3 pb-3">
          <EmptyState description="No models match the selected filters right now." title="No models found" />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cyan-900/35 px-4 py-3">
        <p className="text-sm text-cyan-600">
          Showing {start} to {end} of {totalModels} models
        </p>

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
      </div>
    </section>
  );
}
