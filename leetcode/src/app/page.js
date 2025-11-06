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
    setSidebarOpen(false); // close sidebar on mobile
  };

  return (
    <SidebarProvider>
      {/* Use 100dvh for iPad/tablet height accuracy */}
      <div className="flex flex-col sm:flex-row w-screen h-[100dvh] bg-gray-950 text-white overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex justify-between items-center p-2 border-b border-zinc-800">
          <h1 className="font-semibold">LeetCode Patterns</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-blue-900 sm:hidden">
            <MobileSideBar handlePage={handlePage} />
          </div>
        )}

        {/* Sidebar (desktop) */}
        <div className="hidden sm:flex sm:w-[clamp(180px,25vw,260px)] bg-zinc-950">
          <LCSIDEBAR handlePage={handlePage} />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-zinc-900 min-h-0">
          <LeetCodePage selectedPage={selectedPage} />
        </div>
      </div>
    </SidebarProvider>
  );
}
