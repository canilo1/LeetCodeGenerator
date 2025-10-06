// components/app-sidebar.tsx
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import { ArrowDown } from "lucide-react"
import { Accordion } from "./components/ui/accordion"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { Arrow } from "@radix-ui/react-dropdown-menu"
import { CircleUserRoundIcon } from "lucide-react"
export function AppSidebar({name,Visibility}) {
  console.log("This is name",name,"This is Visibility",Visibility)
const items =  [
  { title: "2-Pointers", description: "Use two moving indexes to compare or traverse data efficiently." },
  { title: "Hashing / Frequency Maps", description: "Store and count values fast using objects or maps." },
  { title: "Intervals", description: "Work with start and end ranges, often sorting and merging them." },
  { title: "Sorting + Greedy", description: "Sort data, then pick the best choice step-by-step for an optimal result." },
  { title: "Binary Search", description: "Repeatedly cut a sorted range in half to find a target quickly." },
  { title: "Binary Search on Answer", description: "Guess a possible answer and use binary search to check if it works." },
  { title: "Linked List Techniques", description: "Traverse and modify nodes connected in a chain." },
  { title: "Fast + Slow Pointers", description: "Use two pointers at different speeds to detect cycles or find the middle." },
  { title: "Stacks & Queues", description: "Stack = last in first out, Queue = first in first out." },
  { title: "Backtracking", description: "Try all possibilities and undo when one doesn’t work." },
  { title: "Recursion + Divide & Conquer", description: "Break problems into smaller ones that look the same." },
  { title: "Dynamic Programming", description: "Store results of subproblems to avoid repeating work." },
  { title: "Greedy + Heap / Priority Queue", description: "Pick the best current option using a heap or queue." },
  { title: "Graph Traversal", description: "Visit nodes and edges using BFS or DFS." },
  { title: "Union-Find (Disjoint Set Union, DSU)", description: "Group and connect items to check if they share the same set." },
  { title: "Bit Manipulation", description: "Use binary operations to optimize math or state tracking." },
  { title: "Trie / Prefix Tree", description: "A tree that stores strings character by character." },
  { title: "Segment Tree / Fenwick Tree", description: "Data structures for fast range queries and updates." },
]

  return (
    <Sidebar className="p-3 bg-gray-700 sidebar-scrollbar-hidden">
      <SidebarContent className="flex flex-col gap-1 bg-gray-700 sidebar-scrollbar-hidden">
        <SidebarHeader className="font-medium">Leet Code Patterns</SidebarHeader>
        {items.map((item) => (
          <Accordion type="single" collapsible className="flex" defaultValue="item-1" key  = {item.title}>
  <AccordionItem value={item.title} key={item.title}>
    <AccordionTrigger className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-all">
      <h1
        onClick={() => {
          name(item.title)
          Visibility(true)
        }}
        className="font-medium"
      >
        {item.title}
      </h1>
      <ArrowDown className="w-4 h-4 text-gray-600" />
    </AccordionTrigger>

    <AccordionContent className="pl-4">
      <p className="text-sm text-gray-500">{item.description}</p>
    </AccordionContent>
  </AccordionItem>
</Accordion>
        ))}
        <SidebarFooter><CircleUserRoundIcon/>John Gutierrez</SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
