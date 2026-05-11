import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout & Hooks
import { Sidebar } from "./components/layout/Sidebar.tsx";
import { Header } from "./components/layout/Header.tsx";
import { ChatUI } from "./components/features/chat/ChatUI.tsx";
import { PricingEngine } from "./components/features/PricingEngine.tsx";
import { InventoryHub } from "./components/features/InventoryHub.tsx";
import { useTheme } from "./hooks/useTheme.ts";
import { useAgentStatus } from "./hooks/useAgentStatus.ts";

export default function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const agentStatus = useAgentStatus();
  // State to manage the mobile hamburger menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="h-dvh w-full flex transition-colors duration-300 overflow-hidden">
        <div className="flex h-full w-full bg-[#F3F0FF] dark:bg-[#1E1B24] text-gray-800 dark:text-[#E2DFE7]">
          <Sidebar
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          <main className="flex-1 flex flex-col h-full w-full relative min-w-0">
            <Header
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              agentStatus={agentStatus}
              onMenuClick={() => setIsMobileMenuOpen(true)}
            />

            {/* React Router dynamically swaps the views here */}
            <div className="flex-1 overflow-hidden flex flex-col relative z-0">
              <Routes>
                <Route
                  path="/"
                  element={<ChatUI agentStatus={agentStatus} />}
                />
                <Route path="/inventory" element={<InventoryHub />} />
                <Route path="/pricing" element={<PricingEngine />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
