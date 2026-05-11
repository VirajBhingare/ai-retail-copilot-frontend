import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import type { AgentStatus } from "../../../types";
import { useChat } from "../../../hooks/useChat";
import { Bot, Loader2 } from "lucide-react";

export const ChatUI = ({ agentStatus }: { agentStatus: AgentStatus }) => {
  const { messages, loading, messagesEndRef, sendMessage } = useChat();

  return (
    <div className="flex-1 flex flex-col h-full relative w-full max-w-full">
      {/* Chat Messages List */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-5 md:space-y-6 scroll-smooth">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} message={msg} />
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex gap-3 md:gap-4 max-w-4xl mx-auto w-full">
            <div className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-[#E5E0F1] bg-white text-[#8264C2] shadow-sm dark:border-[#3B3446] dark:bg-[#2A2533] dark:text-[#BCA3E0]">
              <Bot size={20} className="md:w-5 md:h-5 w-4 h-4" />
            </div>
            <div className="px-4 py-3 md:px-5 md:py-4 rounded-2xl bg-white dark:bg-[#2A2533] border border-[#E5E0F1] dark:border-[#3B3446] shadow-sm rounded-tl-sm flex items-center gap-2 md:gap-3 text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">
              <Loader2
                size={16}
                className="animate-spin text-[#8264C2] dark:text-[#967BB6]"
              />
              <span>Agent is processing action...</span>
            </div>
          </div>
        )}

        {/* Auto-scroll target */}
        <div ref={messagesEndRef} className="h-2" />
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
