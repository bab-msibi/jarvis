"use client";

import { Download, Eye, Share2 } from "lucide-react";

import { AIStatusBadge } from "@/components/documents/ai-status-badge";
import { DocumentActionMenu, DocumentMenuAction } from "@/components/documents/document-action-menu";
import { FileTypeBadge } from "@/components/documents/file-type-badge";
import { LinkedAgentBadge } from "@/components/documents/linked-agent-badge";
import { LinkedBrainBadge } from "@/components/documents/linked-brain-badge";
import { DocumentTypeIcon, getInitials } from "@/components/documents/document-utils";
import { DocumentItem } from "@/types/document";

type DocumentRowProps = {
  document: DocumentItem;
  onView: (document: DocumentItem) => void;
  onDownload: (document: DocumentItem) => void;
  onShare: (document: DocumentItem) => void;
  onMenuAction: (document: DocumentItem, action: DocumentMenuAction) => void;
};

export function DocumentRow({ document, onView, onDownload, onShare, onMenuAction }: DocumentRowProps) {
  return (
    <article className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3 transition hover:border-cyan-500/45">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-cyan-900/35 bg-cyan-500/10 p-1.5 text-cyan-300">
              <DocumentTypeIcon className="h-3.5 w-3.5" type={document.type} />
            </span>
            <p className="truncate text-base text-cyan-100">{document.name}</p>
          </div>
          <p className="mt-1 text-xs text-cyan-600">
            {document.category} / {document.size}
          </p>
        </div>

        <div className="flex items-center gap-1">
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
          <DocumentActionMenu onAction={(action) => onMenuAction(document, action)} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 rounded-full border border-cyan-900/35 bg-sky-950/55 px-2 py-0.5 text-cyan-300">
          <span className="h-4 w-4 rounded-full border border-cyan-700/40 text-center text-[9px] leading-[14px]">{getInitials(document.uploadedBy)}</span>
          {document.uploadedBy}
        </span>
        <FileTypeBadge type={document.type} />
        <AIStatusBadge status={document.aiStatus} />
      </div>

      <div className="mt-2 space-y-1.5">
        <LinkedAgentBadge agent={document.linkedAgent} />
        <LinkedBrainBadge brain={document.linkedBrain} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-cyan-600">Updated {document.updatedAt}</p>
        <button
          className="inline-flex items-center gap-1 text-xs text-cyan-400 transition hover:text-cyan-200"
          onClick={() => onShare(document)}
          type="button"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
      </div>
    </article>
  );
}
