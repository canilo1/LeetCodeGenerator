"use client";
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { PanelLeftIcon, CircleUserRoundIcon, ArrowDown } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.")
  return context
}

function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open

  const setOpen = React.useCallback((value) => {
    const openState = typeof value === "function" ? value(open) : value
    if (setOpenProp) setOpenProp(openState)
    else _setOpen(openState)
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }, [setOpenProp, open])

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile(open => !open) : setOpen(open => !open);
  }, [isMobile, setOpen, setOpenMobile])

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo(() => ({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar])

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={{ "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON, ...style }}
          className={cn("group/sidebar-wrapper flex min-h-svh w-full bg-slate-800 text-gray-200", className)}
          {...props}>
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div data-slot="sidebar" className={cn("flex h-full w-[var(--sidebar-width)] flex-col bg-slate-800 text-gray-200", className)} {...props}>
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          className="w-[var(--sidebar-width)] p-0 bg-slate-800 text-gray-200 [&>button]:hidden"
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE }}
          side={side}>
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="group peer text-gray-200 hidden md:block" data-state={state} data-collapsible={state === "collapsed" ? collapsible : ""} data-variant={variant} data-side={side} data-slot="sidebar">
      <div
        data-slot="sidebar-gap"
        className={cn("relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear", className)} />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left" ? "left-0" : "right-0"
        )}
        {...props}>
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex h-full w-full flex-col bg-slate-800 text-gray-200">
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarContent({ className, ...props }) {
  return <div data-slot="sidebar-content" className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto", className)} {...props} />
}

function SidebarFooter({ className, ...props }) {
  return <div data-slot="sidebar-footer" className={cn("flex flex-col gap-2 p-2 text-gray-200", className)} {...props} />
}

function SidebarHeader({ className, ...props }) {
  return <div data-slot="sidebar-header" className={cn("flex flex-col gap-2 p-2 text-gray-200", className)} {...props} />
}

// Menu items and buttons unified dark hover
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition hover:bg-slate-700 hover:text-gray-200 focus-visible:ring-2",
  {
    variants: {
      variant: { default: "", outline: "" },
      size: { default: "h-8 text-sm", sm: "h-7 text-xs", lg: "h-12 text-sm" }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
)

function SidebarMenuButton({ asChild = false, isActive = false, className, ...props }) {
  const Comp = asChild ? Slot : "button"
  return <Comp data-slot="sidebar-menu-button" className={cn(sidebarMenuButtonVariants({}), className)} {...props} />
}

function SidebarMenu({ className, ...props }) {
  return <ul data-slot="sidebar-menu" className={cn("flex w-full flex-col gap-1", className)} {...props} />
}

function SidebarMenuItem({ className, ...props }) {
  return <li data-slot="sidebar-menu-item" className={cn("group/menu-item relative", className)} {...props} />
}

// export everything else normally
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  useSidebar,
}
