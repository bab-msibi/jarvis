"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, Controller, FieldErrors, Path, UseFormRegister, useForm } from "react-hook-form";
import {
  Download,
  FileDown,
  Link2,
  RefreshCcw,
  RotateCcw,
  Save,
  ShieldAlert,
  Upload
} from "lucide-react";

import { ConfigHealthPanel } from "@/components/settings/config-health-panel";
import { ExportConfigModal, ExportConfigValues } from "@/components/settings/export-config-modal";
import { FactoryResetModal } from "@/components/settings/factory-reset-modal";
import { ImportConfigModal } from "@/components/settings/import-config-modal";
import { QuickActionCard } from "@/components/settings/quick-action-card";
import { ResetSettingsModal } from "@/components/settings/reset-settings-modal";
import { RestartServicesModal } from "@/components/settings/restart-services-modal";
import { SaveSettingsModal } from "@/components/settings/save-settings-modal";
import { SettingsCategoryNav } from "@/components/settings/settings-category-nav";
import { SettingsDangerZone } from "@/components/settings/settings-danger-zone";
import { SettingsField } from "@/components/settings/settings-field";
import { SettingsInput } from "@/components/settings/settings-input";
import { SettingsNumberInput } from "@/components/settings/settings-number-input";
import { SettingsSection } from "@/components/settings/settings-section";
import { SettingsSelect } from "@/components/settings/settings-select";
import { SidebarPanel } from "@/components/settings/sidebar-panel";
import { SettingsTextarea } from "@/components/settings/settings-textarea";
import { SettingsToggle } from "@/components/settings/settings-toggle";
import { SystemProfilePanel } from "@/components/settings/system-profile-panel";
import { TestConnectionModal } from "@/components/settings/test-connection-modal";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ActionButtonGroup } from "@/components/shared/action-button-group";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ToastItem, ToastStack } from "@/components/ui/toast-stack";
import { settingsCategories, settingsDefaults, settingsHealthItems, settingsSystemProfile } from "@/lib/mock/settings";
import { settingsSchema, SettingsSchemaValues } from "@/lib/schemas/settings";
import { systemStats } from "@/lib/mock/system";
import { useSettingsStore } from "@/lib/store/settings-store";
import { JarvisSettings, SettingsFieldConfig } from "@/types/settings";

type ModalState = null | "save" | "reset" | "export" | "import" | "test" | "factory_reset" | "restart";

const quickActions = [
  { key: "test", title: "Test Connection", description: "Validate core integrations", icon: Link2 },
  { key: "sync", title: "Sync All", description: "Sync models, brains and vaults", icon: RefreshCcw },
  { key: "restart", title: "Restart Services", description: "Restart core services", icon: RotateCcw },
  { key: "export", title: "Export Settings", description: "Export config snapshot", icon: FileDown },
  { key: "import", title: "Import Settings", description: "Load configuration payload", icon: Upload },
  { key: "factory_reset", title: "Factory Reset", description: "Restore default configuration", icon: ShieldAlert }
] as const;

function getErrorMessage(errors: FieldErrors<SettingsSchemaValues>, path: string) {
  const parts = path.split(".");
  let cursor: unknown = errors;

  for (const part of parts) {
    if (typeof cursor !== "object" || cursor === null || !(part in cursor)) {
      return undefined;
    }
    cursor = (cursor as Record<string, unknown>)[part];
  }

  if (typeof cursor === "object" && cursor !== null && "message" in cursor && typeof (cursor as { message?: unknown }).message === "string") {
    return (cursor as { message: string }).message;
  }

  return undefined;
}

