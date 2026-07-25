"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import LCSIDEBAR from "./resuablecomponents/LeetCodeSideBar";
import LeetCodePage from "./resuablecomponents/LeetCodePage";
import { useState } from "react";
import { Menu } from "lucide-react";
import MobileSideBar from "./resuablecomponents/mobilesideBar";

export default function HomePage() {
  const [selectedPage, setSelectedPage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePage = (page) => {
    setSelectedPage(page);
    setSidebarOpen(false);
  };

  return (
    <SidebarProvider>

      <div className="flex flex-col w-screen h-[100dvh] bg-gray-950 text-white overflow-hidden">

        {/* Mobile Header - Visible on all small screens */}
        <div className="lg:hidden flex justify-between items-center px-3 py-2 md:px-4 md:py-3 border-b border-zinc-800 bg-zinc-950 shrink-0">
          <h1 className="font-semibold text-sm md:text-base">LeetCode Patterns</h1>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-zinc-800 rounded transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Mobile Sidebar Overlay - Full screen overlay for small screens */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-50 bg-zinc-950 overflow-y-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <MobileSideBar handlePage={handlePage} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-1 min-h-0 gap-0">
          
          {/* Desktop Sidebar - Hidden on small/medium screens */}
          <div className="hidden lg:flex lg:w-[clamp(200px,25vw,300px)] bg-zinc-950 border-r border-zinc-800 overflow-y-auto">
            <LCSIDEBAR handlePage={handlePage} />
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-zinc-900 min-h-0">
            <LeetCodePage selectedPage={selectedPage} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
