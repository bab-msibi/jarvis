import { MemoryClass, MemoryDecayStatus, MemoryImportance, MemoryType } from "@/types/memory";

export type MemoryFormValues = {
  content: string;
  type: MemoryType;
  brain: string;
  agent: string;
  importance: MemoryImportance;
  decayStatus: MemoryDecayStatus;
  memoryClass: MemoryClass;
  tags: string;
};

type MemoryFormFieldsProps = {
  defaultValues: MemoryFormValues;
  typeOptions: MemoryType[];
  brainOptions: string[];
  agentOptions: string[];
};

const classOptions: MemoryClass[] = ["Short Term", "Long Term", "Episodic", "Procedural", "Others"];
const importanceOptions: MemoryImportance[] = ["High", "Medium", "Low", "Very Low"];
const decayOptions: MemoryDecayStatus[] = ["Strong", "Medium", "Weak", "Expiring"];

export function MemoryFormFields({ defaultValues, typeOptions, brainOptions, agentOptions }: MemoryFormFieldsProps) {
  return (
    <>
      <label className="block space-y-1 text-sm text-cyan-300">
        <span>Memory Content</span>
        <textarea
          className="min-h-[92px] w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60"
          defaultValue={defaultValues.content}
          name="content"
          required
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Type</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue={defaultValues.type} name="type">
            {typeOptions.map((type) => (
              <option className="bg-[#071523]" key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Class</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue={defaultValues.memoryClass} name="memoryClass">
            {classOptions.map((value) => (
              <option className="bg-[#071523]" key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Brain</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue={defaultValues.brain} name="brain">
            {brainOptions.map((value) => (
              <option className="bg-[#071523]" key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Agent</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue={defaultValues.agent} name="agent">
            {agentOptions.map((value) => (
              <option className="bg-[#071523]" key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Importance</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue={defaultValues.importance} name="importance">
            {importanceOptions.map((value) => (
              <option className="bg-[#071523]" key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Decay Status</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue={defaultValues.decayStatus} name="decayStatus">
            {decayOptions.map((value) => (
              <option className="bg-[#071523]" key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block space-y-1 text-sm text-cyan-300">
        <span>Tags (comma separated)</span>
        <input
          className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60"
          defaultValue={defaultValues.tags}
          name="tags"
        />
      </label>
    </>
  );
}