export default function SettingsPage() {
  const selectedCategory = useSettingsStore((state) => state.selectedCategory);
  const setSelectedCategory = useSettingsStore((state) => state.setSelectedCategory);
  const savedSettings = useSettingsStore((state) => state.savedSettings);
  const draftSettings = useSettingsStore((state) => state.draftSettings);
  const hasUnsavedChanges = useSettingsStore((state) => state.hasUnsavedChanges);
  const setDraftSettings = useSettingsStore((state) => state.setDraftSettings);
  const saveSettings = useSettingsStore((state) => state.saveSettings);
  const resetToSaved = useSettingsStore((state) => state.resetToSaved);
  const resetToDefaults = useSettingsStore((state) => state.resetToDefaults);

  const [activeModal, setActiveModal] = useState<ModalState>(null);
  const [pendingSaveValues, setPendingSaveValues] = useState<JarvisSettings | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset
  } = useForm<SettingsSchemaValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: draftSettings
  });

  const pushToast = useCallback((payload: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...payload }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = watch((values) => {
      if (!values.general || !values.system) return;
      setDraftSettings(values as JarvisSettings);
    });

    return () => subscription.unsubscribe();
  }, [setDraftSettings, watch]);

  const categoryNavItems = useMemo(() => settingsCategories.map((category) => ({ key: category.key, label: category.label })), []);

  const activeCategory = useMemo(
    () => settingsCategories.find((category) => category.key === selectedCategory) ?? settingsCategories[0],
    [selectedCategory]
  );

  const openModal = (modal: ModalState) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  const requestSave = handleSubmit((values) => {
    setPendingSaveValues(values as JarvisSettings);
    openModal("save");
  });

  const confirmSave = () => {
    if (!pendingSaveValues) return;
    saveSettings(pendingSaveValues);
    reset(pendingSaveValues);
    setPendingSaveValues(null);
    pushToast({ title: "Settings saved", description: "JARVIS configuration updated successfully.", tone: "success" });
  };

  const handleResetUnsaved = () => {
    reset(savedSettings);
    resetToSaved();
    pushToast({ title: "Changes reset", description: "Unsaved settings were discarded.", tone: "warning" });
  };

  const handleExport = (values: ExportConfigValues) => {
    // TODO(backend): provide signed config export artifact from secure settings API.
    pushToast({
      title: "Export queued",
      description: `Configuration export requested as ${values.format.toUpperCase()}${values.includeSecrets ? " with masked secrets" : ""}.`,
      tone: "info"
    });
  };

  const handleImport = (payload: string) => {
    try {
      const json = JSON.parse(payload);
      const parsed = settingsSchema.safeParse(json);
      if (!parsed.success) {
        pushToast({ title: "Import failed", description: "Payload failed schema validation.", tone: "error" });
        return;
      }
      reset(parsed.data);
      setDraftSettings(parsed.data as JarvisSettings);
      pushToast({ title: "Config imported", description: "Imported values loaded as unsaved draft.", tone: "success" });
    } catch {
      pushToast({ title: "Import failed", description: "Payload failed schema validation.", tone: "error" });
    }
  };

  const handleTestConnection = () => {
    // TODO(backend): wire secure connection tests for gateway/model/vault services.
    pushToast({ title: "Connection test complete", description: "All mocked checks passed.", tone: "success" });
  };

  const handleRestartServices = () => {
    // TODO(backend): connect service restart to approved backend endpoint with audit logs.
    pushToast({ title: "Service restart requested", description: "Core services restart queued (mock).", tone: "warning" });
  };

  const handleFactoryReset = () => {
    reset(settingsDefaults);
    resetToDefaults();
    pushToast({ title: "Factory reset complete", description: "Settings restored to defaults.", tone: "warning" });
  };

  const handleQuickAction = (action: (typeof quickActions)[number]["key"]) => {
    if (action === "test") return openModal("test");
    if (action === "restart") return openModal("restart");
    if (action === "export") return openModal("export");
    if (action === "import") return openModal("import");
    if (action === "factory_reset") return openModal("factory_reset");

    pushToast({ title: "Sync started", description: "Global synchronization started (mock).", tone: "info" });
  };

  const handleSectionAction = (actionKey: string) => {
    if (actionKey === "open_obsidian") {
      return pushToast({ title: "Obsidian launch requested", description: "Open vault action queued (mock).", tone: "info" });
    }
    if (actionKey === "restore_backup") {
      return pushToast({ title: "Restore workflow ready", description: "Backup restore wizard will be connected to backend API.", tone: "warning" });
    }
  };

  return (
    <DashboardLayout system={systemStats}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-4">
          <PageHeader
            actions={
              <ActionButtonGroup>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/55 bg-cyan-500/20 px-4 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/30"
                  onClick={requestSave}
                  type="button"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/35 bg-sky-950/45 px-4 text-sm text-cyan-200 transition hover:border-cyan-500/55 hover:bg-cyan-500/15"
                  onClick={() => openModal("reset")}
                  type="button"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Reset
                </button>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/35 bg-sky-950/45 px-4 text-sm text-cyan-200 transition hover:border-cyan-500/55 hover:bg-cyan-500/15"
                  onClick={() => openModal("export")}
                  type="button"
                >
                  <Download className="h-4 w-4" />
                  Export Config
                </button>
              </ActionButtonGroup>
            }
            meta={
              <div className="mt-1 flex items-center gap-2 text-xs">
                <StatusBadge status={hasUnsavedChanges ? "In Progress" : "Synced"} />
                <span className="text-cyan-600">{hasUnsavedChanges ? "Unsaved changes detected" : "Configuration is synchronized"}</span>
              </div>
            }
            subtitle="Configure your JARVIS system, agents, models, brains, security and integrations."
            title="Settings"
          />

          <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
            <SettingsCategoryNav activeCategory={activeCategory.key} categories={categoryNavItems} onChange={setSelectedCategory} />

            <div className="space-y-4">
              <SettingsSection description={activeCategory.description} title={activeCategory.label}>
                <div className="grid gap-3 lg:grid-cols-2">
                  {activeCategory.fields.map((field) => (
                    <div className={field.type === "textarea" ? "lg:col-span-2" : undefined} key={field.name}>
                      <SettingsField description={field.description} error={getErrorMessage(errors, field.name)} label={field.label}>
                        <SettingsFieldRenderer control={control} field={field} register={register} />
                      </SettingsField>
                    </div>
                  ))}
                </div>

                {activeCategory.actions?.length ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {activeCategory.actions.map((action) => (
                      <button
                        className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                          action.tone === "warning"
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-100 hover:bg-amber-500/20"
                            : "border-cyan-700/45 bg-sky-950/40 text-cyan-200 hover:border-cyan-500/60 hover:bg-cyan-500/10"
                        }`}
                        key={action.key}
                        onClick={() => handleSectionAction(action.key)}
                        type="button"
                      >
                        <p>{action.label}</p>
                        <p className="mt-0.5 text-xs opacity-80">{action.description}</p>
                      </button>
                    ))}
                  </div>
                ) : null}
              </SettingsSection>

              {(activeCategory.key === "security" || activeCategory.key === "backup") && (
                <SettingsDangerZone
                  actionLabel="Factory Reset"
                  description="Reset all settings to default values. This action should only be used for full environment re-initialization."
                  onAction={() => openModal("factory_reset")}
                  title="Danger Zone"
                />
              )}
            </div>
          </div>
        </main>

        <aside className="space-y-4">
          <SidebarPanel title="System Profile">
            <SystemProfilePanel profile={settingsSystemProfile} />
          </SidebarPanel>

          <SidebarPanel title="Configuration Health">
            <ConfigHealthPanel items={settingsHealthItems} />
          </SidebarPanel>

          <SidebarPanel title="Quick Actions">
            <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-1">
              {quickActions.map((action) => (
                <QuickActionCard
                  description={action.description}
                  icon={action.icon}
                  key={action.key}
                  onClick={() => handleQuickAction(action.key)}
                  title={action.title}
                />
              ))}
            </div>
          </SidebarPanel>
        </aside>
      </div>

      <SaveSettingsModal hasUnsavedChanges={hasUnsavedChanges} onClose={closeModal} onConfirm={confirmSave} open={activeModal === "save"} />
      <ResetSettingsModal onClose={closeModal} onReset={handleResetUnsaved} open={activeModal === "reset"} />
      <ExportConfigModal onClose={closeModal} onExport={handleExport} open={activeModal === "export"} />
      <ImportConfigModal onClose={closeModal} onImport={handleImport} open={activeModal === "import"} />
      <TestConnectionModal onClose={closeModal} onRun={handleTestConnection} open={activeModal === "test"} />
      <FactoryResetModal onClose={closeModal} onConfirm={handleFactoryReset} open={activeModal === "factory_reset"} />
      <RestartServicesModal onClose={closeModal} onRestart={handleRestartServices} open={activeModal === "restart"} />

      <ToastStack toasts={toasts} />
    </DashboardLayout>
  );
}

type SettingsFieldRendererProps = {
  field: SettingsFieldConfig;
  register: UseFormRegister<SettingsSchemaValues>;
  control: Control<SettingsSchemaValues>;
};

function SettingsFieldRenderer({ field, register, control }: SettingsFieldRendererProps) {
  const name = field.name as Path<SettingsSchemaValues>;

  if (field.type === "toggle") {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => (
          <SettingsToggle checked={Boolean(controllerField.value)} onCheckedChange={controllerField.onChange} />
        )}
      />
    );
  }

  if (field.type === "select") {
    return <SettingsSelect options={field.options ?? []} {...register(name)} />;
  }

  if (field.type === "number") {
    return <SettingsNumberInput max={field.max} min={field.min} step={field.step} {...register(name, { valueAsNumber: true })} />;
  }

  if (field.type === "textarea") {
    return <SettingsTextarea placeholder={field.placeholder} {...register(name)} />;
  }

  return <SettingsInput placeholder={field.placeholder} {...register(name)} />;
}
