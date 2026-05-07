import React from "react";
import {
  DatabaseZap,
  LayoutDashboard,
  Package,
  IndianRupee,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full p-3 rounded-xl font-medium transition-colors ${
      isActive
        ? "bg-[#DDD6EA] dark:bg-[#2A2533] text-[#4A3D63] dark:text-[#E2DFE7]"
        : "hover:bg-[#DDD6EA]/50 dark:hover:bg-[#2A2533]/60 text-gray-600 dark:text-gray-400"
    }`;

  return (
    <aside className="hidden w-64 flex-col border-r border-[#E5E0F1] bg-[#ECE9F2] transition-colors duration-300 dark:border-[#2A2533] dark:bg-[#15131A] md:flex">
      <div className="p-5 font-bold text-xl flex items-center gap-2 text-[#4A3D63] dark:text-[#BCA3E0]">
        <DatabaseZap className="text-[#8264C2] dark:text-[#967BB6]" />
        Retail Copilot
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {/* We use the children render prop ({ isActive }) to conditionally color the icons */}
        <NavLink to="/" className={linkClass}>
          {({ isActive }) => (
            <>
              <LayoutDashboard
                size={20}
                className={isActive ? "text-[#8264C2] dark:text-[#967BB6]" : ""}
              />
              Copilot Agent
            </>
          )}
        </NavLink>

        <NavLink to="/inventory" className={linkClass}>
          {({ isActive }) => (
            <>
              <Package
                size={20}
                className={isActive ? "text-[#8264C2] dark:text-[#967BB6]" : ""}
              />
              Inventory Hub
            </>
          )}
        </NavLink>

        <NavLink to="/pricing" className={linkClass}>
          {({ isActive }) => (
            <>
              <IndianRupee
                size={20}
                className={isActive ? "text-[#8264C2] dark:text-[#967BB6]" : ""}
              />
              Pricing Engine
            </>
          )}
        </NavLink>
      </nav>
    </aside>
  );
};
