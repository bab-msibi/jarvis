type LinkedModelsBreakdownProps = {
  model: string;
  count: number;
  total: number;
};

function barTone(model: string) {
  const tones: Record<string, string> = {
    "GPT-4o": "from-cyan-500 to-sky-300",
    "Claude 3.5 Sonnet": "from-violet-500 to-fuchsia-300",
    "Llama 3.1 70B": "from-emerald-500 to-green-300",
    "Gemini 1.5 Pro": "from-amber-500 to-yellow-300",
    "Mistral Large 2": "from-orange-500 to-amber-300",
    "Phi-3 Medium": "from-blue-500 to-indigo-300",
    "Local Ollama Model": "from-purple-500 to-violet-300"
  };
  return tones[model] ?? "from-slate-500 to-slate-300";
}

export function LinkedModelsBreakdown({ model, count, total }: LinkedModelsBreakdownProps) {
  const percentage = total ? Math.round((count / total) * 100) : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <p className="text-cyan-100">{model}</p>
        <p className="text-cyan-600">{count}</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-sky-950/80">
        <div className={`h-full rounded-full bg-gradient-to-r ${barTone(model)}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
