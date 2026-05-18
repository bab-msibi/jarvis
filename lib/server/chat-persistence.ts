import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { chatMockData } from "@/lib/data/chat";
import { ChatBootstrapData, ChatMessage, ChatSession } from "@/types/chat";

const dataDir = path.join(process.cwd(), ".jarvis-data");
const chatPath = path.join(dataDir, "chat.json");

type PersistedChat = Pick<ChatBootstrapData, "chatSessions" | "messages">;

async function readPersistedChat(): Promise<PersistedChat> {
  try {
    const raw = await readFile(chatPath, "utf8");
    const parsed = JSON.parse(raw) as PersistedChat;
    return {
      chatSessions: Array.isArray(parsed.chatSessions) ? parsed.chatSessions : chatMockData.chatSessions,
      messages: Array.isArray(parsed.messages) ? parsed.messages : chatMockData.messages
    };
  } catch {
    return {
      chatSessions: chatMockData.chatSessions,
      messages: chatMockData.messages
    };
  }
}

async function writePersistedChat(data: PersistedChat) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(chatPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function getChatBootstrap(): Promise<ChatBootstrapData> {
  const persisted = await readPersistedChat();
  return {
    agents: chatMockData.agents,
    models: chatMockData.models,
    chatSessions: persisted.chatSessions,
    messages: persisted.messages
  };
}

export async function saveChatMessage(session: ChatSession, userMessage: ChatMessage, agentMessage: ChatMessage) {
  const persisted = await readPersistedChat();
  const existingSession = persisted.chatSessions.find((item) => item.id === session.id);
  const nextSessions = existingSession
    ? persisted.chatSessions.map((item) => (item.id === session.id ? session : item))
    : [session, ...persisted.chatSessions];

  const nextMessages = [...persisted.messages, userMessage, agentMessage];
  await writePersistedChat({ chatSessions: nextSessions, messages: nextMessages });

  return {
    chatSessions: nextSessions,
    messages: nextMessages
  };
}

export async function saveChatSnapshot(chatSessions: ChatSession[], messages: ChatMessage[]) {
  await writePersistedChat({ chatSessions, messages });
}
