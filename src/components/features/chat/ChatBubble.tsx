import React from "react";
import { Bot, User, DatabaseZap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import type { Message } from "../../../types";

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-4 max-w-4xl mx-auto ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm ${
          isUser
            ? "bg-[#8264C2] dark:bg-[#967BB6] text-white"
            : "bg-white dark:bg-[#2A2533] border border-[#E5E0F1] dark:border-[#3B3446] text-[#8264C2] dark:text-[#BCA3E0]"
        }`}
      >
        {isUser ? <User size={20} /> : <Bot size={22} />}
      </div>

      {/* Message Content */}
      <div
        className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[85%]`}
      >
        <div
          className={`p-4 rounded-2xl shadow-sm ${
            isUser
              ? "bg-[#8264C2] dark:bg-[#967BB6] text-white rounded-tr-sm"
              : "bg-white dark:bg-[#2A2533] border border-[#E5E0F1] dark:border-[#3B3446] text-gray-800 dark:text-[#E2DFE7] rounded-tl-sm"
          }`}
        >
          <div className="markdown-body leading-relaxed text-[15px]">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Database Usage Indicator */}
        {message.tool_used && (
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#8264C2] dark:text-[#BCA3E0] bg-[#EADAFF]/50 dark:bg-[#2A2533] px-2.5 py-1.5 rounded-lg border border-[#D5C6EB] dark:border-[#3B3446]">
            <DatabaseZap size={14} />
            <span>Queried Postgres Database</span>
          </div>
        )}
      </div>
    </div>
  );
};
