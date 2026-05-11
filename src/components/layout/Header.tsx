import React from "react";
import { Sun, Moon, Loader2, Menu } from "lucide-react";
import type { AgentStatus } from "../../types";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  agentStatus: AgentStatus;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleTheme,
  agentStatus,
  onMenuClick,
}) => {
  return (
    <header className="bg-white/80 dark:bg-[#1E1B24]/80 backdrop-blur-md border-b border-[#E5E0F1] dark:border-[#2A2533] p-3 md:p-4 flex justify-between items-center shadow-sm z-10 shrink-0 transition-colors duration-300">
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Hamburger Menu (Mobile Only) */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2A2533] rounded-lg transition-colors cursor-pointer shrink-0"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>

        <div className="min-w-0">
          <h1 className="text-lg md:text-xl font-bold text-[#4A3D63] dark:text-[#BCA3E0] truncate">
            Retail Assistant
          </h1>
          <p className="hidden md:block text-sm text-gray-500 dark:text-gray-400 truncate">
            Powered by Claude & Postgres
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2A2533] transition-colors text-gray-500 dark:text-gray-400 cursor-pointer"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="flex items-center gap-2 bg-[#F8F7FA] dark:bg-[#2A2533] px-2.5 md:px-3 py-1.5 rounded-full border border-[#E5E0F1] dark:border-[#3B3446]">
          {agentStatus === "checking" && (
            <Loader2 size={12} className="animate-spin text-gray-400" />
          )}
          {agentStatus === "online" && (
            <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          )}
          {agentStatus === "offline" && (
            <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-red-500"></span>
          )}
          {/* Hide text on very small screens, show on md and above */}
          <span className="hidden sm:inline text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300">
            {agentStatus === "checking"
              ? "Connecting..."
              : agentStatus === "online"
                ? "Agent Online"
                : "Offline"}
          </span>
        </div>
      </div>
    </header>
  );
};
