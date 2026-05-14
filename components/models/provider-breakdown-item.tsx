type ProviderBreakdownItemProps = {
  provider: string;
  count: number;
  total: number;
};

function barClassForProvider(provider: string) {
  const map: Record<string, string> = {
    OpenAI: "from-violet-500 to-violet-300",
    Anthropic: "from-cyan-500 to-blue-300",
    Meta: "from-sky-500 to-cyan-300",
    Google: "from-emerald-500 to-green-300",
    "Mistral AI": "from-amber-500 to-yellow-300",
    Ollama: "from-fuchsia-500 to-violet-300",
    Microsoft: "from-blue-500 to-indigo-300",
    Others: "from-slate-500 to-slate-300"
  };
  return map[provider] ?? map.Others;
}

export function ProviderBreakdownItem({ provider, count, total }: ProviderBreakdownItemProps) {
  const percentage = total ? Math.round((count / total) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <p className="text-cyan-100">{provider}</p>
        <p className="text-cyan-600">
          {count} ({percentage}%)
        </p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-sky-950/80">
        <div className={`h-full rounded-full bg-gradient-to-r ${barClassForProvider(provider)}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
