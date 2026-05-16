import { LucideIcon } from "lucide-react";
import { Archive, FileCode2, FileSpreadsheet, FileText, Presentation } from "lucide-react";

import { DocumentType } from "@/types/document";

const typeIconMap: Record<DocumentType, LucideIcon> = {
  PDF: FileText,
  DOCX: FileText,
  XLSX: FileSpreadsheet,
  PPTX: Presentation,
  CSV: FileSpreadsheet,
  ZIP: Archive,
  MD: FileCode2
};

export function getInitials(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "NA";
  const words = trimmed.split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
}

export function toSizeInMB(sizeValue: string) {
  const value = Number(sizeValue.replace(/[^\d.]/g, ""));
  if (!value) return 0;
  const upper = sizeValue.toUpperCase();
  if (upper.includes("GB")) return value * 1024;
  if (upper.includes("KB")) return value / 1024;
  return value;
}

export function DocumentTypeIcon({ type, className }: { type: DocumentType; className?: string }) {
  const Icon = typeIconMap[type];
  return <Icon className={className} />;
}
