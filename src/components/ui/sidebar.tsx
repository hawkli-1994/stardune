"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { Button } from "@/components/ui/button"
import { useInk } from "@/lib/ink/react"
import { sidebarRailRecipe } from "@/lib/ink/recipes/sidebar-ink"
import { cn } from "@/lib/utils"

const SIDEBAR_WIDTH = "14rem"
const SIDEBAR_WIDTH_ICON = "3rem"

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider")
  return ctx
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [openState, setOpenState] = React.useState(defaultOpen)
  const open = openProp ?? openState
  const setOpen = React.useCallback(
    (value: boolean | ((v: boolean) => boolean)) => {
      const next = typeof value === "function" ? value(open) : value
      if (openProp === undefined) setOpenState(next)
      onOpenChange?.(next)
    },
    [onOpenChange, open, openProp],
  )
  const toggleSidebar = React.useCallback(() => setOpen((o) => !o), [setOpen])

  const value = React.useMemo(() => ({ open, setOpen, toggleSidebar }), [open, setOpen, toggleSidebar])

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        data-sidebar-open={open ? "" : "false"}
        style={
          {
            "--sd-sidebar-width": SIDEBAR_WIDTH,
            "--sd-sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn("group/sidebar-wrapper flex w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  className,
  side = "left",
  collapsible = "offcanvas",
  seed,
  children,
  ...props
}: React.ComponentProps<"aside"> & {
  side?: "left" | "right"
  collapsible?: "offcanvas" | "icon" | "none"
  seed?: string | number
}) {
  const { open } = useSidebar()
  const { hostRef, hostProps, node } = useInk({
    recipe: sidebarRailRecipe,
    params: {},
    kind: "sidebar",
    seed,
    still: true,
  })

  const collapsed = collapsible === "icon" && !open
  const width = collapsed ? "var(--sd-sidebar-width-icon)" : "var(--sd-sidebar-width)"

  if (collapsible === "none") {
    return (
      <aside
        data-slot="sidebar"
        data-side={side}
        className={cn("relative flex shrink-0 flex-col", className)}
        style={{ width }}
        {...props}
      >
        <div
          ref={hostRef}
          {...hostProps}
          className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)]"
        >
          {node}
        </div>
        <div className="relative z-[1] flex min-h-0 flex-1 flex-col p-2">{children}</div>
      </aside>
    )
  }

  return (
    <aside
      data-slot="sidebar"
      data-side={side}
      data-collapsible={collapsible}
      data-state={open ? "expanded" : "collapsed"}
      className={cn(
        "relative flex shrink-0 flex-col transition-[width] duration-(--sd-dur-sheet) ease-out",
        !open && collapsible === "offcanvas" && "w-0 overflow-hidden opacity-0",
        className,
      )}
      style={open || collapsible === "icon" ? { width } : undefined}
      {...props}
    >
      {(open || collapsible === "icon") && (
        <>
          <div
            ref={hostRef}
            {...hostProps}
            className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)]"
          >
            {node}
          </div>
          <div
            className={cn(
              "relative z-[1] flex min-h-0 flex-1 flex-col gap-2 p-2",
              collapsed && "[&_[data-slot=sidebar-label]]:sr-only",
            )}
          >
            {children}
          </div>
        </>
      )}
    </aside>
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex min-h-0 min-w-0 flex-1 flex-col rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--sd-ink)_10%,transparent)] bg-[color-mix(in_srgb,var(--sd-sand-slip)_35%,transparent)]",
        className,
      )}
      {...props}
    />
  )
}

function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()
  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-8", className)}
      onClick={(e) => {
        onClick?.(e)
        toggleSidebar()
      }}
      {...props}
    >
      <span aria-hidden className="text-base leading-none">
        ≡
      </span>
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("flex flex-col gap-1 p-2", className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-footer" className={cn("mt-auto flex flex-col gap-1 p-2", className)} {...props} />
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("flex min-h-0 flex-1 flex-col gap-1 overflow-auto", className)}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group" className={cn("flex w-full flex-col gap-1 p-2", className)} {...props} />
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-label"
      className={cn("px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu" className={cn("flex w-full flex-col gap-0.5", className)} {...props} />
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-item" className={cn("group/menu-item relative", className)} {...props} />
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-[color-mix(in_srgb,var(--sd-rose-wash)_22%,transparent)] focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&>span:last-child]:truncate",
  {
    variants: {
      isActive: {
        true: "bg-[color-mix(in_srgb,var(--sd-rose-wash)_28%,transparent)] font-medium text-foreground",
        false: "text-muted-foreground",
      },
      size: {
        default: "h-8",
        sm: "h-7 text-xs",
        lg: "h-9",
      },
    },
    defaultVariants: {
      isActive: false,
      size: "default",
    },
  },
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  size = "default",
  className,
  ref,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof sidebarMenuButtonVariants> & {
    asChild?: boolean
    isActive?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={isActive ? "" : undefined}
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cn(sidebarMenuButtonVariants({ isActive, size, className }))}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
}
