import { TaskPriority, TaskStatus } from "@/types/task";

export type TaskFormValues = {
  name: string;
  description: string;
  assignedAgent: string;
  linkedModel: string;
  linkedBrain: string;
  priority: TaskPriority;
  status: TaskStatus;
  progress: number;
  eta: string;
  dueDate: string;
  tags: string;
  estimatedHours: number;
};

type TaskFormFieldsProps = {
  defaultValues: TaskFormValues;
  agentOptions: string[];
  modelOptions: string[];
  brainOptions: string[];
};

export const taskFieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function TaskFormFields({ defaultValues, agentOptions, modelOptions, brainOptions }: TaskFormFieldsProps) {
  return (
    <>
      <label className="block space-y-1">
        <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Task Name</span>
        <input className={taskFieldClassName} defaultValue={defaultValues.name} name="name" placeholder="Task name" />
      </label>

      <label className="block space-y-1">
        <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Description</span>
        <textarea
          className="min-h-[86px] w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 py-2 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60"
          defaultValue={defaultValues.description}
          name="description"
          placeholder="Task description"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Assigned Agent</span>
          <select className={taskFieldClassName} defaultValue={defaultValues.assignedAgent} name="assignedAgent">
            {agentOptions.map((agent) => (
              <option className="bg-[#071523]" key={agent} value={agent}>
                {agent}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Linked Model</span>
          <select className={taskFieldClassName} defaultValue={defaultValues.linkedModel} name="linkedModel">
            {modelOptions.map((model) => (
              <option className="bg-[#071523]" key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Linked Brain</span>
          <select className={taskFieldClassName} defaultValue={defaultValues.linkedBrain} name="linkedBrain">
            {brainOptions.map((brain) => (
              <option className="bg-[#071523]" key={brain} value={brain}>
                {brain}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Priority</span>
          <select className={taskFieldClassName} defaultValue={defaultValues.priority} name="priority">
            <option className="bg-[#071523]" value="HIGH">
              HIGH
            </option>
            <option className="bg-[#071523]" value="MEDIUM">
              MEDIUM
            </option>
            <option className="bg-[#071523]" value="LOW">
              LOW
            </option>
            <option className="bg-[#071523]" value="NONE">
              NONE
            </option>
          </select>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Status</span>
          <select className={taskFieldClassName} defaultValue={defaultValues.status} name="status">
            <option className="bg-[#071523]" value="NOT STARTED">
              NOT STARTED
            </option>
            <option className="bg-[#071523]" value="IN PROGRESS">
              IN PROGRESS
            </option>
            <option className="bg-[#071523]" value="ON HOLD">
              ON HOLD
            </option>
            <option className="bg-[#071523]" value="COMPLETED">
              COMPLETED
            </option>
            <option className="bg-[#071523]" value="FAILED">
              FAILED
            </option>
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Progress (%)</span>
          <input className={taskFieldClassName} defaultValue={defaultValues.progress} max={100} min={0} name="progress" type="number" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">ETA</span>
          <input className={taskFieldClassName} defaultValue={defaultValues.eta} name="eta" placeholder="1h 20m" />
        </label>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Due Date</span>
          <input className={taskFieldClassName} defaultValue={defaultValues.dueDate} name="dueDate" type="date" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Tags (comma-separated)</span>
          <input className={taskFieldClassName} defaultValue={defaultValues.tags} name="tags" placeholder="planning, pm, roadmap" />
        </label>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Estimated Hours</span>
          <input className={taskFieldClassName} defaultValue={defaultValues.estimatedHours} min={0} name="estimatedHours" type="number" />
        </label>
      </div>
    </>
  );
}
