import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout & Hooks
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { ChatUI } from "./components/features/chat/ChatUI";
import { PricingEngine } from "./components/features/PricingEngine";
import { InventoryHub } from "./components/features/InventoryHub";
import { useTheme } from "./hooks/useTheme";
import { useAgentStatus } from "./hooks/useAgentStatus";

export default function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const agentStatus = useAgentStatus();

  return (
    <BrowserRouter>
      <div className="h-screen w-full flex transition-colors duration-300">
        <div className="flex h-full w-full bg-[#F3F0FF] dark:bg-[#1E1B24] text-gray-800 dark:text-[#E2DFE7]">
          <Sidebar />

          <main className="flex-1 flex flex-col h-full relative">
            <Header
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              agentStatus={agentStatus}
            />

            {/* React Router dynamically swaps the views here */}
            <div className="flex-1 overflow-hidden flex flex-col">
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
