"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

export type ExportReportValues = {
  format: "pdf" | "json" | "csv";
  includeLogs: boolean;
};

type ExportReportModalProps = {
  open: boolean;
  onClose: () => void;
  onExport: (values: ExportReportValues) => void;
};

export function ExportReportModal({ open, onClose, onExport }: ExportReportModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: ExportReportValues = {
      format: String(formData.get("format") ?? "pdf") as ExportReportValues["format"],
      includeLogs: formData.get("includeLogs") === "on"
    };
    onExport(values);
    onClose();
  };

  return (
    <ModalShell
      description="Export a mocked monitoring report for sharing and audits."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="export-report-form" type="submit">
            Export
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Export Report"
    >
      <form className="space-y-3" id="export-report-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Format</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue="pdf" name="format">
            <option className="bg-[#071523]" value="pdf">
              PDF
            </option>
            <option className="bg-[#071523]" value="json">
              JSON
            </option>
            <option className="bg-[#071523]" value="csv">
              CSV
            </option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-cyan-300">
          <input className="accent-cyan-400" defaultChecked name="includeLogs" type="checkbox" />
          Include recent system logs
        </label>
      </form>
    </ModalShell>
  );
}
