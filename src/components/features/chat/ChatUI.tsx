import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import type { AgentStatus } from "../../../types";
import { useChat } from "../../../hooks/useChat";
import { Bot, Loader2 } from "lucide-react";

export const ChatUI = ({ agentStatus }: { agentStatus: AgentStatus }) => {
  const { messages, loading, messagesEndRef, sendMessage } = useChat();

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Chat Messages List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} message={msg} />
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex gap-4 max-w-4xl mx-auto">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5E0F1] bg-white text-[#8264C2] shadow-sm dark:border-[#3B3446] dark:bg-[#2A2533] dark:text-[#BCA3E0]">
              <Bot size={22} />
            </div>
            <div className="px-5 py-4 rounded-2xl bg-white dark:bg-[#2A2533] border border-[#E5E0F1] dark:border-[#3B3446] shadow-sm rounded-tl-sm flex items-center gap-3 text-gray-500 dark:text-gray-400 font-medium">
              <Loader2
                size={18}
                className="animate-spin text-[#8264C2] dark:text-[#967BB6]"
              />
              <span>Agent is processing action...</span>
            </div>
          </div>
        )}

        {/* Auto-scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Area */}
      <ChatInput
        onSendMessage={sendMessage}
        disabled={loading}
        agentOffline={agentStatus === "offline"}
      />
    </div>
  );
};
