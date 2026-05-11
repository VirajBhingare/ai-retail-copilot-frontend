import React from "react";
import {
  DatabaseZap,
  LayoutDashboard,
  Package,
  IndianRupee,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full p-3 rounded-xl font-medium transition-colors ${
      isActive
        ? "bg-[#DDD6EA] dark:bg-[#2A2533] text-[#4A3D63] dark:text-[#E2DFE7]"
        : "hover:bg-[#DDD6EA]/50 dark:hover:bg-[#2A2533]/60 text-gray-600 dark:text-gray-400"
    }`;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 md:w-64 flex flex-col border-r border-[#E5E0F1] bg-[#ECE9F2] dark:border-[#2A2533] dark:bg-[#15131A] transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 font-bold text-xl flex items-center justify-between text-[#4A3D63] dark:text-[#BCA3E0]">
          <div className="flex items-center gap-2">
            <DatabaseZap className="text-[#8264C2] dark:text-[#967BB6]" />
            <span>Retail Copilot</span>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="md:hidden p-1 text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Close menu when a link is clicked on mobile */}
          <NavLink to="/" onClick={onClose} className={linkClass}>
            {({ isActive }) => (
              <>
                <LayoutDashboard
                  size={20}
                  className={
                    isActive ? "text-[#8264C2] dark:text-[#967BB6]" : ""
                  }
                />
                Copilot Agent
              </>
            )}
          </NavLink>

          <NavLink to="/inventory" onClick={onClose} className={linkClass}>
            {({ isActive }) => (
              <>
                <Package
                  size={20}
                  className={
                    isActive ? "text-[#8264C2] dark:text-[#967BB6]" : ""
                  }
                />
                Inventory Hub
              </>
            )}
          </NavLink>

          <NavLink to="/pricing" onClick={onClose} className={linkClass}>
            {({ isActive }) => (
              <>
                <IndianRupee
                  size={20}
                  className={
                    isActive ? "text-[#8264C2] dark:text-[#967BB6]" : ""
                  }
                />
                Pricing Engine
              </>
            )}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};
