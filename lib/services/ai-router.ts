import { agents } from "@/lib/data/agents";
import { models } from "@/lib/data/models";
import { callAnthropicChat, callGeminiChat, callOllamaChat, callOpenAiChat } from "@/lib/server/provider-clients";

export type AiProvider = "openai" | "anthropic" | "gemini" | "ollama" | "local-agent";

export type AiRouteRequest = {
  agentId: string;
  modelId: string;
  prompt: string;
  sessionId?: string;
};

export type AiRouteResponse = {
  content: string;
  provider: AiProvider;
  modelName: string;
  agentName: string;
  mocked: boolean;
  error?: string;
};

const providerByModelProvider: Record<string, AiProvider> = {
  OpenAI: "openai",
  Anthropic: "anthropic",
  Google: "gemini",
  Ollama: "ollama",
  Meta: "local-agent",
  "Mistral AI": "local-agent"
};

function buildSystemPrompt(agentName: string, agentRole: string) {
  return `You are ${agentName}, the ${agentRole} in the JARVIS Command Center. Be concise, practical, and action-oriented. If an integration is unavailable, explain the safe fallback.`;
}

function buildMockResponse(agentName: string, modelName: string, prompt: string) {
  const normalizedPrompt = prompt.toLowerCase();

  if (normalizedPrompt.includes("roadmap")) {
    return `${agentName} using ${modelName}:\n\nRoadmap focus recommendation:\n\n- Prioritize orchestration reliability\n- Lock workflow approval gates\n- Increase memory optimization coverage\n- Expand Obsidian sync test suite`;
  }

  if (normalizedPrompt.includes("status")) {
    return `${agentName} using ${modelName}:\n\nCurrent status snapshot:\n\n1. Agent network stable\n2. Model routing healthy\n3. Workflow queues within thresholds\n4. Pending approvals: 2`;
  }

  if (normalizedPrompt.includes("code") || normalizedPrompt.includes("implement")) {
    return `${agentName} using ${modelName}:\n\nImplementation guidance:\n\n- Define acceptance criteria first\n- Split work by agent ownership\n- Add validation checks before handover\n- Keep logs and metrics attached to the task`;
  }

  return `${agentName} received your request through ${modelName}. Provider integration is prepared; this response is the safe mocked fallback until a reachable provider and key are configured.`;
}

export async function routeAiMessage(request: AiRouteRequest): Promise<AiRouteResponse> {
  const agent = agents.find((item) => item.id === request.agentId);
  const model = models.find((item) => item.id === request.modelId);
  const agentName = agent?.name ?? "JARVIS";
  const agentRole = agent?.role ?? "AI Agent";
  const modelName = model?.name ?? "Unknown model";
  const provider = providerByModelProvider[model?.provider ?? ""] ?? "local-agent";
  const systemPrompt = buildSystemPrompt(agentName, agentRole);

  try {
    const result = provider === "openai"
      ? await callOpenAiChat({ prompt: request.prompt, modelName, systemPrompt })
      : provider === "anthropic"
        ? await callAnthropicChat({ prompt: request.prompt, modelName, systemPrompt })
        : provider === "gemini"
          ? await callGeminiChat({ prompt: request.prompt, modelName, systemPrompt })
          : provider === "ollama"
            ? await callOllamaChat({ prompt: request.prompt, modelName: process.env.OLLAMA_MODEL ?? "llama3.1", systemPrompt })
            : null;

    if (result?.content) {
      return {
        agentName,
        content: result.content,
        mocked: false,
        modelName,
        provider
      };
    }
  } catch (error) {
    return {
      agentName,
      content: buildMockResponse(agentName, modelName, request.prompt),
      error: error instanceof Error ? error.message : String(error),
      mocked: true,
      modelName,
      provider
    };
  }

  return {
    agentName,
    content: buildMockResponse(agentName, modelName, request.prompt),
    mocked: true,
    modelName,
    provider
  };
}
