import { ChatAgent, ChatBootstrapData, ChatMessage, ChatModel, ChatSession } from "@/types/chat";

export const chatAgents: ChatAgent[] = [
  {
    id: "agent-pm",
    name: "Project Manager",
    role: "Strategic Coordinator",
    status: "ONLINE",
    description: "Coordinates priorities, approvals and cross-agent delivery.",
    initials: "PM",
    avatarTone: "violet"
  },
  {
    id: "agent-dev",
    name: "Developer",
    role: "Software Engineer",
    status: "ONLINE",
    description: "Implements product features, fixes and integrations.",
    initials: "DEV",
    avatarTone: "cyan"
  },
  {
    id: "agent-rsc",
    name: "Researcher",
    role: "Data & Research Analyst",
    status: "ONLINE",
    description: "Collects insights, trends and opportunity intelligence.",
    initials: "RSC",
    avatarTone: "emerald"
  },
  {
    id: "agent-wrtr",
    name: "Content Writer",
    role: "AI Content Specialist",
    status: "IDLE",
    description: "Drafts content strategies, narratives and messaging.",
    initials: "WRTR",
    avatarTone: "amber"
  },
  {
    id: "agent-data",
    name: "Data Analyst",
    role: "Data & Research Analyst",
    status: "ONLINE",
    description: "Builds reports and tracks business performance metrics.",
    initials: "DATA",
    avatarTone: "sky"
  },
  {
    id: "agent-ops",
    name: "DevOps Engineer",
    role: "Infrastructure Specialist",
    status: "BUSY",
    description: "Maintains pipelines, deployments and runtime reliability.",
    initials: "OPS",
    avatarTone: "cyan"
  },
  {
    id: "agent-dsgn",
    name: "Designer",
    role: "UI/UX Designer",
    status: "ONLINE",
    description: "Designs interfaces, systems and interaction flows.",
    initials: "DSGN",
    avatarTone: "sky"
  },
  {
    id: "agent-qa",
    name: "QA Tester",
    role: "Quality Assurance",
    status: "IDLE",
    description: "Validates releases, tests flows and catches regressions.",
    initials: "QA",
    avatarTone: "violet"
  }
];

export const chatModels: ChatModel[] = [
  {
    id: "model-gpt-4o",
    name: "GPT-4o (Latest)",
    provider: "OpenAI",
    status: "ACTIVE",
    description: "Fast multimodal reasoning for PM and orchestration tasks.",
    contextWindow: "128K"
  },
  {
    id: "model-claude-35-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    status: "ACTIVE",
    description: "Long-context drafting and structured analysis.",
    contextWindow: "200K"
  },
  {
    id: "model-gemini-15-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    status: "IDLE",
    description: "Large-context planning and retrieval-heavy chat.",
    contextWindow: "1M"
  },
  {
    id: "model-llama-31-70b",
    name: "Llama 3.1 70B",
    provider: "Meta",
    status: "ACTIVE",
    description: "Open model for local-friendly high reasoning loads.",
    contextWindow: "128K"
  },
  {
    id: "model-mistral-large-2",
    name: "Mistral Large 2",
    provider: "Mistral AI",
    status: "IDLE",
    description: "Cost-optimized fallback for broad assistant workloads.",
    contextWindow: "128K"
  },
  {
    id: "model-local-ollama",
    name: "Local Ollama Model",
    provider: "Ollama",
    status: "ACTIVE",
    description: "Local private inference through the Admin’s MacBook Pro Ollama runtime.",
    contextWindow: "32K"
  }
];

