"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { DocumentType } from "@/types/document";

export type UploadDocumentInput = {
  name: string;
  category: string;
  type: DocumentType;
  size: string;
  uploadedBy: string;
  linkedAgent: string;
  linkedBrain: string;
  tags: string;
  shared: boolean;
};

type UploadDocumentModalProps = {
  open: boolean;
  categories: string[];
  agentOptions: string[];
  brainOptions: string[];
  onClose: () => void;
  onUpload: (values: UploadDocumentInput) => void;
};

const typeOptions: DocumentType[] = ["PDF", "DOCX", "XLSX", "PPTX", "CSV", "ZIP", "MD"];

export function UploadDocumentModal({ open, categories, agentOptions, brainOptions, onClose, onUpload }: UploadDocumentModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: UploadDocumentInput = {
      name: String(formData.get("name") ?? "").trim(),
      category: String(formData.get("category") ?? "Documentation"),
      type: String(formData.get("type") ?? "PDF") as DocumentType,
      size: String(formData.get("size") ?? "1.0 MB"),
      uploadedBy: String(formData.get("uploadedBy") ?? "John Boss"),
      linkedAgent: String(formData.get("linkedAgent") ?? "Project Manager"),
      linkedBrain: String(formData.get("linkedBrain") ?? "General Brain"),
      tags: String(formData.get("tags") ?? ""),
      shared: formData.get("shared") === "on"
    };

    if (!values.name) return;
    onUpload(values);
    onClose();
  };

  return (
    <ModalShell
      description="Upload a new document and attach it to your AI orchestration context."
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
            className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30"
            form="upload-document-form"
            type="submit"
          >
            Upload
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Upload Document"
    >
      <form className="space-y-3" id="upload-document-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Document Name</span>
          <input className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60" name="name" placeholder="Roadmap-v2.pdf" required />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1 text-sm text-cyan-300">
            <span>Category</span>
            <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" name="category">
              {categories.map((category) => (
                <option className="bg-[#071523]" key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1 text-sm text-cyan-300">
            <span>Type</span>
            <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" name="type">
              {typeOptions.map((type) => (
                <option className="bg-[#071523]" key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1 text-sm text-cyan-300">
            <span>File Size</span>
            <input className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60" defaultValue="1.0 MB" name="size" />
          </label>

          <label className="block space-y-1 text-sm text-cyan-300">
            <span>Uploaded By</span>
            <input className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60" defaultValue="John Boss" name="uploadedBy" />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1 text-sm text-cyan-300">
            <span>Linked Agent</span>
            <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" name="linkedAgent">
              {agentOptions.map((agent) => (
                <option className="bg-[#071523]" key={agent} value={agent}>
                  {agent}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1 text-sm text-cyan-300">
            <span>Linked Brain</span>
            <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" name="linkedBrain">
              {brainOptions.map((brain) => (
                <option className="bg-[#071523]" key={brain} value={brain}>
                  {brain}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Tags (comma separated)</span>
          <input className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60" name="tags" placeholder="planning, roadmap" />
        </label>

        <label className="inline-flex items-center gap-2 text-sm text-cyan-300">
          <input className="h-4 w-4 rounded border-cyan-700/40 bg-sky-950/40" name="shared" type="checkbox" />
          Share immediately with linked agent
        </label>
      </form>
    </ModalShell>
  );
}
