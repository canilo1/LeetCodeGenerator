"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import LCSIDEBAR from "./resuablecomponents/LeetCodeSideBar";
import LeetCodePage from "./resuablecomponents/LeetCodePage";
import { useState } from "react";
import { Menu, CircleUserRoundIcon, X } from "lucide-react";
import MobileSideBar from "./resuablecomponents/mobilesideBar";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const [selectedPage, setSelectedPage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const handlePage = (page) => {
    setSelectedPage(page);
    setSidebarOpen(false);
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setAuthError("");
    setAuthMessage("");

    if (!authEmail.trim() || !authPassword) {
      setAuthError("Email and password are required.");
      return;
    }

    if (authMode === "signup" && authPassword !== authConfirmPassword) {
      setAuthError("Passwords must match.");
      return;
    }

    setAuthLoading(true);
    try {
      const response = await fetch(`/api/auth/${authMode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail.trim(), password: authPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        setAuthError(data?.error || "Unable to connect to the auth backend.");
      } else {
        setAuthMessage(data?.message || "Success!");
        setAuthError("");
        if (authMode === "login") {
          setAuthPassword("");
          setAuthConfirmPassword("");
        }
        if (authMode === "signup") {
          setAuthEmail("");
          setAuthPassword("");
          setAuthConfirmPassword("");
        }
      }
    } catch (err) {
      setAuthError("Unexpected error connecting to the backend.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <SidebarProvider>

      <div className="flex flex-col w-screen h-[100dvh] bg-gray-950 text-white overflow-hidden">

        {/* Mobile Header - Visible on all small screens */}
        <div className="lg:hidden flex justify-between items-center px-3 py-2 md:px-4 md:py-3 border-b border-zinc-800 bg-zinc-950 shrink-0">
          <h1 className="font-semibold text-sm md:text-base">LeetCode Patterns</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAuthVisible(true);
                setAuthError("");
                setAuthMessage("");
              }}
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 p-2 text-zinc-200 hover:bg-zinc-800 transition-colors"
              aria-label="Open auth panel"
            >
              <CircleUserRoundIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-zinc-800 rounded transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
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

        {/* Auth Modal Overlay */}
        {authVisible && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setAuthVisible(false)}
          >
            <div
              className="w-full max-w-md overflow-hidden rounded-[2rem] border border-zinc-700 bg-zinc-950 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">
                    {authMode === "login" ? "Login" : "Sign up"}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {authMode === "login" ? "Welcome back" : "Create your account"}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-400">
                    Use your email and password to {authMode === "login" ? "login" : "register"}.
                  </p>
                </div>
                <button
                  onClick={() => setAuthVisible(false)}
                  className="rounded-full border border-zinc-700 bg-zinc-900 p-2 text-zinc-300 hover:bg-zinc-800 transition-colors"
                  aria-label="Close auth panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setAuthError("");
                    setAuthMessage("");
                  }}
                  className={`rounded-2xl px-4 py-2 text-sm font-medium transition-colors ${
                    authMode === "login"
                      ? "bg-primary text-white"
                      : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setAuthError("");
                    setAuthMessage("");
                  }}
                  className={`rounded-2xl px-4 py-2 text-sm font-medium transition-colors ${
                    authMode === "signup"
                      ? "bg-primary text-white"
                      : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  Sign up
                </button>
              </div>

              <form className="mt-6 space-y-4" onSubmit={handleAuthSubmit}>
                <div className="space-y-2">
                  <label htmlFor="auth-email" className="text-sm text-zinc-300">
                    Email address
                  </label>
                  <Input
                    id="auth-email"
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="auth-password" className="text-sm text-zinc-300">
                    Password
                  </label>
                  <Input
                    id="auth-password"
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Enter a password"
                    required
                  />
                </div>

                {authMode === "signup" && (
                  <div className="space-y-2">
                    <label htmlFor="auth-confirm-password" className="text-sm text-zinc-300">
                      Confirm password
                    </label>
                    <Input
                      id="auth-confirm-password"
                      type="password"
                      value={authConfirmPassword}
                      onChange={(e) => setAuthConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      required
                    />
                  </div>
                )}

                {authError && (
                  <div className="rounded-2xl bg-rose-950/80 px-4 py-3 text-sm text-rose-200">
                    {authError}
                  </div>
                )}

                {authMessage && (
                  <div className="rounded-2xl bg-emerald-950/80 px-4 py-3 text-sm text-emerald-200">
                    {authMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {authLoading ? "Working..." : authMode === "login" ? "Login" : "Create account"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Desktop auth button header */}
        <div className="hidden lg:flex justify-end items-center px-4 py-3 border-b border-zinc-800 bg-zinc-950">
          <button
            onClick={() => {
              setAuthVisible(true);
              setAuthError("");
              setAuthMessage("");
            }}
            className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 p-2 text-zinc-200 hover:bg-zinc-800 transition-colors"
            aria-label="Open auth panel"
          >
            <CircleUserRoundIcon className="w-5 h-5" />
          </button>
        </div>

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
