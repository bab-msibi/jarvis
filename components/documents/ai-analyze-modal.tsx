"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { DocumentItem } from "@/types/document";

type AIAnalyzeModalProps = {
  open: boolean;
  document?: DocumentItem;
  onClose: () => void;
  onAnalyze: (documentId: string, mode: "quick" | "deep") => void;
};

export function AIAnalyzeModal({ open, document, onClose, onAnalyze }: AIAnalyzeModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!document) return;
    const formData = new FormData(event.currentTarget);
    const mode = String(formData.get("mode") ?? "quick") as "quick" | "deep";
    onAnalyze(document.id, mode);
    onClose();
  };

  return (
    <ModalShell
      description={document ? `Run AI analysis for ${document.name}.` : "Select a document to analyze."}
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!document}
            form="ai-analyze-form"
            type="submit"
          >
            Run Analysis
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="AI Analyze"
    >
      <form className="space-y-3" id="ai-analyze-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Analysis Mode</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue="quick" name="mode">
            <option className="bg-[#071523]" value="quick">
              Quick insights
            </option>
            <option className="bg-[#071523]" value="deep">
              Deep semantic analysis
            </option>
          </select>
        </label>

        <p className="text-xs text-cyan-600">This will prepare embeddings and extract structured metadata for downstream RAG pipelines.</p>
      </form>
    </ModalShell>
  );
}
