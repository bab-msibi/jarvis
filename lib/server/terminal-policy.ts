import { TerminalCommandHistoryItem } from "@/types/terminal";

export type TerminalExecutionRequest = {
  sessionId: string;
  sessionName?: string;
  command: string;
  confirmed: boolean;
};

export type TerminalExecutionResponse = {
  historyItem: TerminalCommandHistoryItem;
  output: string;
  allowed: boolean;
  executed: boolean;
  reason?: string;
};

const blockedCommandPattern = /(rm\s+-rf|shutdown|reboot|mkfs|del\s+\/f|format\s+c:|:\(\)\{:\|:&\};:|sudo\s+|curl\s+.*\|\s*sh|wget\s+.*\|\s*sh)/i;
const allowedCommands = new Set([
  "git status",
  "ollama list",
  "run-health-check",
  "sync-obsidian-vault",
  "test-model-connection",
  "start-agent-gateway",
  "restart-ollama",
  "clear-cache",
  "restart-all-agents"
]);

function statusFor(command: string, confirmed: boolean): TerminalCommandHistoryItem["status"] {
  if (!confirmed || blockedCommandPattern.test(command) || !allowedCommands.has(command)) return "BLOCKED";
  return /fail/i.test(command) ? "FAILED" : "SUCCESS";
}

export async function executeTerminalCommand(request: TerminalExecutionRequest): Promise<TerminalExecutionResponse> {
  const command = request.command.trim();
  const status = statusFor(command, request.confirmed);
  const allowed = status !== "BLOCKED";
  const reason = !request.confirmed
    ? "Backend confirmation is required."
    : blockedCommandPattern.test(command)
      ? "Command matches the dangerous-command blocklist."
      : !allowedCommands.has(command)
        ? "Command is not in the backend allowlist."
        : undefined;

  const output = allowed
    ? `Safe backend command accepted: ${command}`
    : `Command blocked by backend policy: ${reason}`;

  return {
    allowed,
    executed: allowed,
    historyItem: {
      id: `cmd-${Date.now().toString(36)}`,
      command,
      sessionId: request.sessionId,
      sessionName: request.sessionName ?? request.sessionId,
      status,
      executedAt: "just now"
    },
    output,
    reason
  };
}
