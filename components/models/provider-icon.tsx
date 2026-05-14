import { Atom, Bird, BrainCircuit, Cloud, Infinity, Sparkles, Waypoints } from "lucide-react";
import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

type ProviderIconProps = {
  provider: string;
  className?: string;
};

const providerMap: Record<string, { icon: ComponentType<{ className?: string }>; color: string }> = {
  OpenAI: { icon: Sparkles, color: "text-emerald-300" },
  Anthropic: { icon: Infinity, color: "text-amber-300" },
  Meta: { icon: Atom, color: "text-sky-300" },
  Google: { icon: Waypoints, color: "text-cyan-300" },
  "Mistral AI": { icon: Bird, color: "text-orange-300" },
  Ollama: { icon: BrainCircuit, color: "text-violet-300" },
  Microsoft: { icon: Cloud, color: "text-blue-300" }
};

export function ProviderIcon({ provider, className }: ProviderIconProps) {
  const entry = providerMap[provider] ?? { icon: Cloud, color: "text-slate-300" };
  const Icon = entry.icon;
  return <Icon className={cn("h-5 w-5", entry.color, className)} />;
}
