import { AIMessageBubble } from "@/components/chat/ai-message-bubble";
import { UserMessageBubble } from "@/components/chat/user-message-bubble";
import { ChatMessage as ChatMessageType } from "@/types/chat";

type ChatMessageProps = {
  message: ChatMessageType;
  agentName: string;
};

export function ChatMessage({ message, agentName }: ChatMessageProps) {
  if (message.sender === "USER") {
    return (
      <div className="flex justify-end">
        <div className="w-full max-w-3xl">
          <UserMessageBubble content={message.content} model={message.model} timestamp={message.timestamp} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="w-full max-w-3xl">
        <AIMessageBubble
          agentName={agentName}
          content={message.content}
          model={message.model}
          system={message.sender === "SYSTEM"}
          timestamp={message.timestamp}
          type={message.type}
        />
      </div>
    </div>
  );
}
