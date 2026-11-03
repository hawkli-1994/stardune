"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { tabsTriggerRecipe } from "@/lib/ink/recipes/tabs-ink"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{ variant: "default" | "line" }>({ variant: "line" })

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-4", className)} {...props} />
  )
}

const tabsListVariants = cva("inline-flex h-10 w-fit items-end justify-center gap-1 text-muted-foreground", {
  variants: {
    variant: {
      default: "rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--sd-sand-shade)_35%,transparent)] p-1",
      line: "border-b border-[var(--sd-line-soft)] pb-0",
    },
  },
  defaultVariants: { variant: "line" },
})

function TabsList({
  className,
  variant = "line",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  const v = variant ?? "line"
  return (
    <TabsContext.Provider value={{ variant: v }}>
      <TabsPrimitive.List data-slot="tabs-list" data-variant={v} className={cn(tabsListVariants({ variant: v }), className)} {...props} />
    </TabsContext.Provider>
  )
}

function TabsTrigger({
  className,
  seed,
  disabled,
  ref,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & { seed?: string | number }) {
  const { variant } = React.useContext(TabsContext)
  const { hostRef, hostProps, node } = useInk({
    recipe: tabsTriggerRecipe,
    params: { variant, disabled: !!disabled },
    kind: "tab",
    seed,
    still: true,
  })
  const mergedRef = useMergedRef<HTMLButtonElement>(hostRef, ref)

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      ref={mergedRef}
      {...hostProps}
      disabled={disabled}
      className={cn(
        "relative isolate inline-flex h-9 flex-1 items-center justify-center gap-1.5 px-4 text-sm font-medium whitespace-nowrap",
        "text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground",
        "disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {node}
      <span className="relative z-[1]">{children}</span>
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--sd-focus)]", className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
