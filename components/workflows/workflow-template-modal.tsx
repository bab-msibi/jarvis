"use client";

import { WorkflowFormValues } from "@/components/workflows/workflow-form-fields";
import { ModalShell } from "@/components/ui/modal-shell";

type WorkflowTemplateModalProps = {
  open: boolean;
  onClose: () => void;
  onApply: (template: WorkflowFormValues) => void;
};

const templates: Array<{ key: string; title: string; description: string; values: WorkflowFormValues }> = [
  {
    key: "content",
    title: "Content Automation",
    description: "Research, generate, review and publish automatically.",
    values: {
      name: "Content Automation Pipeline",
      description: "Automate content generation and publishing.",
      trigger: "Schedule",
      assignedAgent: "Content Writer",
      linkedModel: "GPT-4o",
      linkedBrain: "Creative Brain",
      status: "DRAFT",
      tags: "content, automation, publishing"
    }
  },
  {
    key: "review",
    title: "Code Review Automation",
    description: "Run quality checks and PR review workflow.",
    values: {
      name: "Code Review Automation",
      description: "Automated workflow for review, checks and notifications.",
      trigger: "Webhook",
      assignedAgent: "Developer",
      linkedModel: "Claude 3.5 Sonnet",
      linkedBrain: "Code Brain",
      status: "DRAFT",
      tags: "code, review, ci"
    }
  },
  {
    key: "support",
    title: "Support Triage Workflow",
    description: "Classify and route incoming support tickets.",
    values: {
      name: "Support Triage Workflow",
      description: "Classify tickets and escalate with approvals.",
      trigger: "Webhook",
      assignedAgent: "Support Agent",
      linkedModel: "GPT-4o",
      linkedBrain: "General Brain",
      status: "DRAFT",
      tags: "support, tickets, triage"
    }
  }
];

export function WorkflowTemplateModal({ open, onClose, onApply }: WorkflowTemplateModalProps) {
  return (
    <ModalShell description="Apply a preset workflow template." onClose={onClose} open={open} title="Workflow Templates">
      <div className="space-y-2.5">
        {templates.map((template) => (
          <button
            className="w-full rounded-xl border border-cyan-900/35 bg-sky-950/35 px-3 py-3 text-left transition hover:border-cyan-500/45 hover:bg-cyan-500/10"
            key={template.key}
            onClick={() => {
              onApply(template.values);
              onClose();
            }}
            type="button"
          >
            <p className="text-sm text-cyan-100">{template.title}</p>
            <p className="mt-0.5 text-xs text-cyan-600">{template.description}</p>
          </button>
        ))}
      </div>
    </ModalShell>
  );
}
