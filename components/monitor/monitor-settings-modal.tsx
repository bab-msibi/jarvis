"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

export type MonitorSettingsValues = {
  autoRefreshEnabled: boolean;
  pollIntervalSeconds: number;
  cpuAlertThreshold: number;
};

type MonitorSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  autoRefreshEnabled: boolean;
  onSave: (values: MonitorSettingsValues) => void;
};

export function MonitorSettingsModal({ open, onClose, autoRefreshEnabled, onSave }: MonitorSettingsModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: MonitorSettingsValues = {
      autoRefreshEnabled: formData.get("autoRefreshEnabled") === "on",
      pollIntervalSeconds: Number(formData.get("pollIntervalSeconds") ?? 15),
      cpuAlertThreshold: Number(formData.get("cpuAlertThreshold") ?? 85)
    };
    onSave(values);
    onClose();
  };

  return (
    <ModalShell
      description="Configure monitor behavior and alert thresholds."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="monitor-settings-form" type="submit">
            Save Settings
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Monitor Settings"
    >
      <form className="space-y-3" id="monitor-settings-form" onSubmit={onSubmit}>
        <label className="flex items-center gap-2 text-sm text-cyan-300">
          <input className="accent-cyan-400" defaultChecked={autoRefreshEnabled} name="autoRefreshEnabled" type="checkbox" />
          Enable auto refresh
        </label>

        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Polling interval (seconds)</span>
          <input
            className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60"
            defaultValue={15}
            min={5}
            name="pollIntervalSeconds"
            type="number"
          />
        </label>

        <label className="block space-y-1 text-sm text-cyan-300">
          <span>CPU alert threshold (%)</span>
          <input
            className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60"
            defaultValue={85}
            max={100}
            min={10}
            name="cpuAlertThreshold"
            type="number"
          />
        </label>
      </form>
    </ModalShell>
  );
}
