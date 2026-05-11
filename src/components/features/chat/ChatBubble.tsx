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
      className={`flex gap-3 md:gap-4 max-w-4xl mx-auto w-full ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar - scaled down slightly on mobile */}
      <div
        className={`flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full shadow-sm ${
          isUser
            ? "bg-[#8264C2] dark:bg-[#967BB6] text-white"
            : "bg-white dark:bg-[#2A2533] border border-[#E5E0F1] dark:border-[#3B3446] text-[#8264C2] dark:text-[#BCA3E0]"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 md:w-5 md:h-5" />
        ) : (
          <Bot className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
        )}
      </div>

      {/* Message Content - wider on mobile (90%) vs desktop (85%) */}
      <div
        className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[90%] md:max-w-[85%] min-w-0`}
      >
        <div
          className={`p-3.5 md:p-4 rounded-2xl shadow-sm overflow-hidden w-full ${
            isUser
              ? "bg-[#8264C2] dark:bg-[#967BB6] text-white rounded-tr-sm"
              : "bg-white dark:bg-[#2A2533] border border-[#E5E0F1] dark:border-[#3B3446] text-gray-800 dark:text-[#E2DFE7] rounded-tl-sm"
          }`}
        >
          <div className="markdown-body leading-relaxed text-[15px] w-full wrap-break-word overflow-x-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                // Prevent tables inside Markdown from breaking the layout on mobile
                table: ({ node, ...props }) => (
                  <div className="my-3 md:my-4 w-full overflow-x-auto rounded-xl border border-[#E5E0F1] dark:border-[#3B3446] shadow-sm block">
                    <table
                      className="w-full text-left border-collapse min-w-[400px]"
                      {...props}
                    />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead
                    className="bg-[#F8F7FA] dark:bg-[#15131A] text-gray-600 dark:text-gray-300"
                    {...props}
                  />
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="px-3 md:px-4 py-2 md:py-3 text-xs font-semibold uppercase tracking-wider border-b border-[#E5E0F1] dark:border-[#3B3446]"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td
                    className="px-3 md:px-4 py-2 md:py-3 text-sm border-b border-[#E5E0F1] dark:border-[#3B3446] last:border-0"
                    {...props}
                  />
                ),
                tr: ({ node, ...props }) => (
                  <tr
                    className="hover:bg-[#F8F7FA]/50 dark:hover:bg-[#3B3446]/30 transition-colors"
                    {...props}
                  />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Database Usage Indicator */}
        {message.tool_used && (
          <div className="flex items-center gap-1.5 mt-2 text-[11px] md:text-xs font-semibold text-[#8264C2] dark:text-[#BCA3E0] bg-[#EADAFF]/50 dark:bg-[#2A2533] px-2.5 py-1.5 rounded-lg border border-[#D5C6EB] dark:border-[#3B3446]">
            <DatabaseZap size={12} className="md:w-3.5 md:h-3.5" />
            <span>Queried Postgres Database</span>
          </div>
        )}
      </div>
    </div>
  );
};
