import { NextResponse } from "next/server";

import { routeAiMessage } from "@/lib/services/ai-router";
import { getChatBootstrap, saveChatMessage } from "@/lib/server/chat-persistence";
import { ChatMessage, ChatSession } from "@/types/chat";

export const runtime = "nodejs";

type ChatMessagePayload = {
  agentId?: string;
  modelId?: string;
  prompt?: string;
  sessionId?: string;
  sessionTitle?: string;
};

function estimateTokens(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(8, Math.round(words * 1.4));
}

function parseContextWindow(value: string) {
  const match = value.trim().match(/^(\d+(?:\.\d+)?)([kKmM]?)$/);
  if (!match) return 128000;
  const amount = Number(match[1] ?? 128);
  const unit = match[2]?.toUpperCase();
  if (unit === "M") return Math.round(amount * 1_000_000);
  if (unit === "K") return Math.round(amount * 1_000);
  return Math.round(amount);
}

function timestamp() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export async function POST(request: Request) {
  const payload = await request.json() as ChatMessagePayload;
  const prompt = payload.prompt?.trim();
  if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

  const bootstrap = await getChatBootstrap();
  const agentId = payload.agentId ?? bootstrap.agents[0]?.id;
  const modelId = payload.modelId ?? bootstrap.models[0]?.id;
  if (!agentId || !modelId) return NextResponse.json({ error: "Agent and model are required" }, { status: 400 });

  const agent = bootstrap.agents.find((item) => item.id === agentId) ?? bootstrap.agents[0];
  const model = bootstrap.models.find((item) => item.id === modelId) ?? bootstrap.models[0];
  const existingSession = bootstrap.chatSessions.find((item) => item.id === payload.sessionId);
  const sessionId = existingSession?.id ?? payload.sessionId ?? `session-${Date.now().toString(36)}`;

  const userMessage: ChatMessage = {
    id: `msg-user-${Date.now().toString(36)}`,
    sessionId,
    sender: "USER",
    type: "text",
    content: prompt,
    timestamp: timestamp(),
    model: model?.name ?? "Unknown",
    tokens: estimateTokens(prompt)
  };

  const routed = await routeAiMessage({ agentId, modelId, prompt, sessionId });
  const agentMessage: ChatMessage = {
    id: `msg-agent-${(Date.now() + 1).toString(36)}`,
    sessionId,
    sender: "AGENT",
    type: "markdown",
    content: routed.content,
    timestamp: timestamp(),
    model: routed.modelName,
    tokens: estimateTokens(routed.content)
  };

  const nextSession: ChatSession = {
    id: sessionId,
    title: existingSession?.title ?? payload.sessionTitle?.trim() ?? `Chat with ${agent?.name ?? "JARVIS"}`,
    agentId,
    modelId,
    status: "ACTIVE",
    startedAt: existingSession?.startedAt ?? new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    updatedAt: "just now",
    messageCount: (existingSession?.messageCount ?? 0) + 2,
    tokensUsed: (existingSession?.tokensUsed ?? 0) + userMessage.tokens + agentMessage.tokens,
    contextWindow: existingSession?.contextWindow ?? parseContextWindow(model?.contextWindow ?? "128K"),
    shared: existingSession?.shared ?? false
  };

  await saveChatMessage(nextSession, userMessage, agentMessage);

  return NextResponse.json({
    agentMessage,
    mocked: routed.mocked,
    provider: routed.provider,
    session: nextSession,
    userMessage,
    error: routed.error
  });
}
