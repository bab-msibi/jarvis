import { Play } from "lucide-react";

type TerminalInputProps = {
  value: string;
  currentPath: string;
  onChange: (value: string) => void;
  onRun: () => void;
};

export function TerminalInput({ value, currentPath, onChange, onRun }: TerminalInputProps) {
  return (
    <div className="space-y-2 border-t border-cyan-900/35 p-3">
      <p className="truncate-middle break-anywhere text-xs text-cyan-600" title={currentPath}>
        Path: {currentPath}
      </p>
      <div className="flex items-center gap-2">
        <input
          className="h-10 flex-1 rounded-md border border-cyan-900/40 bg-sky-950/35 px-3 font-mono text-sm text-cyan-100 outline-none placeholder:text-cyan-700 focus:border-cyan-500/60"
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter command..."
          value={value}
        />
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-cyan-500/50 bg-cyan-500/15 text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/30"
          onClick={onRun}
          type="button"
        >
          <Play className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
