import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { checkAnthropicHealth, checkGeminiHealth, checkOllamaHealth, checkOpenAiHealth } from "@/lib/server/provider-clients";
import { Model } from "@/types/model";

const execFileAsync = promisify(execFile);

type OllamaModel = {
  name: string;
  id: string;
  size: string;
  modified: string;
};

function parseOllamaList(output: string): OllamaModel[] {
  return output
    .split("\n")
    .slice(1)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(\S+)\s+(\S+)\s+(.+?)\s{2,}(.+)$/);
      return match ? { name: match[1], id: match[2], size: match[3].trim(), modified: match[4].trim() } : null;
    })
    .filter((item): item is OllamaModel => Boolean(item));
}

async function listOllamaModels() {
  try {
    const { stdout } = await execFileAsync("ollama", ["list"], { timeout: 5000, maxBuffer: 1024 * 1024 });
    return parseOllamaList(stdout);
  } catch {
    return [];
  }
}

function apiModel(params: {
  id: string;
  name: string;
  provider: string;
  configured: boolean;
  connected: boolean;
  endpoint: string;
  message: string;
  contextWindow: string;
}): Model {
  return {
    id: params.id,
    name: params.name,
    provider: params.provider,
    version: params.configured ? "configured" : "not configured",
    type: "API",
    status: params.connected ? "ACTIVE" : params.configured ? "ERROR" : "IDLE",
    usage: params.connected ? 5 : 0,
    connectedAgents: 0,
    contextWindow: params.contextWindow,
    quota: params.configured ? "Live check" : "Upcoming/config needed",
    addedOn: "Live provider check",
    description: params.message,
    apiEndpoint: params.endpoint,
    localPath: ""
  };
}

export async function getLiveModels(): Promise<Model[]> {
  const [openai, anthropic, gemini, ollama, ollamaModels] = await Promise.all([
    checkOpenAiHealth(),
    checkAnthropicHealth(),
    checkGeminiHealth(),
    checkOllamaHealth(),
    listOllamaModels()
  ]);

  const localModels: Model[] = ollamaModels.map((model) => ({
    id: `ollama-${model.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
    name: model.name,
    provider: "Ollama",
    version: model.id,
    type: "LOCAL",
    status: ollama.connected ? "ACTIVE" : "ERROR",
    usage: 0,
    connectedAgents: 0,
    contextWindow: "Detected locally",
    quota: model.size,
    addedOn: model.modified,
    description: `Local Ollama model detected on this Mac (${model.size}).`,
    apiEndpoint: ollama.endpoint ?? "http://127.0.0.1:11434",
    localPath: "Ollama managed model store"
  }));

  return [
    ...localModels,
    apiModel({
      id: "provider-openai",
      name: process.env.OPENAI_MODEL || "OpenAI API",
      provider: "OpenAI",
      configured: openai.configured,
      connected: openai.connected,
      endpoint: openai.endpoint ?? "https://api.openai.com/v1",
      message: openai.message,
      contextWindow: "Provider dependent"
    }),
    apiModel({
      id: "provider-anthropic",
      name: process.env.ANTHROPIC_MODEL || "Anthropic API",
      provider: "Anthropic",
      configured: anthropic.configured,
      connected: anthropic.connected,
      endpoint: anthropic.endpoint ?? "https://api.anthropic.com/v1",
      message: anthropic.message,
      contextWindow: "Provider dependent"
    }),
    apiModel({
      id: "provider-gemini",
      name: process.env.GEMINI_MODEL || "Gemini API",
      provider: "Google",
      configured: gemini.configured,
      connected: gemini.connected,
      endpoint: gemini.endpoint ?? "https://generativelanguage.googleapis.com/v1beta",
      message: gemini.message,
      contextWindow: "Provider dependent"
    })
  ];
}
