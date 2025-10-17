"use client";
import { useState } from "react";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowDown, CircleUserRoundIcon } from "lucide-react";

export default function LCSIDEBAR({ handlePage }) {
  const items = [
    { title: "2-Pointers", description: "Use two moving indexes to compare or traverse data efficiently." },
    { title: "Sliding Window", description: "Maintain a window of elements that slides over the data to find subarrays or substrings satisfying certain conditions." },
    { title: "Fast and Slow Pointers", description: "Use two pointers moving at different speeds to detect cycles or find the middle of a linked list." },
    { title: "In-Place Linked List Reversal", description: "Reverse a linked list or a portion of it without using extra space." },
    { title: "Binary Search", description: "Efficiently find elements in a sorted array or determine the position of an element." },
    { title: "Top K Elements", description: "Identify the top K largest or smallest elements in a dataset." },
    { title: "Merge Intervals", description: "Combine overlapping intervals into one, or find gaps between intervals." },
    { title: "Depth-First Search (DFS)", description: "Explore all nodes and edges of a graph or tree by going as deep as possible before backtracking." },
    { title: "Breadth-First Search (BFS)", description: "Explore all nodes and edges of a graph or tree level by level." },
    { title: "Dynamic Programming (DP)", description: "Break down problems into simpler subproblems and store results to avoid redundant computations." },
    { title: "Backtracking", description: "Build solutions incrementally and abandon partial solutions that fail to meet the criteria." },
    { title: "Bit Manipulation", description: "Use bitwise operations to solve problems involving binary representations." },
    { title: "Greedy Algorithms", description: "Make the locally optimal choice at each stage with the hope of finding the global optimum." },
    { title: "Graph Algorithms", description: "Apply algorithms like Dijkstra's or Floyd-Warshall to solve problems involving graphs." },
    { title: "Topological Sort", description: "Order elements in a directed acyclic graph such that for every directed edge u → v, u comes before v." },
  ];

  return (
    <UISidebar className="flex-shrink-0 w-full h-full p-3 border-r border-zinc-700 bg-transparent">
      <SidebarHeader className="font-medium text-zinc-200">
        LeetCode Patterns
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-1 overflow-y-auto">
        {items.map((item) => (
          <Accordion type="single" collapsible key={item.title}>
            <AccordionItem value={item.title}>
              <AccordionTrigger
                className="flex items-center justify-between p-2 cursor-pointer hover:bg-zinc-800 rounded-md transition-all"
                onClick={() => handlePage(item.title)}
              >
                <h1 className="font-medium text-zinc-100">{item.title}</h1>
                <ArrowDown className="w-4 h-4 text-zinc-400" />
              </AccordionTrigger>
              <AccordionContent className="pl-4 text-zinc-400 text-sm">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </SidebarContent>
      <SidebarFooter className="flex items-center gap-2 text-sm text-zinc-300 mt-auto">
        <CircleUserRoundIcon className="w-5 h-5" />
      </SidebarFooter>
    </UISidebar>
  );
}