export const chatSessions: ChatSession[] = [
  {
    id: "session-pm-1",
    title: "Q2 Roadmap Sync",
    agentId: "agent-pm",
    modelId: "model-gpt-4o",
    status: "ACTIVE",
    startedAt: "May 24, 2024 09:10 AM",
    updatedAt: "2m ago",
    messageCount: 6,
    tokensUsed: 1842,
    contextWindow: 128000,
    shared: false
  },
  {
    id: "session-dev-1",
    title: "Auth Module Review",
    agentId: "agent-dev",
    modelId: "model-claude-35-sonnet",
    status: "ACTIVE",
    startedAt: "May 24, 2024 08:42 AM",
    updatedAt: "11m ago",
    messageCount: 4,
    tokensUsed: 1240,
    contextWindow: 200000,
    shared: false
  },
  {
    id: "session-rsc-1",
    title: "Market Trend Brief",
    agentId: "agent-rsc",
    modelId: "model-gemini-15-pro",
    status: "ACTIVE",
    startedAt: "May 24, 2024 07:55 AM",
    updatedAt: "19m ago",
    messageCount: 3,
    tokensUsed: 938,
    contextWindow: 1000000,
    shared: true
  },
  {
    id: "session-ops-1",
    title: "Deployment Incident Notes",
    agentId: "agent-ops",
    modelId: "model-llama-31-70b",
    status: "ARCHIVED",
    startedAt: "May 23, 2024 06:20 PM",
    updatedAt: "1d ago",
    messageCount: 5,
    tokensUsed: 2110,
    contextWindow: 128000,
    shared: true
  }
];

export const chatMessages: ChatMessage[] = [
  {
    id: "msg-pm-1",
    sessionId: "session-pm-1",
    sender: "USER",
    type: "text",
    content: "What are the top priorities for the Q2 roadmap?",
    timestamp: "2:08 PM",
    model: "GPT-4o",
    tokens: 18
  },
  {
    id: "msg-pm-2",
    sessionId: "session-pm-1",
    sender: "AGENT",
    type: "markdown",
    content:
      "Top priorities I recommend:\\n\\n- AI Agent Orchestration\\n- Workflow Automation\\n- Memory System Optimization\\n- Obsidian Integration\\n- Analytics Dashboard",
    timestamp: "2:09 PM",
    model: "GPT-4o",
    tokens: 203
  },
  {
    id: "msg-pm-3",
    sessionId: "session-pm-1",
    sender: "USER",
    type: "text",
    content: "Great. Draft a handover plan for engineering and research.",
    timestamp: "2:10 PM",
    model: "GPT-4o",
    tokens: 23
  },
  {
    id: "msg-pm-4",
    sessionId: "session-pm-1",
    sender: "AGENT",
    type: "markdown",
    content:
      "Planned handover:\\n\\n1. Engineering owns automation framework and model routing.\\n2. Research owns benchmark criteria and success metrics.\\n3. PM reviews checkpoints every 48h with approval gates.",
    timestamp: "2:11 PM",
    model: "GPT-4o",
    tokens: 194
  },
  {
    id: "msg-dev-1",
    sessionId: "session-dev-1",
    sender: "USER",
    type: "text",
    content: "Share the auth middleware checklist.",
    timestamp: "12:32 PM",
    model: "Claude 3.5 Sonnet",
    tokens: 14
  },
  {
    id: "msg-dev-2",
    sessionId: "session-dev-1",
    sender: "AGENT",
    type: "code",
    content:
      "const authChecklist = [\\n  \"Validate JWT signature\",\\n  \"Rotate refresh tokens\",\\n  \"Audit scope permissions\",\\n  \"Log failed login attempts\"\\n];",
    timestamp: "12:33 PM",
    model: "Claude 3.5 Sonnet",
    tokens: 112
  },
  {
    id: "msg-rsc-1",
    sessionId: "session-rsc-1",
    sender: "USER",
    type: "text",
    content: "Any new market signals from last 24h?",
    timestamp: "11:48 AM",
    model: "Gemini 1.5 Pro",
    tokens: 11
  },
  {
    id: "msg-rsc-2",
    sessionId: "session-rsc-1",
    sender: "AGENT",
    type: "markdown",
    content:
      "Yes. Three signals stand out:\\n\\n- Rising enterprise demand for agent governance.\\n- Strong adoption of local inference for compliance.\\n- Increased investment in workflow automation platforms.",
    timestamp: "11:49 AM",
    model: "Gemini 1.5 Pro",
    tokens: 153
  }
];

export const agents = chatAgents;
export const models = chatModels;
export const messages = chatMessages;

export const chatMockData: ChatBootstrapData = {
  agents: chatAgents,
  models: chatModels,
  chatSessions,
  messages: chatMessages
};
