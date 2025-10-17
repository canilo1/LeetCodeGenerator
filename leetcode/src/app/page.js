"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import LCSIDEBAR from "./resuablecomponents/LeetCodeSideBar";
import LeetCodePage from "./resuablecomponents/LeetCodePage";
import { useState } from "react";

export default function HomePage() {
  const [selectedPage, setSelectedPage] = useState("");
  const handlePage = (page) => setSelectedPage(page);

  return (
    <SidebarProvider>
      <div className="flex flex-col sm:flex-row w-screen h-screen bg-zinc-950 text-white">
        {/* Sidebar */}
        <div
          className="
            flex-shrink-0
            w-[clamp(180px,25vw,260px)]
            min-w-[180px]
            max-w-[300px]
            sm:border-r border-zinc-800
            bg-zinc-900
            overflow-y-auto
            transition-all duration-300
          "
        >
          <div className="h-full">
            <LCSIDEBAR handlePage={handlePage} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-zinc-900">
          <LeetCodePage selectedPage={selectedPage} />
        </div>
      </div>
    </SidebarProvider>
  );
}
