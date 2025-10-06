"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import React, { useState, useEffect } from "react";
import LeetCodeGenerator from "../app/Generate"
import { Sidebar } from "lucide-react";
import { AppSidebar } from "@/SideBar";
import { CircleUserRound } from "lucide-react";
export default function Home() {
  const[Visible,setVisible] = useState(false)
  const[nameofCard,SetCard] = useState("")
  function isVisibleFunction(){
    setVisible(!Visible)
  }

  return (
      <>  
      <SidebarProvider> 

           {Visible?<LeetCodeGenerator  Pattern = {nameofCard}/>: 
           <AppSidebar name = {SetCard} Visibility = {setVisible}/>
             }
            <main>


            </main>
           
      </SidebarProvider>
     </>
    
  );
}
