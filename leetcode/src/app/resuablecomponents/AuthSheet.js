"use client";

import { useEffect, useState } from "react";
import { CircleUserRoundIcon, LoaderCircle, LogOut, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";



export default function AuthSheet() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [user, setUser] = useState(null);

 
  const handleMode = (newMode) => {
    setMode(newMode);
    setMessage("");
  };
const handleSubmit = async (event) => {
  event.preventDefault();

  setStatus("loading");
  setMessage("");

  try {
    let response;

    if (mode === "signup") {
      response = await fetch("http://localhost:3000/backroute/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
    } else {
      response = await fetch("http://localhost:3000/backroute/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
    }

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Unable to complete request.");
    }

    setUser(payload.user);
    setUsername(payload.user.username);
    setPassword("");

    setMessage(
      mode === "signup"
        ? "Account created successfully."
        : "Signed in successfully."
    );

    setStatus("success");
    setOpen(false);

  } catch (error) {
    console.error(error);
    setMessage(error.message);
    setStatus("error");
  }
};

  const handleLogout = () => {
    setUser(null);;
    setStatus("idle");
    setUsername("");
    setPassword("");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md border border-blue-800 bg-blue-900/80 px-2 py-2 text-left text-sm text-zinc-200 transition-colors hover:bg-blue-00"
        >
          {user ? <CircleUserRoundIcon className="h-4 w-4" /> : <UserRoundPlus className="h-4 w-4" />}
          <span className="truncate">{user ? user.username : "Sign in"}</span>
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="border-zinc-800 bg-zinc-950 text-white">
        <SheetHeader className="space-y-2">
          <SheetTitle>Account</SheetTitle>
          <SheetDescription className="text-zinc-400">
            Create an account or sign in to keep your sessions organized.
          </SheetDescription>
        </SheetHeader>

        {user ? (
          <div className="mt-6 flex flex-col gap-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-sm text-zinc-400">Signed in as</p>
              <p className="mt-1 font-medium text-white">{user.username}</p>
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        ) : (
          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={mode === "login" ? "default" : "outline"}
                className={`flex-1 ${mode === "login" ? "bg-blue-900/80 hover:bg-blue-800/80" : "bg-zinc-900/80 hover:bg-zinc-800/80"} text-white`}
                onClick={() => handleMode("login")}
              >
                Log in
              </Button>
              <Button
                type="button"
                variant={mode === "signup" ? "default" : "outline"}
                className={`flex-1 ${mode === "signup" ? "bg-blue-900/80 hover:bg-blue-800/80" : "bg-zinc-900/80 hover:bg-zinc-800/80"} text-white`}
                onClick={() => handleMode("signup")}
              >
                Sign up
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="auth-username">Username</Label>
              <Input
                id="auth-username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter a username"
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="auth-password">Password</Label>
              <Input
                id="auth-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter a password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />
            </div>

            {message ? (
              <p className={`text-sm ${status === "error" ? "text-red-400" : "text-emerald-400"}`}>{message}</p>
            ) : null}

            <Button type="submit" disabled={status === "loading"}  className="w-full bg-blue-600 hover:bg-blue-700">
              {status === "loading" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
              {mode === "signup" ? "Create account" : "Log in"}
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
