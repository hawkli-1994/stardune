"use client"

import * as React from "react"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"
import { cva } from "class-variance-authority"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { dropdownMenuContentRecipe } from "@/lib/ink/recipes/dropdown-menu-ink"
import { navigationMenuTriggerRecipe } from "@/lib/ink/recipes/navigation-menu-ink"
import { cn } from "@/lib/utils"

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & { viewport?: boolean }) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {children}
      {viewport ? <NavigationMenuViewport /> : null}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList(props: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-1", props.className)}
      {...props}
    />
  )
}

function NavigationMenuItem(props: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn("relative", props.className)} {...props} />
}

const navigationMenuTriggerStyle = cva(
  "group relative isolate inline-flex h-9 w-max items-center justify-center rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium outline-none transition-colors disabled:pointer-events-none disabled:opacity-50",
)

function NavigationMenuTrigger({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  const { hostRef, hostProps, node } = useInk({
    recipe: navigationMenuTriggerRecipe,
    params: {},
    kind: "nav-trigger",
    still: true,
  })

  return (
    <NavigationMenuPrimitive.Trigger
      ref={useMergedRef<HTMLButtonElement>(hostRef, ref)}
      {...hostProps}
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "text-muted-foreground hover:text-foreground data-[state=open]:text-foreground", className)}
      {...props}
    >
      {node}
      <span className="relative z-[1] inline-flex items-center gap-1">
        {children}
        <span className="text-[10px] opacity-60 transition-transform group-data-[state=open]:rotate-180" aria-hidden>
          ▾
        </span>
      </span>
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContentPanel({
  seed,
  children,
  className,
}: {
  seed?: string | number
  children: React.ReactNode
  className?: string
}) {
  const { hostRef, hostProps, node } = useInk({
    recipe: dropdownMenuContentRecipe,
    params: {},
    kind: "dropdown-menu",
    seed,
    still: true,
  })
  return (
    <div
      ref={hostRef}
      {...hostProps}
      className={cn(
        "relative isolate overflow-hidden rounded-[var(--radius-md)] shadow-[0_10px_32px_-8px_rgb(var(--sd-shade)/0.2)]",
        className,
      )}
    >
      {node}
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}

function NavigationMenuContent({
  className,
  seed,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content> & { seed?: string | number }) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "absolute top-full left-0 w-full p-2 md:w-auto",
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
        "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
        "data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
        className,
      )}
      {...props}
    >
      <NavigationMenuContentPanel seed={seed} className="p-4">
        {children}
      </NavigationMenuContentPanel>
    </NavigationMenuPrimitive.Content>
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
          "md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "block rounded-[var(--radius-sm)] px-3 py-2 text-sm outline-none transition-colors",
        "hover:bg-[color-mix(in_srgb,var(--sd-rose-wash)_38%,transparent)] focus:bg-[color-mix(in_srgb,var(--sd-rose-wash)_42%,transparent)]",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator(props: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        props.className,
      )}
      {...props}
    >
      <div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-[color-mix(in_srgb,var(--sd-sand-slip)_92%,transparent)] shadow-sm" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
