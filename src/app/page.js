"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import LeetCodeGenerator from "../app/Generate"
export default function Home() {
  const[Visible,setVisible] = useState(false)
  const[nameofCard,SetCard] = useState("")
  function isVisibleFunction(){
    setVisible(!Visible)
  }

  return (
      <>
        {Visible?<LeetCodeGenerator  Pattern = {nameofCard}/>:  <div className="flex flex-col flex-wrap gap-4 p-5 bg-gray-100 ">
        <Card className="hover:bg-gray-300 active:outline-solid " onClick = {(events) => {
          isVisibleFunction()
          SetCard("SlidingWindow")
        }}>Sliding Window</Card> 
        <Card className="hover:bg-gray-300  active:outline-solid " >2-Pointers</Card>
          <Card className="hover:bg-gray-300   active:outline-solid ">Hashing / Frequency Maps</Card>
        <Card className="hover:bg-gray-300   active:outline-solid " >Intervals</Card>
        <Card className="hover:bg-gray-300   active:outline-solid ">Sorting + Greedy</Card>
        <Card className="hover:bg-gray-300   active:outline-solid " >Binary Search</Card>
        <Card className="hover:bg-gray-300   active:outline-solid" >Binary Search on Answer</Card>
        <Card className="hover:bg-gray-300   active:outline-solid " >Linked List Techniques</Card>
        <Card className="hover:bg-gray-300   active:outline-solid " >Fast + Slow Pointers</Card>
        <Card className="hover:bg-gray-300   active:outline-solid " >Stacks & Queues</Card>
        <Card className="hover:bg-gray-300  active:outline-solid  " >Backtracking</Card>
        <Card className="hover:bg-gray-300   active:outline-solid " >Recursion + Divide & Conquer</Card>
        <Card className="hover:bg-gray-300   active:outline-solid " >Dynamic Programming</Card>
        <Card className="hover:bg-gray-300  active:outline-solid  ">Greedy + Heap / Priority Queue</Card>
        <Card className="hover:bg-gray-300   active:outline-solid " >Graph Traversal</Card>
        <Card className="hover:bg-gray-300   active:outline-solid ">Union-Find (Disjoint Set Union, DSU)</Card>
        <Card className="hover:bg-gray-300   active:outline-solid " >Bit Manipulation</Card>
        <Card className="hover:bg-gray-300   active:outline-solid " >Trie / Prefix Tree</Card>
        <Card className="hover:bg-gray-300   active:outline-solid " >Segment Tree / Fenwick Tree</Card>
         </div> }
      
     </>
    
  );
}
