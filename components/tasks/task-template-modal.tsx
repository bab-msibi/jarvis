"use client";

import { TaskFormValues } from "@/components/tasks/task-form-fields";
import { ModalShell } from "@/components/ui/modal-shell";

type TaskTemplateModalProps = {
  open: boolean;
  onClose: () => void;
  onApply: (template: TaskFormValues) => void;
};

const templates: Array<{ key: string; title: string; description: string; values: TaskFormValues }> = [
  {
    key: "roadmap",
    title: "Roadmap Planning",
    description: "Template for PM planning and milestone coordination.",
    values: {
      name: "Quarterly Roadmap Alignment",
      description: "Align roadmap priorities, dependencies, and resource plans.",
      assignedAgent: "Project Manager",
      linkedModel: "GPT-4o",
      linkedBrain: "General Brain",
      priority: "HIGH",
      status: "NOT STARTED",
      progress: 0,
      eta: "2h",
      dueDate: "",
      tags: "roadmap, planning, pm",
      estimatedHours: 6
    }
  },
  {
    key: "engineering",
    title: "Engineering Delivery",
    description: "Template for feature implementation and QA handoff.",
    values: {
      name: "Feature Delivery Sprint",
      description: "Implement feature scope and prepare release notes.",
      assignedAgent: "Developer",
      linkedModel: "Claude 3.5 Sonnet",
      linkedBrain: "Code Brain",
      priority: "MEDIUM",
      status: "NOT STARTED",
      progress: 0,
      eta: "3h",
      dueDate: "",
      tags: "engineering, sprint, delivery",
      estimatedHours: 8
    }
  },
  {
    key: "research",
    title: "Research Analysis",
    description: "Template for market, user, or competitive analysis.",
    values: {
      name: "Research Brief",
      description: "Collect, validate, and summarize research findings.",
      assignedAgent: "Researcher",
      linkedModel: "Gemini 1.5 Pro",
      linkedBrain: "Research Brain",
      priority: "MEDIUM",
      status: "NOT STARTED",
      progress: 0,
      eta: "2h",
      dueDate: "",
      tags: "research, analysis, insights",
      estimatedHours: 5
    }
  }
];

export function TaskTemplateModal({ open, onClose, onApply }: TaskTemplateModalProps) {
  return (
    <ModalShell description="Apply a preset workflow task template." onClose={onClose} open={open} title="Task Templates">
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
