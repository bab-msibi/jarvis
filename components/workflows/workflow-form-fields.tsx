import { WorkflowStatus, WorkflowTrigger } from "@/types/workflow";

export type WorkflowFormValues = {
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  assignedAgent: string;
  linkedModel: string;
  linkedBrain: string;
  status: WorkflowStatus;
  tags: string;
};

type WorkflowFormFieldsProps = {
  defaultValues: WorkflowFormValues;
  agentOptions: string[];
  modelOptions: string[];
  brainOptions: string[];
};

export const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function WorkflowFormFields({ defaultValues, agentOptions, modelOptions, brainOptions }: WorkflowFormFieldsProps) {
  return (
    <>
      <label className="block space-y-1">
        <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Workflow Name</span>
        <input className={fieldClassName} defaultValue={defaultValues.name} name="name" placeholder="Workflow name" />
      </label>

      <label className="block space-y-1">
        <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Description</span>
        <textarea
          className="min-h-[86px] w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 py-2 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60"
          defaultValue={defaultValues.description}
          name="description"
          placeholder="Workflow description"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Trigger</span>
          <select className={fieldClassName} defaultValue={defaultValues.trigger} name="trigger">
            <option className="bg-[#071523]" value="Schedule">
              Schedule
            </option>
            <option className="bg-[#071523]" value="Webhook">
              Webhook
            </option>
            <option className="bg-[#071523]" value="Manual">
              Manual
            </option>
            <option className="bg-[#071523]" value="Event">
              Event
            </option>
            <option className="bg-[#071523]" value="API">
              API
            </option>
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Status</span>
          <select className={fieldClassName} defaultValue={defaultValues.status} name="status">
            <option className="bg-[#071523]" value="ACTIVE">
              ACTIVE
            </option>
            <option className="bg-[#071523]" value="INACTIVE">
              INACTIVE
            </option>
            <option className="bg-[#071523]" value="RUNNING">
              RUNNING
            </option>
            <option className="bg-[#071523]" value="FAILED">
              FAILED
            </option>
            <option className="bg-[#071523]" value="DRAFT">
              DRAFT
            </option>
            <option className="bg-[#071523]" value="COMPLETED">
              COMPLETED
            </option>
          </select>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Assigned Agent</span>
          <select className={fieldClassName} defaultValue={defaultValues.assignedAgent} name="assignedAgent">
            {agentOptions.map((option) => (
              <option className="bg-[#071523]" key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Linked Model</span>
          <select className={fieldClassName} defaultValue={defaultValues.linkedModel} name="linkedModel">
            {modelOptions.map((option) => (
              <option className="bg-[#071523]" key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block space-y-1">
        <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Linked Brain</span>
        <select className={fieldClassName} defaultValue={defaultValues.linkedBrain} name="linkedBrain">
          {brainOptions.map((option) => (
            <option className="bg-[#071523]" key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1">
        <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Tags (comma-separated)</span>
        <input className={fieldClassName} defaultValue={defaultValues.tags} name="tags" placeholder="automation, pipeline, content" />
      </label>
    </>
  );
}
