import { cn } from "@/lib/utils";
import { DocumentType } from "@/types/document";
import { DocumentTypeIcon } from "@/components/documents/document-utils";

type FileTypeBadgeProps = {
  type: DocumentType;
};

const typeStyles: Record<DocumentType, string> = {
  PDF: "border-rose-500/35 bg-rose-500/15 text-rose-200",
  DOCX: "border-cyan-500/35 bg-cyan-500/15 text-cyan-200",
  XLSX: "border-emerald-500/35 bg-emerald-500/15 text-emerald-200",
  PPTX: "border-amber-500/35 bg-amber-500/15 text-amber-200",
  CSV: "border-sky-500/35 bg-sky-500/15 text-sky-200",
  ZIP: "border-violet-500/35 bg-violet-500/15 text-violet-200",
  MD: "border-indigo-500/35 bg-indigo-500/15 text-indigo-200"
};

export function FileTypeBadge({ type }: FileTypeBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] uppercase tracking-[0.08em]", typeStyles[type])}>
      <DocumentTypeIcon className="h-3 w-3" type={type} />
      {type}
    </span>
  );
}
