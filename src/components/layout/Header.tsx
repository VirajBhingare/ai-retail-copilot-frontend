import React from "react";
import { Sun, Moon, Loader2 } from "lucide-react";
import type { AgentStatus } from "../../types";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  agentStatus: AgentStatus;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleTheme,
  agentStatus,
}) => {
  return (
    <header className="bg-white/80 dark:bg-[#1E1B24]/80 backdrop-blur-md border-b border-[#E5E0F1] dark:border-[#2A2533] p-4 flex justify-between items-center shadow-sm z-10 shrink-0 transition-colors duration-300">
      <div>
        <h1 className="text-xl font-bold text-[#4A3D63] dark:text-[#BCA3E0]">
          Autonomous Replenishment Copilot
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Powered by Claude & Postgres
        </p>
      </div>
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2A2533] transition-colors text-gray-500 dark:text-gray-400 cursor-pointer"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Dynamic Status */}
        <div className="flex items-center gap-2 bg-[#F8F7FA] dark:bg-[#2A2533] px-3 py-1.5 rounded-full border border-[#E5E0F1] dark:border-[#3B3446]">
          {agentStatus === "checking" && (
            <Loader2 size={12} className="animate-spin text-gray-400" />
          )}
          {agentStatus === "online" && (
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          )}
          {agentStatus === "offline" && (
            <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
          )}
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {agentStatus === "checking"
              ? "Connecting..."
              : agentStatus === "online"
                ? "Agent Online"
                : "Agent Offline"}
          </span>
        </div>
      </div>
    </header>
  );
};
