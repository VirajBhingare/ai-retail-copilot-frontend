import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  agentOffline: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled,
  agentOffline,
}) => {
  // Local state for the input prevents the entire App from re-rendering on every keystroke
  const [input, setInput] = useState("");

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    if (!input.trim() || disabled || agentOffline) return;

    onSendMessage(input);
    setInput(""); // Clear input after sending
  };

  return (
    <div className="shrink-0 bg-linear-to-t from-[#F8F7FA] via-[#F8F7FA] dark:from-[#1E1B24] dark:via-[#1E1B24] to-transparent pt-6 pb-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto relative flex items-center group"
      >
        <input
          type="text"
          data-chat-prompt
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="E.g., Which electronics are low in stock?"
          className="relative z-1 w-full min-h-13 cursor-text pl-6 pr-14 py-4 rounded-full border border-[#D5C6EB] dark:border-[#3B3446] shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#8264C2] dark:focus:ring-[#967BB6] focus:border-transparent text-gray-800 dark:text-[#E2DFE7] bg-[#E6E1F5] dark:bg-[#2A2533] text-[15px] transition-colors duration-300"
          disabled={disabled || agentOffline}
        />
        <button
          type="submit"
          disabled={disabled || !input.trim() || agentOffline}
          className="absolute right-2 z-2 p-2 w-11 h-11 flex items-center justify-center bg-[#8264C2] dark:bg-[#967BB6] text-white rounded-full hover:bg-[#6b4fac] dark:hover:bg-[#b098c9] transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed shadow-sm cursor-pointer"
        >
          <SendHorizontal size={20} className="ml-0.5" />
        </button>
      </form>
      <div className="text-center mt-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
        The agent has real-time access to database pricing.{" "}
        {agentOffline && (
          <span className="text-red-400 block mt-1">
            Cannot send messages while backend is offline.
          </span>
        )}
      </div>
    </div>
  );
};
