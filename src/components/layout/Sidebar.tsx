import React from "react";
import {
  DatabaseZap,
  LayoutDashboard,
  Package,
  CircleDollarSign,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden w-64 flex-col border-r border-[#E5E0F1] bg-[#ECE9F2] transition-colors duration-300 dark:border-[#2A2533] dark:bg-[#15131A] md:flex">
      <div className="p-5 font-bold text-xl flex items-center gap-2 text-[#4A3D63] dark:text-[#BCA3E0]">
        <DatabaseZap className="text-[#8264C2] dark:text-[#967BB6]" />
        Retail OS
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-[#DDD6EA] dark:bg-[#2A2533] text-[#4A3D63] dark:text-[#E2DFE7] font-medium transition-colors">
          <LayoutDashboard
            size={20}
            className="text-[#8264C2] dark:text-[#967BB6]"
          />
          Copilot Agent
        </button>
        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[#DDD6EA]/50 dark:hover:bg-[#2A2533]/60 text-gray-600 dark:text-gray-400 font-medium transition-colors">
          <Package size={20} />
          Inventory Hub
        </button>
        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[#DDD6EA]/50 dark:hover:bg-[#2A2533]/60 text-gray-600 dark:text-gray-400 font-medium transition-colors">
          <CircleDollarSign size={20} />
          Pricing Engine
        </button>
      </nav>
    </aside>
  );
};
